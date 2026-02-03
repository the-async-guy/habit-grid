import { useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";
import {
  HashRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import {
  type AppData,
  type DailyTodo,
  type Habit,
  type Weekday,
} from "./types";
import { darkTheme, lightTheme, GlobalStyle } from "./theme";
import { AppThemeProvider } from "./contexts/ThemeContext";
import { Layout } from "./components/Layout";
import { LandingPage } from "./views/LandingPage";
import { UnifiedTodayView } from "./views/UnifiedTodayView";
import { HabitsView } from "./views/HabitsView";
import { AnalyticsView } from "./views/AnalyticsView";
import { FloatingActionButton } from "./components/FloatingActionButton";
import { ItemDialog } from "./components/ItemDialog";
import moment from "moment";
import "./App.css";

const STORAGE_KEY = "habitgrid-data-v2";

const HABIT_COLORS = [
  "#FF6B6B",
  "#FF9F1C",
  "#2ECC71",
  "#1ABCFF",
  "#A66CFF",
  "#FF6FD8",
  "#FFC857",
  "#34C759",
  "#5856D6",
  "#FF375F",
];

const todayISO = () => moment().format("YYYY-MM-DD");

const uuid = () => {
  if (crypto?.randomUUID) return crypto.randomUUID();
  return Math.random().toString(36).slice(2);
};

function App() {
  const [data, setData] = useState<AppData>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as AppData & { user?: unknown };
        const { user: _removed, ...rest } = parsed;
        void _removed;
        const prefs = rest.preferences || {
          theme: "dark" as const,
          firstDayOfWeek: "monday" as const,
        };
        return {
          ...rest,
          preferences: {
            ...prefs,
            habitGridColumns: prefs.habitGridColumns ?? 2,
          },
        } as AppData;
      }
    } catch {
      // ignore
    }

    return {
      habits: [
        {
          id: uuid(),
          name: "Morning Focus",
          color: "#0A84FF",
          icon: "☀️",
          frequency: "daily",
          createdAt: todayISO(),
          completions: [],
          order: 0,
          time: "08:00",
        },
      ],
      todos: {
        daily: [],
      },
      preferences: {
        theme: "dark",
        firstDayOfWeek: "monday",
        habitGridColumns: 2,
      },
    };
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogInitialType, setDialogInitialType] = useState<"habit" | "todo">(
    "todo"
  );
  const [dialogInitialData, setDialogInitialData] = useState<{
    id: string;
    name: string;
    time?: string;
    type: "habit" | "todo";
    color?: string;
    icon?: string;
    repeatDays?: Weekday[];
  } | null>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, 500);
    return () => clearTimeout(id);
  }, [data]);

  const systemPrefersLight =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-color-scheme: light)").matches;

  const themeMode: "light" | "dark" =
    data.preferences.theme === "system"
      ? systemPrefersLight
        ? "light"
        : "dark"
      : data.preferences.theme === "light"
      ? "light"
      : "dark";

  const theme = themeMode === "dark" ? darkTheme : lightTheme;

  const habits = useMemo(
    () => data.habits.sort((a, b) => a.order - b.order),
    [data]
  );

  const today = todayISO();

  const todaysTodos = useMemo(
    () => data.todos.daily.filter((t) => t.date === today),
    [data, today]
  );

  const toggleTheme = () => {
    setData({
      ...data,
      preferences: {
        ...data.preferences,
        theme: themeMode === "dark" ? "light" : "dark",
      },
    });
  };

  const handleEditTodo = (todo: DailyTodo) => {
    setDialogInitialData({
      id: todo.id,
      name: todo.text,
      time: todo.time,
      type: "todo",
      color: undefined,
      icon: undefined,
    });
    setDialogInitialType("todo");
    setIsDialogOpen(true);
  };

  const handleSaveItem = (itemData: {
    name: string;
    time?: string;
    type: "habit" | "todo";
    color?: string;
    icon?: string;
    id?: string;
    repeatDays?: Weekday[];
  }) => {
    if (itemData.type === "habit" && itemData.id) {
      setData((prev) => ({
        ...prev,
        habits: prev.habits.map((h) =>
          h.id === itemData.id
            ? {
                ...h,
                name: itemData.name,
                time: itemData.time,
                color: itemData.color || h.color,
                icon: itemData.icon,
                repeatDays: itemData.repeatDays,
              }
            : h
        ),
      }));
      return;
    }

    if (itemData.type === "habit") {
      const newHabit: Habit = {
        id: uuid(),
        name: itemData.name,
        color:
          itemData.color ||
          HABIT_COLORS[data.habits.length % HABIT_COLORS.length],
        frequency: "daily",
        createdAt: todayISO(),
        completions: [],
        order: data.habits.length,
        time: itemData.time,
        icon: itemData.icon,
        repeatDays: itemData.repeatDays,
      };
      setData((prev) => ({ ...prev, habits: [...prev.habits, newHabit] }));
      return;
    }

    if (itemData.type === "todo" && itemData.id) {
      setData((prev) => ({
        ...prev,
        todos: {
          ...prev.todos,
          daily: prev.todos.daily.map((t) =>
            t.id === itemData.id ? { ...t, text: itemData.name } : t
          ),
        },
      }));
      return;
    }

    if (itemData.type === "todo") {
      const newTodo: DailyTodo = {
        id: uuid(),
        text: itemData.name,
        completed: false,
        date: today,
      };
      setData((prev) => ({
        ...prev,
        todos: { ...prev.todos, daily: [...prev.todos.daily, newTodo] },
      }));
    }
  };

  const handleEditHabit = (habit: Habit) => {
    setDialogInitialData({
      id: habit.id,
      name: habit.name,
      time: habit.time,
      type: "habit",
      color: habit.color,
      icon: habit.icon,
      repeatDays: habit.repeatDays,
    });
    setDialogInitialType("habit");
    setIsDialogOpen(true);
  };

  const deleteHabit = (id: string) => {
    setData((prev) => ({
      ...prev,
      habits: prev.habits.filter((h) => h.id !== id),
    }));
  };

  const toggleHabitCompletion = (habitId: string, dateISO: string) => {
    setData((prev) => {
      const habit = prev.habits.find((h) => h.id === habitId);
      if (!habit) return prev;
      const has = habit.completions.includes(dateISO);
      return {
        ...prev,
        habits: prev.habits.map((h) => {
          if (h.id !== habitId) return h;
          return {
            ...h,
            completions: has
              ? h.completions.filter((d) => d !== dateISO)
              : [...h.completions, dateISO],
          };
        }),
      };
    });
  };

  const toggleDailyTodo = (id: string) => {
    setData((prev) => ({
      ...prev,
      todos: {
        ...prev.todos,
        daily: prev.todos.daily.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        ),
      },
    }));
  };

  const setHabitGridColumns = (habitGridColumns: number) => {
    setData((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, habitGridColumns },
    }));
  };

  const deleteDailyTodo = (id: string) => {
    setData((prev) => ({
      ...prev,
      todos: {
        ...prev.todos,
        daily: prev.todos.daily.filter((t) => t.id !== id),
      },
    }));
  };

  const funFact = "Your future self is watching.";

  return (
    <ThemeProvider theme={theme}>
      <AppThemeProvider themeMode={themeMode}>
        <GlobalStyle />
        <HashRouter>
          <AppRoutes
            themeMode={themeMode}
            toggleTheme={toggleTheme}
            habits={habits}
            habitsCount={habits.length}
            funFact={funFact}
            today={today}
            todaysTodos={todaysTodos}
            habitGridColumns={data.preferences.habitGridColumns ?? 4}
            setHabitGridColumns={setHabitGridColumns}
            onToggleHabitCompletion={toggleHabitCompletion}
            onToggleTodoCompletion={toggleDailyTodo}
            onEditTodo={handleEditTodo}
            onDeleteTodo={deleteDailyTodo}
            onEditHabit={handleEditHabit}
            onDeleteHabit={deleteHabit}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            dialogInitialType={dialogInitialType}
            setDialogInitialType={setDialogInitialType}
            dialogInitialData={dialogInitialData}
            setDialogInitialData={setDialogInitialData}
            onSaveItem={handleSaveItem}
          />
        </HashRouter>
      </AppThemeProvider>
    </ThemeProvider>
  );
}

