import { useState, useEffect } from "react";
import styled from "styled-components";
import { X } from "lucide-react";
import { type Weekday } from "../types";
import { ColorSwatch, ColorSwatchRow, IconChip, IconPickerRow } from "./ui";

const WEEKDAYS: Weekday[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

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

const ICONS = [
  "⭐️",
  "💪",
  "🧘‍♀️",
  "📚",
  "💧",
  "🥗",
  "📝",
  "🛏",
  "🚶‍♂️",
  "🎧",
  "💻",
  "🎨",
];

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  padding-bottom: max(16px, env(safe-area-inset-bottom));

  @media (max-width: 480px) {
    padding: 12px;
    align-items: flex-end;
  }
`;

const Dialog = styled.div`
  background: ${(props) => props.theme.card};
  border: 1px solid ${(props) => props.theme.borderSubtle};
  border-radius: 20px;
  width: 100%;
  max-width: 440px;
  max-height: calc(100vh - 32px);
  overflow-y: auto;
  padding: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);

  @media (max-width: 480px) {
    border-radius: 20px 20px 0 0;
    max-height: 88vh;
    padding: 20px 16px 24px;
  }

  @media (min-width: 481px) {
    padding: 24px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => props.theme.textSecondary};
  cursor: pointer;
  padding: 4px;

  &:hover {
    color: ${(props) => props.theme.textPrimary};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: ${(props) => props.theme.textSecondary};
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${(props) => props.theme.borderSubtle};
  border-radius: 10px;
  padding: 12px 14px;
  color: ${(props) => props.theme.textPrimary};
  font-size: 15px;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.accent};
  }
`;

const Button = styled.button`
  background: ${(props) => props.theme.accent};
  color: white;
  border: none;
  border-radius: 10px;
  padding: 14px;
  font-weight: 600;
  font-size: 15px;
  margin-top: 12px;
  cursor: pointer;

  &:hover {
    filter: brightness(1.1);
  }
`;

const TypeToggleGroup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.12);
  border: 1px solid ${(props) => props.theme.borderSubtle};
`;

const TypeToggleButton = styled.button<{ active: boolean }>`
  border-radius: 999px;
  border: none;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  background: ${({ active, theme }) =>
    active ? theme.accentSoft : "transparent"};
  color: ${({ active, theme }) =>
    active ? theme.textPrimary : theme.textSecondary};
  transition: background 0.15s ease, color 0.15s ease, transform 0.15s ease;

  &:hover {
    transform: translateY(-0.5px);
  }
`;

interface ItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    time?: string;
    type: "habit" | "todo";
    color?: string;
    icon?: string;
    id?: string;
    repeatDays?: Weekday[];
  }) => void;
  initialType?: "habit" | "todo";
  initialData?: {
    id: string;
    name: string;
    time?: string;
    type: "habit" | "todo";
    color?: string;
    icon?: string;
    repeatDays?: Weekday[];
  } | null;
  themeMode: "light" | "dark";
}

