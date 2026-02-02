import { useState, useMemo } from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import moment from "moment";
import { type Habit } from "../types";
import { Card, CardHeader, CardMeta, IconButton } from "../components/ui";
import { ConfirmModal } from "../components/ConfirmModal";
import { HabitCalendarGrid } from "../components/HabitCalendarGrid";
import { Trash2, Edit2 } from "lucide-react";

const GridContainer = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, minmax(0, 1fr));
  gap: 16px;
  padding: 8px 0;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  @media (min-width: 901px) {
    gap: 20px;
    padding: 10px;
  }
`;

const HabitGridCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
`;

const TopControlsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
  padding: 0 4px;

  @media (min-width: 901px) {
    margin-bottom: 20px;
    padding: 0 10px;
  }
`;

const MonthNav = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MonthLabel = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.textPrimary};
  min-width: 140px;
  text-align: center;
`;

const NavButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.textSecondary};
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.textPrimary};
    background: ${({ theme }) => theme.accentSoft};
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const ColumnsRow = styled.div`
  display: none;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;

  @media (min-width: 641px) {
    display: flex;
  }
`;

const ColumnsLabel = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.textSecondary};
`;

const ColumnOption = styled.button<{ $active: boolean }>`
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  background: ${({ $active, theme }) =>
    $active ? theme.accentSoft : "transparent"};
  padding: 6px 12px;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 12px;
  cursor: pointer;
`;

const HabitHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const HabitsViewWrapper = styled.div`
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
const COLUMN_OPTIONS = [2, 3, 4, 5, 6] as const;

const getFontSize = (columns: number) => {
  switch (columns) {
    case 1:
      return 18;
    case 2:
      return 17;
    case 3:
      return 16;
    case 4:
      return 15;
    case 5:
      return 14;
    case 6:
      return 13;
    default:
      return 12;
  }
};
interface HabitsViewProps {
  habits: Habit[];
  today: string;
  onDeleteHabit: (id: string) => void;
  onEditHabit: (habit: Habit) => void;
  habitGridColumns: number;
  onHabitGridColumnsChange: (n: number) => void;
}

export function HabitsView({
  habits,
  today,
  onDeleteHabit,
  onEditHabit,
  habitGridColumns,
  onHabitGridColumnsChange,
}: HabitsViewProps) {
  const [habitToDelete, setHabitToDelete] = useState<Habit | null>(null);
  const [gridMonth, setGridMonth] = useState(() => new Date());

  const { canGoPrev, canGoNext } = useMemo(() => {
    const now = moment(today).startOf("month");
    const current = moment(gridMonth).startOf("month");
    const earliest =
      habits.length > 0
        ? moment(
            habits.reduce(
              (min, h) => (h.createdAt < min ? h.createdAt : min),
              habits[0].createdAt
            )
          ).startOf("month")
        : current.clone().subtract(1, "year");
    return {
      canGoPrev: current.isAfter(earliest),
      canGoNext: current.isBefore(now),
    };
  }, [habits, today, gridMonth]);

  const handlePrevMonth = () => {
    setGridMonth((d) => moment(d).subtract(1, "month").toDate());
  };

  const handleNextMonth = () => {
    if (!canGoNext) return;
    setGridMonth((d) => moment(d).add(1, "month").toDate());
  };

  return (
    <HabitsViewWrapper className="">
      <CardHeader style={{ marginBottom: 16, padding: "0 4px" }}>
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-left">
            Habits Overview
          </h2>
          <CardMeta style={{ fontSize: 14 }}>
            Track your consistency across all habits
          </CardMeta>
        </div>
      </CardHeader>

      <TopControlsRow>
        <MonthNav>
          <NavButton
            onClick={handlePrevMonth}
            aria-label="Previous month"
            disabled={!canGoPrev}
          >
            <ChevronLeft size={20} />
          </NavButton>
          <MonthLabel>
            {gridMonth.toLocaleDateString(undefined, {
              month: "long",
              year: "numeric",
            })}
          </MonthLabel>
          <NavButton
            onClick={handleNextMonth}
            aria-label="Next month"
            disabled={!canGoNext}
          >
            <ChevronRight size={20} />
          </NavButton>
        </MonthNav>
        <ColumnsRow>
          <ColumnsLabel>Tiles per row:</ColumnsLabel>
          {COLUMN_OPTIONS.map((n) => (
            <ColumnOption
              key={n}
              type="button"
              $active={habitGridColumns === n}
              onClick={() => onHabitGridColumnsChange(n)}
            >
              {n}
            </ColumnOption>
          ))}
        </ColumnsRow>
      </TopControlsRow>

      <GridContainer $columns={habitGridColumns}>
        {habits.map((habit) => (
          <HabitGridCard key={habit.id} className="group">
            <HabitHeader>
              <div className="overflow-hidden">
                <div
                  style={{
                    fontSize: getFontSize(habitGridColumns),
                  }}
                  className="flex items-center gap-2 text-lg"
                >
                  {habit.icon && <span>{habit.icon}</span>}
                  <span
                    style={{
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                    title={habit.name}
                  >
                    {habit.name}
                  </span>
                </div>
              </div>
              <div className="flex md:hidden group-hover:flex gap-2">
                <IconButton
                  onClick={() => onEditHabit(habit)}
                  title="Edit"
                  style={{
                    width: habitGridColumns < 3 ? 26 : 20,
                    height: habitGridColumns < 3 ? 26 : 20,
                  }}
                >
                  <Edit2 size={habitGridColumns < 3 ? 15 : 12} />
                </IconButton>
                <IconButton
                  onClick={() => setHabitToDelete(habit)}
                  title="Delete"
                  style={{
                    width: habitGridColumns < 3 ? 26 : 20,
                    height: habitGridColumns < 3 ? 26 : 20,
                  }}
                >
                  <Trash2 size={habitGridColumns < 3 ? 15 : 12} />
                </IconButton>
              </div>
            </HabitHeader>
            <CardMeta className="text-left">
              {habit.time ? `At ${habit.time}` : "Any time"} ·{" "}
              {habit.completions.length} completions
            </CardMeta>

            <div className="flex-1">
              <HabitCalendarGrid
                habit={habit}
                today={today}
                currentDate={gridMonth}
              />
            </div>
          </HabitGridCard>
        ))}
      </GridContainer>

      <ConfirmModal
        isOpen={!!habitToDelete}
        onClose={() => setHabitToDelete(null)}
        onConfirm={() => habitToDelete && onDeleteHabit(habitToDelete.id)}
        title="Delete habit?"
        message={
          habitToDelete
            ? `"${habitToDelete.name}" and its history will be removed. This can't be undone.`
            : ""
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
      />
    </HabitsViewWrapper>
  );
}
