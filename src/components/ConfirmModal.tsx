import styled from "styled-components";

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
  }
`;

const Dialog = styled.div`
  background: ${(props) => props.theme.card};
  border: 1px solid ${(props) => props.theme.borderSubtle};
  border-radius: 20px;
  width: 100%;
  max-width: 360px;
  padding: 20px;

  @media (min-width: 481px) {
    padding: 24px;
  }
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h3`
  margin: 0 0 8px;
  font-size: 18px;
  color: ${(props) => props.theme.textPrimary};
`;

const Message = styled.p`
  margin: 0 0 24px;
  font-size: 14px;
  color: ${(props) => props.theme.textSecondary};
  line-height: 1.5;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const Button = styled.button<{ $variant?: "primary" | "danger" | "ghost" }>`
  border-radius: 10px;
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  transition: filter 0.15s ease;

  &:hover {
    filter: brightness(1.05);
  }

  ${({ $variant = "ghost", theme }) =>
    $variant === "ghost" &&
    `
    background: transparent;
    border-color: ${theme.borderSubtle};
    color: ${theme.textSecondary};
  `}
  ${({ $variant }) =>
    $variant === "danger" &&
    `
    background: #dc2626;
    color: white;
    border-color: #dc2626;
  `}
  ${({ $variant, theme }) =>
    $variant === "primary" &&
    `
    background: ${theme.accent};
    color: white;
  `}
`;

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "primary" | "danger";
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Overlay onClick={onClose}>
      <Dialog onClick={(e) => e.stopPropagation()}>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <Actions>
          <Button type="button" $variant="ghost" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button type="button" $variant={variant} onClick={handleConfirm}>
            {confirmLabel}
          </Button>
        </Actions>
      </Dialog>
    </Overlay>
  );
}
