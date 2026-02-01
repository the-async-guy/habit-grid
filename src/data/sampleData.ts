import { type AppData, type Habit, type DailyTodo } from "../types";
import moment from "moment";

const getDateString = (daysAgo: number): string => {
  const newDate = moment()
    .subtract(Math.abs(daysAgo), "days")
    .format("YYYY-MM-DD");
  return newDate;
};

// Generate completion dates for streaks
const generateCompletions = (
  startDaysAgo: number,
  count: number,
  skipDays: number[] = []
): string[] => {
  const completions: string[] = [];
  for (let i = 0; i < count; i++) {
    const daysAgo = Math.abs(startDaysAgo - i);
    if (!skipDays.includes(daysAgo)) {
      completions.push(getDateString(daysAgo));
    }
  }
  return completions;
};

export const sampleHabits: Habit[] = [
  {
    id: "habit-1",
    name: "Morning Meditation",
    color: "#0A84FF",
    icon: "🧘‍♀️",
    frequency: "daily",
    time: "07:00",
    createdAt: getDateString(45),
    completions: generateCompletions(
      0,
      38,
      [2, 5, 9, 12, 15, 18, 22, 25, 28, 31, 35]
    ),
    order: 0,
  },
  {
    id: "habit-2",
    name: "Morning Run",
    color: "#2ECC71",
    icon: "🏃‍♂️",
    frequency: "daily",
    time: "06:30",
    createdAt: getDateString(60),
    completions: generateCompletions(
      0,
      52,
      [1, 3, 6, 8, 10, 13, 16, 19, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51]
    ),
    order: 1,
    repeatDays: ["monday", "wednesday", "friday", "saturday"],
  },
  {
    id: "habit-3",
    name: "Read for 30 minutes",
    color: "#A66CFF",
    icon: "📚",
    frequency: "daily",
    time: "21:00",
    createdAt: getDateString(30),
    completions: generateCompletions(0, 25, [4, 7, 11, 14, 17, 20, 23, 26]),
    order: 2,
  },
  {
    id: "habit-4",
    name: "Drink 8 glasses of water",
    color: "#1ABCFF",
    icon: "💧",
    frequency: "daily",
    createdAt: getDateString(90),
    completions: generateCompletions(
      0,
      78,
      [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
    ),
    order: 3,
  },
  {
    id: "habit-5",
    name: "Gratitude Journal",
    color: "#FF9F0A",
    icon: "✨",
    frequency: "daily",
    time: "22:00",
    createdAt: getDateString(20),
    completions: generateCompletions(0, 18, [5, 8, 12, 15]),
    order: 4,
  },
  {
    id: "habit-6",
    name: "No Social Media Before Noon",
    color: "#FF6B6B",
    icon: "📱",
    frequency: "daily",
    createdAt: getDateString(35),
    completions: generateCompletions(
      0,
      28,
      [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32]
    ),
    order: 5,
  },
  {
    id: "habit-7",
    name: "Evening Stretch",
    color: "#34C759",
    icon: "🧘",
    frequency: "daily",
    time: "20:00",
    createdAt: getDateString(15),
    completions: generateCompletions(0, 12, [3, 6, 9]),
    order: 6,
  },
  {
    id: "habit-8",
    name: "Practice Piano",
    color: "#5856D6",
    icon: "🎹",
    frequency: "daily",
    time: "19:00",
    createdAt: getDateString(50),
    completions: generateCompletions(
      0,
      42,
      [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40]
    ),
    order: 7,
    repeatDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
  },
  {
    id: "habit-9",
    name: "10,000 Steps",
    color: "#FFC857",
    icon: "🚶‍♂️",
    frequency: "daily",
    createdAt: getDateString(25),
    completions: generateCompletions(0, 20, [2, 5, 8, 11, 14, 17]),
    order: 8,
  },
  {
    id: "habit-10",
    name: "Learn Spanish",
    color: "#FF6FD8",
    icon: "🇪🇸",
    frequency: "daily",
    time: "18:00",
    createdAt: getDateString(40),
    completions: generateCompletions(
      0,
      33,
      [3, 6, 9, 12, 15, 18, 21, 24, 27, 30]
    ),
    order: 9,
    repeatDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
  },
  {
    id: "habit-11",
    name: "Evening Walk",
    color: "#30D158",
    icon: "🌅",
    frequency: "daily",
    time: "18:30",
    createdAt: getDateString(22),
    completions: generateCompletions(0, 17, [4, 7, 11, 14, 18]),
    order: 10,
    repeatDays: ["saturday", "sunday"],
  },
  {
    id: "habit-12",
    name: "Plan Tomorrow",
    color: "#FF375F",
    icon: "📝",
    frequency: "daily",
    time: "21:30",
    createdAt: getDateString(28),
    completions: generateCompletions(0, 23, [2, 5, 8, 12, 15, 19, 22]),
    order: 11,
  },
];

export const sampleTodos: DailyTodo[] = [
  {
    id: "todo-1",
    text: "Review project proposal",
    completed: false,
    date: getDateString(0),
  },
  {
    id: "todo-2",
    text: "Call dentist for appointment",
    completed: true,
    date: getDateString(0),
    completedAt: getDateString(0) + "T10:30:00",
  },
  {
    id: "todo-3",
    text: "Buy groceries",
    completed: false,
    date: getDateString(0),
  },
  {
    id: "todo-4",
    text: "Finish quarterly report",
    completed: true,
    date: getDateString(1),
    completedAt: getDateString(1) + "T16:45:00",
  },
  {
    id: "todo-5",
    text: "Schedule team meeting",
    completed: false,
    date: getDateString(1),
  },
  {
    id: "todo-6",
    text: "Update resume",
    completed: true,
    date: getDateString(2),
    completedAt: getDateString(2) + "T14:20:00",
  },
  {
    id: "todo-7",
    text: "Organize workspace",
    completed: false,
    date: getDateString(2),
  },
];

export const sampleData: AppData = {
  habits: sampleHabits,
  todos: {
    daily: sampleTodos,
  },
  preferences: {
    theme: "dark",
    firstDayOfWeek: "monday",
    habitGridColumns: 3,
  },
};
