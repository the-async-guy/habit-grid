import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Plus, CheckSquare, Calendar } from "lucide-react";

const FabContainer = styled.div`
  position: fixed;
  bottom: calc(80px + max(14px, env(safe-area-inset-bottom)));
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  z-index: 100;

  @media (min-width: 901px) {
    bottom: 32px;
    right: 32px;
    gap: 12px;
  }

  @media (max-width: 480px) {
    right: 14px;
    bottom: calc(72px + max(14px, env(safe-area-inset-bottom)));
  }
`;

const FabButton = styled.button<{ $secondary?: boolean }>`
  width: ${(props) => (props.$secondary ? "44px" : "56px")};
  height: ${(props) => (props.$secondary ? "44px" : "56px")};
  border-radius: 50%;
  background: ${(props) =>
    props.$secondary ? props.theme.card : props.theme.accent};
  color: ${(props) => (props.$secondary ? props.theme.textPrimary : "#fff")};
  border: ${(props) =>
    props.$secondary ? `1px solid ${props.theme.borderSubtle}` : "none"};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);

  @media (min-width: 901px) {
    width: ${(props) => (props.$secondary ? "48px" : "64px")};
    height: ${(props) => (props.$secondary ? "48px" : "64px")};
  }

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const SecondaryFab = styled(FabButton)`
  width: auto;
  height: 38px;
  border-radius: 999px;
  padding: 0 12px;
  display: inline-flex;
  gap: 6px;
  justify-content: center;
  font-size: 12px;

  @media (min-width: 901px) {
    height: 40px;
    padding: 0 14px;
    gap: 8px;
    font-size: 13px;
  }
`;

interface FABProps {
  onAddHabit: () => void;
  onAddTodo: () => void;
}

export function FloatingActionButton({ onAddHabit, onAddTodo }: FABProps) {
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Close the FAB menu when the user clicks outside of it
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (
        containerRef.current &&
        target &&
        !containerRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <FabContainer ref={containerRef}>
      {isOpen && (
        <>
          <ActionRow>
            <SecondaryFab
              $secondary
              onClick={() => {
                onAddHabit();
                setIsOpen(false);
              }}
            >
              <span style={{ fontSize: 13 }}>Add Habit</span>
              <Calendar size={20} />
            </SecondaryFab>
          </ActionRow>
          <ActionRow>
            <SecondaryFab
              $secondary
              onClick={() => {
                onAddTodo();
                setIsOpen(false);
              }}
            >
              <span style={{ fontSize: 13 }}>Add Task</span>
              <CheckSquare size={20} />
            </SecondaryFab>
          </ActionRow>
        </>
      )}
      <FabButton onClick={() => setIsOpen(!isOpen)}>
        <Plus
          size={32}
          style={{
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        />
      </FabButton>
    </FabContainer>
  );
}
