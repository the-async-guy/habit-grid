import { useState } from "react";
import { type DailyTodo } from "../types";
import {
  CardMeta,
  Checklist,
  ChecklistCheckbox,
  ChecklistItem,
  ChecklistText,
  PillInput,
  PillInputRow,
  SubtleButton,
} from "./ui";

type TodayTodosProps = {
  todos: DailyTodo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
};

export function TodayTodosSection({
  todos,
  addTodo,
  toggleTodo,
}: TodayTodosProps) {
  const [text, setText] = useState("");

  return (
    <>
      <PillInputRow
        onSubmit={(e) => {
          e.preventDefault();
          addTodo(text);
          setText("");
        }}
      >
        <PillInput
          placeholder="Capture a quick todo for today"
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Add daily todo"
        />
        <SubtleButton type="submit">Add</SubtleButton>
      </PillInputRow>

      <Checklist>
        {todos.length === 0 && (
          <CardMeta>No daily todos yet. Offload what’s in your head.</CardMeta>
        )}
        {todos.map((t) => (
          <ChecklistItem key={t.id} completed={t.completed}>
            <ChecklistText>
              <ChecklistCheckbox
                checked={t.completed}
                onChange={() => toggleTodo(t.id)}
                aria-label={t.text}
              />
              {t.text}
            </ChecklistText>
          </ChecklistItem>
        ))}
      </Checklist>
    </>
  );
}