export function ItemDialog({
  isOpen,
  onClose,
  onSubmit,
  initialType = "todo",
  initialData = null,
  themeMode,
}: ItemDialogProps) {
  const [form, setForm] = useState({
    name: "",
    time: "",
    type: initialType,
    color: HABIT_COLORS[0],
    icon: undefined as string | undefined,
    repeatDays: undefined as Weekday[] | undefined,
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setForm({
          name: initialData.name,
          time: initialData.time || "",
          type: initialData.type,
          color: initialData.color || HABIT_COLORS[0],
          icon: initialData.icon,
          repeatDays: initialData.repeatDays,
        });
      } else {
        setForm({
          name: "",
          time: "",
          type: initialType,
          color: HABIT_COLORS[Math.floor(Math.random() * HABIT_COLORS.length)],
          icon: undefined,
          repeatDays: undefined,
        });
      }
    }
  }, [isOpen, initialType, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSubmit({
      name: form.name,
      time: form.time || undefined,
      type: form.type,
      color: form.type === "habit" ? form.color : undefined,
      icon: form.type === "habit" ? form.icon : undefined,
      id: initialData?.id,
      repeatDays: form.type === "habit" ? form.repeatDays : undefined,
    });
    onClose();
  };

  const updateField = (
    field: string,
    value: string | undefined | Weekday[]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleRepeatDay = (day: Weekday) => {
    setForm((prev) => {
      const current = prev.repeatDays ?? [];
      const next = current.includes(day)
        ? current.filter((d) => d !== day)
        : [...current, day].sort(
            (a, b) => WEEKDAYS.indexOf(a) - WEEKDAYS.indexOf(b)
          );
      return { ...prev, repeatDays: next.length === 0 ? undefined : next };
    });
  };

  return (
    <Overlay onClick={onClose}>
      <Dialog onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>
            {initialData
              ? "Edit Item"
              : `Add ${form.type === "habit" ? "Habit" : "Task"}`}
          </Title>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </Header>
        <Form onSubmit={handleSubmit}>
          {!initialData && (
            <InputGroup>
              <Label>Type</Label>
              <div>
                <TypeToggleGroup role="radiogroup" aria-label="Item type">
                  <TypeToggleButton
                    type="button"
                    active={form.type === "todo"}
                    onClick={() => updateField("type", "todo")}
                  >
                    Task
                  </TypeToggleButton>
                  <TypeToggleButton
                    type="button"
                    active={form.type === "habit"}
                    onClick={() => updateField("type", "habit")}
                  >
                    Habit
                  </TypeToggleButton>
                </TypeToggleGroup>
              </div>
            </InputGroup>
          )}

          <InputGroup>
            <Label>Name</Label>
            <Input
              autoFocus
              placeholder={
                form.type === "habit"
                  ? "e.g. Morning Run"
                  : "e.g. Buy groceries"
              }
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </InputGroup>

          {form.type === "habit" && (
            <>
              <InputGroup>
                <Label>Time (optional)</Label>
                <Input
                  type="time"
                  value={form.time}
                  onChange={(e) => updateField("time", e.target.value)}
                />
              </InputGroup>
              <InputGroup>
                <Label>Repeat</Label>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  <TypeToggleGroup>
                    <TypeToggleButton
                      type="button"
                      active={form.repeatDays === undefined}
                      onClick={() => updateField("repeatDays", undefined)}
                    >
                      Every day
                    </TypeToggleButton>
                    <TypeToggleButton
                      type="button"
                      active={form.repeatDays !== undefined}
                      onClick={() =>
                        updateField("repeatDays", form.repeatDays ?? WEEKDAYS)
                      }
                    >
                      Select days
                    </TypeToggleButton>
                  </TypeToggleGroup>
                  {form.repeatDays !== undefined && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 6,
                        marginTop: 4,
                      }}
                    >
                      {WEEKDAYS.map((day) => (
                        <label
                          key={day}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            fontSize: 12,
                            cursor: "pointer",
                            textTransform: "capitalize",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={(form.repeatDays ?? []).includes(day)}
                            onChange={() => toggleRepeatDay(day)}
                          />
                          {day.slice(0, 3)}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </InputGroup>
              <InputGroup>
                <Label>Color</Label>
                <ColorSwatchRow>
                  {HABIT_COLORS.map((c) => (
                    <ColorSwatch
                      key={c}
                      color={c}
                      active={form.color === c}
                      type="button"
                      onClick={() => updateField("color", c)}
                      themeMode={themeMode}
                    />
                  ))}
                </ColorSwatchRow>
              </InputGroup>

              <InputGroup>
                <Label>Icon</Label>
                <IconPickerRow>
                  {ICONS.map((ic) => (
                    <IconChip
                      key={ic}
                      active={form.icon === ic}
                      type="button"
                      onClick={() => updateField("icon", ic)}
                    >
                      {ic}
                    </IconChip>
                  ))}
                  <IconChip
                    active={!form.icon}
                    type="button"
                    onClick={() => updateField("icon", undefined)}
                  >
                    None
                  </IconChip>
                </IconPickerRow>
              </InputGroup>
            </>
          )}

          <Button type="submit">
            {initialData
              ? "Save Changes"
              : `Add ${form.type === "habit" ? "Habit" : "Task"}`}
          </Button>
        </Form>
      </Dialog>
    </Overlay>
  );
}
