import { Edit2, Trash2 } from "lucide-react";
import { useMemo } from "react";
import styled from "styled-components";
import { type DailyTodo, type Habit, dateToWeekday } from "../types";
import {
  Card,
  CardHeader,
  CardMeta,
  QuickHabitList,
  StreakPill,
} from "../components/ui";
import { useTheme } from "../contexts/ThemeContext";

const TodayCard = styled(Card)`
  display: flex;
  flex-direction: column;
  border: none;
  background: transparent;
  box-shadow: none;

  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  padding: 20px 28px;
  padding-bottom: 150px;

  @media (min-width: 900px) {
    padding: 24px 28px;
  }
`;

const ItemRow = styled.button<{
  checked: boolean;
  color: string;
  themeMode: "light" | "dark";
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 12px;
  border: none;
  background: ${({ checked, color, themeMode }) =>
    checked
      ? `${color}20`
      : themeMode === "dark"
      ? "rgba(15, 23, 42, 0.4)"
      : "rgba(255, 255, 255, 0.4)"};
  color: inherit;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  text-align: left;

  @media (min-width: 601px) {
    gap: 12px;
    padding: 12px 16px;
    border-radius: 14px;
  }

  &:hover {
    background: ${({ checked, color, theme }) =>
      checked ? `${color}30` : theme.accentSoft};
    transform: translateY(-1px);
  }
`;

const ItemLeftContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;

  @media (min-width: 601px) {
    gap: 12px;
  }
`;

const ItemTextContent = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
  min-width: 0;

  @media (min-width: 601px) {
    gap: 8px;
  }
`;

const ItemTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: 601px) {
    gap: 8px;
    font-size: 15px;
  }
`;

const ItemTime = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.textSecondary};
  font-family: monospace;
  white-space: nowrap;
`;

const ItemIcon = styled.span`
  font-size: 18px;
  width: 20px; /* Fixed width for alignment */
  display: flex;
  justify-content: center;
`;

const CheckedPointer = ({
  checked,
  color,
}: {
  checked: boolean;
  color: string;
}) => {
  return (
    <span
      style={{
        width: 16,
        height: 16,
        borderRadius: 4,
        border: `1.5px solid ${color}`,
        display: "grid",
        placeItems: "center",
        flexShrink: 0,
      }}
    >
      {checked && <div style={{ width: 8, height: 8, background: color }} />}
    </span>
  );
};

type UnifiedItem =
  | { type: "habit"; data: Habit; sortTime: string }
  | { type: "todo"; data: DailyTodo; sortTime: string };

interface UnifiedTodayViewProps {
  habits: Habit[];
  todaysTodos: DailyTodo[];
  today: string;
  onToggleHabitCompletion: (id: string, date: string) => void;
  onToggleTodoCompletion: (id: string) => void;
  onEditTodo: (todo: DailyTodo) => void;
  onDeleteTodo: (id: string) => void;
}

const formatTime12 = (timeStr?: string) => {
  if (!timeStr) return null;
  const [h, m] = timeStr.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
};

export function UnifiedTodayView({
  habits,
  todaysTodos,
  today,
  onToggleHabitCompletion,
  onToggleTodoCompletion,
  onEditTodo,
  onDeleteTodo,
}: UnifiedTodayViewProps) {
  const { themeMode } = useTheme();
  const todayWeekday = useMemo(() => dateToWeekday(today), [today]);

  const items = useMemo(() => {
    const combined: UnifiedItem[] = [];
    const habitsDueToday = habits.filter(
      (h) =>
        !h.repeatDays ||
        h.repeatDays.length === 0 ||
        h.repeatDays.includes(todayWeekday)
    );

    habitsDueToday.forEach((h) => {
      combined.push({
        type: "habit",
        data: h,
        sortTime: h.time || "99:99",
      });
    });

    todaysTodos.forEach((t) => {
      combined.push({
        type: "todo",
        data: t,
        sortTime: t.time || "99:99",
      });
    });

    return combined.sort((a, b) => a.sortTime.localeCompare(b.sortTime));
  }, [habits, todaysTodos, todayWeekday]);

  return (
    <TodayCard className="no-scrollbar">
      <CardHeader style={{ marginBottom: 12 }}>
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-left">
            Today&apos;s Schedule
          </h2>
          <CardMeta className="text-left" style={{ fontSize: 14 }}>
            {items.length} items for today
          </CardMeta>
        </div>
      </CardHeader>

      <QuickHabitList style={{ gap: 6 }}>
        {items.length === 0 && (
          <CardMeta style={{ padding: 40, textAlign: "center", fontSize: 15 }}>
            Nothing scheduled for today yet.
            <br />
            Add a habit or task using the + button.
          </CardMeta>
        )}
        {items.map((item) => {
          if (item.type === "habit") {
            const h = item.data;
            const checked = h.completions.includes(today);
            const streak = h.completions.length;
            const timeDisplay = formatTime12(h.time);

            return (
              <ItemRow
                themeMode={themeMode}
                key={`habit-${h.id}`}
                checked={checked}
                color={h.color}
                onClick={() => onToggleHabitCompletion(h.id, today)}
              >
                <ItemLeftContent>
                  <CheckedPointer checked={checked} color={h.color} />
                  {h.icon && <ItemIcon>{h.icon}</ItemIcon>}
                  <ItemTextContent>
                    <ItemTitle>{h.name}</ItemTitle>
                    {timeDisplay && <ItemTime>| {timeDisplay}</ItemTime>}
                  </ItemTextContent>
                </ItemLeftContent>

                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <StreakPill style={{ fontSize: 11, padding: "2px 8px" }}>
                    {streak}d
                  </StreakPill>
                </div>
              </ItemRow>
            );
          } else {
            const t = item.data;
            return (
              <ItemRow
                themeMode={themeMode}
                key={`todo-${t.id}`}
                checked={t.completed}
                color="#A66CFF"
                onClick={() => onToggleTodoCompletion(t.id)}
              >
                <ItemLeftContent>
                  <CheckedPointer checked={t.completed} color="#A66CFF" />
                  <ItemTextContent>
                    <ItemTitle>{t.text}</ItemTitle>
                  </ItemTextContent>
                </ItemLeftContent>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditTodo(t);
                    }}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "#6B7280",
                      padding: 4,
                      display: "flex",
                    }}
                    title="Edit Task"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteTodo(t.id);
                    }}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "#6B7280",
                      padding: 4,
                      display: "flex",
                    }}
                    title="Delete Task"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </ItemRow>
            );
          }
        })}
      </QuickHabitList>
    </TodayCard>
  );
}
