import moment from "moment";

export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type Habit = {
  id: string;
  name: string;
  color: string;
  icon?: string;
  frequency: "daily";
  time?: string;
  createdAt: string;
  targetStreak?: number;
  completions: string[];
  order: number;
  repeatDays?: Weekday[];
};

export type DailyTodo = {
  id: string;
  text: string;
  completed: boolean;
  date: string;
  time?: string;
  completedAt?: string;
};

export type Preferences = {
  theme: "dark" | "light" | "system";
  firstDayOfWeek: "monday" | "sunday";
  habitGridColumns?: number;
};

export type AppData = {
  habits: Habit[];
  todos: {
    daily: DailyTodo[];
  };
  preferences: Preferences;
};

export type TabKey = "today" | "analytics" | "habits";

export function dateToWeekday(isoDate: string): Weekday {
  const d = moment(isoDate, "YYYY-MM-DD");
  const dayIndex = d.day(); // 0 = Sunday, 6 = Saturday
  const mapping: Weekday[] = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  return mapping[dayIndex];
}
