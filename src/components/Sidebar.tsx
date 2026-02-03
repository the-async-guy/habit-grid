import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  CalendarCheck,
  CalendarClock,
  LayoutGrid,
  BarChart2,
  Moon,
  Sun,
  X,
} from "lucide-react";
import {
  Brand,
  BrandMark,
  BrandRow,
  BrandText,
  BrandTitle,
  ConfettiDot,
  ConfettiDotRow,
  MotivationalAccent,
  MotivationalCard,
  NavLabel,
  NavSection,
  SidebarContainer,
  ThemeToggleButton,
} from "./ui";

const StyledNavLink = styled(NavLink)`
  width: 100%;
  border: none;
  border-radius: 999px;
  padding: 9px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background: transparent;
  color: ${({ theme }) => theme.textPrimary};
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.accentSoft};
  }

  &.active {
    background: ${({ theme }) => theme.accentSoft};
    color: ${({ theme }) => theme.textPrimary};
  }
`;

const NavItemLeft = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
`;

const NavItemBadge = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.textSecondary};
`;

const CloseButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.textSecondary};
  cursor: pointer;
  padding: 4px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.textPrimary};
    background: ${({ theme }) => theme.accentSoft};
  }

  @media (max-width: 900px) {
    display: flex;
  }
`;

type SidebarProps = {
  habitsCount: number;
  funFact: string;
  themeMode: "light" | "dark";
  onToggleTheme: () => void;
  isOpen?: boolean;
  onClose?: () => void;
};

export function Sidebar({
  habitsCount,
  funFact,
  themeMode,
  onToggleTheme,
  isOpen = true,
  onClose,
}: SidebarProps) {
  return (
    <SidebarContainer isOpen={isOpen} style={{ display: "flex" }}>
      <BrandRow className="gap-2">
        <Brand>
          <BrandMark aria-hidden="true" />
          <BrandText>
            <BrandTitle>HabitGrid</BrandTitle>
          </BrandText>
        </Brand>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <ThemeToggleButton
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
          >
            {themeMode === "dark" ? <Moon size={14} /> : <Sun size={14} />}
            <span>{themeMode === "dark" ? "Dark" : "Light"}</span>
          </ThemeToggleButton>
          {onClose && (
            <CloseButton onClick={onClose} aria-label="Close menu">
              <X size={18} />
            </CloseButton>
          )}
        </div>
      </BrandRow>
      <NavSection aria-label="Primary navigation">
        <NavLabel>Schedule</NavLabel>
        <StyledNavLink to="/app" end onClick={() => onClose?.()}>
          <NavItemLeft>
            <CalendarCheck size={16} />
            <span>Today</span>
          </NavItemLeft>
          <NavItemBadge>
            {habitsCount} habit{habitsCount === 1 ? "" : "s"}
          </NavItemBadge>
        </StyledNavLink>
        <StyledNavLink to="/app/yesterday" onClick={() => onClose?.()}>
          <NavItemLeft>
            <CalendarClock size={16} />
            <span>Yesterday</span>
          </NavItemLeft>
        </StyledNavLink>
      </NavSection>
      <NavSection aria-label="Analytics and management">
        <NavLabel>Insights & Manage</NavLabel>
        <StyledNavLink to="/app/habits" onClick={() => onClose?.()}>
          <NavItemLeft>
            <LayoutGrid size={16} />
            <span>Habits Grid</span>
          </NavItemLeft>
        </StyledNavLink>
        <StyledNavLink to="/app/analytics" onClick={() => onClose?.()}>
          <NavItemLeft>
            <BarChart2 size={16} />
            <span>Analytics</span>
          </NavItemLeft>
        </StyledNavLink>
      </NavSection>
      <MotivationalCard aria-live="polite">
        <span>✨ {funFact}</span>
        <MotivationalAccent>
          One tap at a time. Consistency is key.
        </MotivationalAccent>
        <ConfettiDotRow aria-hidden="true">
          <ConfettiDot color="#0A84FF" />
          <ConfettiDot color="#30D158" />
          <ConfettiDot color="#FF9F0A" />
          <ConfettiDot color="#FF375F" />
        </ConfettiDotRow>
      </MotivationalCard>
    </SidebarContainer>
  );
}
