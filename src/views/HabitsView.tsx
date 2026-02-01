import { useState } from "react";
import styled from "styled-components";
import { type Habit } from "../types";
import {
  Card,
  CardHeader,
  CardMeta,
  CardTitle,
  GridWrapper,
  IconButton,
} from "../components/ui";
import { ConfirmModal } from "../components/ConfirmModal";
import { HabitCalendarGrid } from "../components/HabitCalendarGrid";
import { Trash2, Edit2 } from "lucide-react";

const GridContainer = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: repeat(
    ${({ $columns }) => $columns},
    minmax(min(100%, 260px), 1fr)
  );
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
  gap: 14px;
  min-height: 320px;

  @media (min-width: 901px) {
    gap: 16px;
    min-height: 380px;
  }
`;

const ColumnsRow = styled.div`
  display: none;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
  padding: 0 4px;

  @media (min-width: 901px) {
    display: flex;
    margin-bottom: 16px;
    padding: 0 10px;
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

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const HabitsViewWrapper = styled.div`
  padding: 20px 8px 24px;
  height: 100vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 480px) {
    padding: 14px 6px 24px;
  }

  @media (min-width: 901px) {
    padding: 32px 10px;
  }
`;

const COLUMN_OPTIONS = [2, 3, 4, 5, 6] as const;

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

  return (
    <HabitsViewWrapper>
      <CardHeader style={{ marginBottom: 16, padding: "0 4px" }}>
        <div>
          <CardTitle style={{ fontSize: "clamp(20px, 5vw, 24px)" }}>
            Habits Overview
          </CardTitle>
          <CardMeta style={{ fontSize: 14 }}>
            Track your consistency across all habits
          </CardMeta>
        </div>
      </CardHeader>

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

      <GridContainer $columns={habitGridColumns}>
        {habits.map((habit) => (
          <HabitGridCard key={habit.id}>
            <HabitHeader>
              <div
                style={{
                  overflow: "hidden",
                }}
              >
                <CardTitle
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 18,
                  }}
                >
                  <span style={{ color: habit.color, fontSize: 14 }}>●</span>
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
                </CardTitle>
                <CardMeta style={{ marginTop: 6, fontSize: 13 }}>
                  {habit.time ? `At ${habit.time}` : "Any time"} ·{" "}
                  {habit.completions.length} completions
                </CardMeta>
              </div>
              <Actions>
                <IconButton onClick={() => onEditHabit(habit)} title="Edit">
                  <Edit2 size={16} />
                </IconButton>
                <IconButton
                  onClick={() => setHabitToDelete(habit)}
                  title="Delete"
                >
                  <Trash2 size={16} />
                </IconButton>
              </Actions>
            </HabitHeader>

            <GridWrapper style={{ flex: 1 }}>
              <HabitCalendarGrid habit={habit} today={today} />
            </GridWrapper>
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
