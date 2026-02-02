import { useMemo } from "react";
import styled from "styled-components";
import moment from "moment";
import { type Habit } from "../types";
import { useTheme } from "../contexts/ThemeContext";
import { CalendarGrid, DayCell, CalendarRow } from "./ui";

const StartPoint = styled.div`
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.accent};
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
`;

type HabitCalendarGridProps = {
  habit: Habit;
  today: string;
  currentDate: Date;
};

export function HabitCalendarGrid({
  habit,
  today,
  currentDate,
}: HabitCalendarGridProps) {
  const { themeMode } = useTheme();

  const daysInMonth = useMemo(() => {
    const start = moment(currentDate).startOf("month");
    const month = start.month();
    const days: (string | null)[] = [];

    const startDay = start.day() - 1;
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    let cursor = start.clone();
    while (cursor.month() === month) {
      days.push(cursor.format("YYYY-MM-DD"));
      cursor = cursor.add(1, "day");
    }

    return days;
  }, [currentDate]);

  return (
    <div>
      <CalendarRow>
        <span>M</span>
        <span>T</span>
        <span>W</span>
        <span>T</span>
        <span>F</span>
        <span>S</span>
        <span>S</span>
      </CalendarRow>

      <CalendarGrid themeMode={themeMode}>
        {daysInMonth.map((date, index) => {
          if (!date) {
            return (
              <DayCell
                key={`empty-${index}`}
                intensity={-2}
                isToday={false}
                color={habit.color}
                themeMode={themeMode}
              />
            );
          }

          const dateMoment = moment(date, "YYYY-MM-DD");
          const todayMoment = moment(today, "YYYY-MM-DD");
          const isFuture = dateMoment.isAfter(todayMoment, "day");
          const isCompleted = habit.completions.includes(date);

          const intensity = isFuture ? -1 : isCompleted ? 2 : 0;
          const isToday = dateMoment.isSame(todayMoment, "day");
          const isStartDay = date === habit.createdAt;

          return (
            <DayCell
              key={date}
              intensity={intensity}
              isToday={isToday}
              style={{ position: "relative" }}
              color={habit.color}
              themeMode={themeMode}
            >
              {isStartDay && <StartPoint />}
            </DayCell>
          );
        })}
      </CalendarGrid>
    </div>
  );
}