function AppRoutes({
  themeMode,
  toggleTheme,
  habits,
  habitsCount,
  funFact,
  today,
  todaysTodos,
  habitGridColumns,
  setHabitGridColumns,
  onToggleHabitCompletion,
  onToggleTodoCompletion,
  onEditTodo,
  onDeleteTodo,
  onEditHabit,
  onDeleteHabit,
  isDialogOpen,
  setIsDialogOpen,
  dialogInitialType,
  setDialogInitialType,
  dialogInitialData,
  setDialogInitialData,
  onSaveItem,
}: {
  themeMode: "light" | "dark";
  toggleTheme: () => void;
  habits: Habit[];
  habitsCount: number;
  funFact: string;
  today: string;
  todaysTodos: DailyTodo[];
  habitGridColumns: number;
  setHabitGridColumns: (n: number) => void;
  onToggleHabitCompletion: (habitId: string, dateISO: string) => void;
  onToggleTodoCompletion: (id: string) => void;
  onEditTodo: (todo: DailyTodo) => void;
  onDeleteTodo: (id: string) => void;
  onEditHabit: (habit: Habit) => void;
  onDeleteHabit: (id: string) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (v: boolean) => void;
  dialogInitialType: "habit" | "todo";
  setDialogInitialType: (v: "habit" | "todo") => void;
  dialogInitialData: {
    id: string;
    name: string;
    time?: string;
    type: "habit" | "todo";
    color?: string;
    icon?: string;
    repeatDays?: import("./types").Weekday[];
  } | null;
  setDialogInitialData: (v: typeof dialogInitialData) => void;
  onSaveItem: (itemData: {
    name: string;
    time?: string;
    type: "habit" | "todo";
    color?: string;
    icon?: string;
    id?: string;
    repeatDays?: import("./types").Weekday[];
  }) => void;
}) {
  const location = useLocation();
  const isApp = location.pathname.startsWith("/app");

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/app"
          element={
            <Layout
              themeMode={themeMode}
              toggleTheme={toggleTheme}
              habitsCount={habitsCount}
              funFact={funFact}
            />
          }
        >
          <Route
            index
            element={
              <UnifiedTodayView
                habits={habits}
                todaysTodos={todaysTodos}
                today={today}
                onToggleHabitCompletion={onToggleHabitCompletion}
                onToggleTodoCompletion={onToggleTodoCompletion}
                onEditTodo={onEditTodo}
                onDeleteTodo={onDeleteTodo}
              />
            }
          />
          <Route
            path="habits"
            element={
              <HabitsView
                habits={habits}
                today={today}
                onEditHabit={onEditHabit}
                onDeleteHabit={onDeleteHabit}
                habitGridColumns={habitGridColumns}
                onHabitGridColumnsChange={setHabitGridColumns}
              />
            }
          />
          <Route
            path="analytics"
            element={<AnalyticsView habits={habits} today={today} />}
          />
          <Route path="*" element={<Navigate to="/app" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {isApp && (
        <FloatingActionButton
          onAddHabit={() => {
            setDialogInitialData(null);
            setDialogInitialType("habit");
            setIsDialogOpen(true);
          }}
          onAddTodo={() => {
            setDialogInitialData(null);
            setDialogInitialType("todo");
            setIsDialogOpen(true);
          }}
        />
      )}

      <ItemDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={onSaveItem}
        initialType={dialogInitialType}
        initialData={dialogInitialData}
        themeMode={themeMode}
      />
    </>
  );
}

export default App;
