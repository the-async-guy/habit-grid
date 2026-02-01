import { useState, useMemo } from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import moment from "moment";
import { type Habit } from "../types";
import { useTheme } from "../contexts/ThemeContext";
import { CalendarGrid, DayCell, CalendarRow } from "./ui";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const MonthLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.textPrimary};
`;

const NavButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.textSecondary};
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  &:hover {
    color: ${({ theme }) => theme.textPrimary};
    background: ${({ theme }) => theme.accentSoft};
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    background: transparent;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

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
};

export function HabitCalendarGrid({ habit, today }: HabitCalendarGridProps) {
  const { themeMode } = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = useMemo(() => {
    const start = moment(currentDate).startOf("month");
    const month = start.month();
    const days: (string | null)[] = [];

    let startDay = start.day() - 1;
    if (startDay === -1) startDay = 6;

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

  const canGoNext = useMemo(() => {
    const currentMonth = moment(currentDate);
    const now = moment();
    return currentMonth.isBefore(now, "month");
  }, [currentDate]);

  const handlePrevMonth = () => {
    setCurrentDate((prev) => moment(prev).subtract(1, "month").toDate());
  };

  const handleNextMonth = () => {
    if (!canGoNext) return;
    setCurrentDate((prev) => moment(prev).add(1, "month").toDate());
  };

  return (
    <div>
      <Header>
        <NavButton onClick={handlePrevMonth} aria-label="Previous month">
          <ChevronLeft size={16} />
        </NavButton>
        <MonthLabel>
          {currentDate.toLocaleDateString(undefined, {
            month: "long",
            year: "numeric",
          })}
        </MonthLabel>
        <NavButton
          onClick={handleNextMonth}
          aria-label="Next month"
          disabled={!canGoNext}
        >
          <ChevronRight size={16} />
        </NavButton>
      </Header>

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
                intensity={-1}
                isToday={false}
                color={habit.color}
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
            >
              {isStartDay && <StartPoint />}
            </DayCell>
          );
        })}
      </CalendarGrid>
    </div>
  );
}
