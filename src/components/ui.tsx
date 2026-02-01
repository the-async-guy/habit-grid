import styled from "styled-components";

export const AppShell = styled.div`
  display: flex;
  min-height: 100vh;
  background: radial-gradient(
    120% 120% at 0% 0%,
    #1b1b1f 0%,
    #000 40%,
    #020617 100%
  );
  color: ${({ theme }) => theme.textPrimary};
`;

export const SidebarContainer = styled.aside.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})<{ isOpen?: boolean }>`
  width: 260px;
  padding: 24px 20px;
  max-height: 100vh;
  border-right: 1px solid ${({ theme }) => theme.borderSubtle};
  backdrop-filter: blur(22px);
  background: ${({ theme }) =>
    theme.mode === "dark"
      ? `linear-gradient(
    160deg,
    rgba(24, 24, 27, 0.95),
    rgba(12, 12, 14, 0.98)
  )`
      : theme.card};
  box-shadow: ${({ theme }) => theme.shadowSoft};
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 900px) {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 60;
    transform: translateX(${({ isOpen }) => (isOpen ? "0" : "-100%")});
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-right: none;
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.3);
  }
`;

export const BrandRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const BrandMark = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 0 14px 14px 14px;
  background: conic-gradient(
    from 220deg,
    #0a84ff,
    #30d158,
    #ff9f0a,
    #ff2d55,
    #0a84ff
  );
  box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.9);
`;

export const BrandText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BrandTitle = styled.span`
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.02em;
`;

export const BrandSubtitle = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.textSecondary};
`;

export const ThemeToggleButton = styled.button`
  border-radius: 999px;
  padding: 6px 10px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  color: ${({ theme }) => theme.textSecondary};
  font-size: 11px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  backdrop-filter: blur(18px);
  box-shadow: 0 6px 26px rgba(0, 0, 0, 0.25);
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 34px rgba(0, 0, 0, 0.45);
  }
`;

export const NavSection = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const NavLabel = styled.div`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 4px;
`;

export const NavItem = styled.button<{ active?: boolean }>`
  width: 100%;
  border: none;
  border-radius: 999px;
  padding: 9px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background: ${({ active, theme }) =>
    active ? theme.accentSoft : "transparent"};
  color: ${({ theme }) => theme.textPrimary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.accentSoft};
  }
`;

export const NavItemLeft = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
`;

export const NavItemBadge = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.textSecondary};
`;

export const MotivationalCard = styled.div`
  margin-top: auto;
  padding: 14px 12px;
  border-radius: 18px;
  background: ${({ theme }) =>
    theme.mode === "dark"
      ? `radial-gradient(
          circle at 0% 0%,
          rgba(10, 132, 255, 0.18),
          rgba(28, 28, 30, 0.95)
        )`
      : `linear-gradient(
          135deg,
          rgba(56, 189, 248, 0.14),
          rgba(59, 130, 246, 0.08)
        )`};
  border: 1px solid
    ${({ theme }) =>
      theme.mode === "dark"
        ? "rgba(56, 189, 248, 0.28)"
        : "rgba(148, 163, 184, 0.4)"};
  box-shadow: ${({ theme }) =>
    theme.mode === "dark"
      ? "0 12px 30px rgba(15, 23, 42, 0.85)"
      : "0 10px 24px rgba(15, 23, 42, 0.12)"};
  color: ${({ theme }) => theme.textPrimary};
  font-size: 13px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const MotivationalAccent = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.textSecondary};
`;

export const ConfettiDotRow = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 6px;
`;

export const ConfettiDot = styled.div<{ color: string }>`
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background: ${({ color }) => color};
`;

export const Content = styled.main`
  flex: 1;
  padding: 18px 18px 80px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 1160px;
  margin: 0 auto;

  @media (max-width: 900px) {
    padding-top: 12px;
  }
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const ViewTitle = styled.h1`
  margin: 0;
  font-size: 24px;
  letter-spacing: -0.03em;
  display: flex;
  align-items: baseline;
  gap: 8px;
`;

export const ViewSubtitle = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.textSecondary};
`;

export const TodayPill = styled.div`
  padding: 6px 11px;
  border-radius: 999px;
  font-size: 12px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  color: ${({ theme }) => theme.textSecondary};
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2.2fr) minmax(0, 2fr);
  gap: 14px;

  @media (max-width: 1100px) {
    grid-template-columns: minmax(0, 1.6fr) minmax(0, 2fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Card = styled.section`
  border-radius: 18px;
  padding: 14px 14px 12px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  box-shadow: ${({ theme }) => theme.shadowSoft};
  backdrop-filter: blur(18px);
`;

export const CardHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
`;

export const CardTitle = styled.h2`
  margin: 0;
  font-size: 15px;
  font-weight: 600;
`;

export const CardMeta = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.textSecondary};
`;

export const PrimaryButton = styled.button`
  border-radius: 999px;
  border: none;
  padding: 7px 12px;
  font-size: 12px;
  font-weight: 500;
  background: linear-gradient(135deg, #0a84ff, #64d2ff);
  color: #ffffff;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(15, 118, 246, 0.65);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-0.5px) scale(1.01);
    box-shadow: 0 14px 40px rgba(59, 130, 246, 0.75);
  }
`;

export const SubtleButton = styled.button`
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  background: transparent;
  padding: 6px 10px;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 11px;
  cursor: pointer;
`;

export const QuickHabitList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: calc(100vh - 145px);
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 4px;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 900px) {
    max-height: calc(100vh - 280px);
  }

  @media (max-width: 480px) {
    max-height: calc(100vh - 240px);
  }
`;

export const QuickHabitRow = styled.button<{ color: string; checked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 9px;
  border-radius: 14px;
  border: 1px solid
    ${({ checked, color, theme }) => (checked ? color : theme.borderSubtle)};
  background: ${({ checked }) =>
    checked
      ? "linear-gradient(110deg, rgba(52, 211, 153, 0.22), rgba(15, 23, 42, 0.9))"
      : "rgba(15, 23, 42, 0.7)"};
  color: inherit;
  cursor: pointer;
  transition: all 0.18s ease;
`;

export const QuickHabitLeft = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
`;

export const HabitDot = styled.span<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: ${({ color }) => color};
  box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.7);
`;

export const CheckCircle = styled.span<{ checked: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 1.5px solid
    ${({ checked, theme }) => (checked ? theme.success : theme.borderSubtle)};
  background: ${({ checked, theme }) =>
    checked ? theme.success : "transparent"};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #000;
`;

export const StreakPill = styled.span`
  border-radius: 999px;
  padding: 2px 8px;
  font-size: 11px;
  background: rgba(234, 179, 8, 0.2);
  color: #facc15;
`;

export const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
`;

export const Tag = styled.span`
  border-radius: 999px;
  padding: 3px 7px;
  font-size: 11px;
  background: rgba(15, 23, 42, 0.8);
  color: ${({ theme }) => theme.textSecondary};
`;

export const GridWrapper = styled.div`
  margin-top: 8px;
`;

export const CalendarRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 4px;
  font-size: 9px;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 6px;
`;

export const CalendarGrid = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "themeMode",
})<{ themeMode?: "light" | "dark" }>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  padding: 8px;
  border-radius: 12px;
  background: ${({ themeMode }) =>
    themeMode === "light"
      ? `linear-gradient(
          135deg,
          rgba(59, 130, 246, 0.06),
          rgba(255, 255, 255, 0.95)
        )`
      : `radial-gradient(
          circle at 0 0,
          rgba(56, 189, 248, 0.08),
          rgba(15, 23, 42, 0.9)
        )`};
  border: 1px solid
    ${({ themeMode }) =>
      themeMode === "light"
        ? "rgba(148, 163, 184, 0.2)"
        : "rgba(148, 163, 184, 0.3)"};
  width: 100%;
  aspect-ratio: 7 / 5;
`;

export const DayCell = styled.div<{
  intensity: number;
  isToday: boolean;
  color: string;
}>`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 4px;
  border: none;
  background: ${({ color, intensity, theme }) => {
    if (intensity < 0) {
      return theme.mode === "dark"
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.1)";
    }
    if (intensity === 0) {
      return theme.mode === "dark"
        ? "rgba(55, 65, 81, 0.6)"
        : "rgba(229, 231, 235, 0.6)";
    }
    if (intensity === 2) {
      return color;
    }
    return color;
  }};
  opacity: ${({ intensity }) =>
    intensity < 0 ? 0.3 : intensity === 0 ? 0.5 : 1};
  box-shadow: ${({ isToday, intensity, theme }) =>
    isToday && intensity >= 0
      ? theme.mode === "dark"
        ? "0 0 0 2px #fff, 0 0 0 4px rgba(255, 255, 255, 0.2)"
        : "0 0 0 2px rgba(0, 0, 0, 0.3), 0 0 0 4px rgba(0, 0, 0, 0.1)"
      : "none"};
  transition: opacity 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
`;

export const AnalyticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 10px;
`;

export const StatValue = styled.div`
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.04em;
`;

export const StatDelta = styled.div<{ positive?: boolean }>`
  font-size: 11px;
  color: ${({ positive, theme }) =>
    positive ? theme.success : theme.textSecondary};
`;

export const Sparkline = styled.div`
  height: 34px;
  display: flex;
  gap: 2px;
  margin-top: 8px;
`;

export const SparkBar = styled.div<{ value: number }>`
  flex: 1;
  border-radius: 999px;
  background: linear-gradient(
    180deg,
    rgba(96, 165, 250, 0.95),
    rgba(56, 189, 248, 0.85)
  );
  opacity: ${({ value }) => 0.25 + value * 0.75};
  transform: scaleY(${({ value }) => 0.2 + value * 0.9});
  transform-origin: bottom;
`;

export const SimpleList = styled.ul`
  list-style: none;
  margin: 6px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13px;
`;

export const SimpleListItem = styled.li`
  display: flex;
  justify-content: space-between;
  gap: 6px;
`;

export const BottomTabBar = styled.nav`
  position: fixed;
  inset-inline: 12px;
  bottom: max(14px, env(safe-area-inset-bottom));
  border-radius: 999px;
  padding: 6px;
  display: none;
  align-items: center;
  justify-content: space-around;
  gap: 4px;
  background: ${({ theme }) => theme.card};
  backdrop-filter: blur(22px);
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  box-shadow: ${({ theme }) => theme.shadowSoft};
  z-index: 30;

  @media (max-width: 900px) {
    display: flex;
  }

  @media (max-width: 480px) {
    inset-inline: 10px;
    padding: 6px 4px;
  }
`;

export const BottomTabButton = styled.button<{ active?: boolean }>`
  flex: 1;
  border-radius: 999px;
  border: none;
  padding: 7px 10px;
  font-size: 11px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  background: ${({ active, theme }) =>
    active ? theme.accentSoft : "transparent"};
  color: ${({ theme }) => theme.textSecondary};
  cursor: pointer;
  transition: all 0.18s ease;

  span:first-child {
    font-size: 13px;
  }
`;

export const HabitListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 260px;
  overflow: auto;
  padding-right: 4px;
`;

export const HabitCardRow = styled.div<{ active?: boolean }>`
  display: grid;
  grid-template-columns: minmax(0, 2.3fr) 80px;
  gap: 6px;
  padding: 9px 10px;
  border-radius: 14px;
  border: 1px solid
    ${({ active, theme }) => (active ? theme.accent : theme.borderSubtle)};
  background: ${({ active }) =>
    active
      ? "linear-gradient(120deg, rgba(37, 99, 235,0.4), rgba(15, 23, 42, 0.95))"
      : "rgba(15, 23, 42, 0.8)"};
`;

export const HabitCardTitle = styled.div`
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const HabitCardMeta = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.textSecondary};
  margin-top: 2px;
`;

export const HabitCardActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
`;

export const IconButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.5);
  background: transparent;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 11px;
  cursor: pointer;
`;

export const PillInputRow = styled.form`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const PillInput = styled.input`
  flex: 1;
  min-width: 120px;
  border-radius: 999px;
  padding: 7px 10px;
  border: 1px solid rgba(55, 65, 81, 0.9);
  background: rgba(15, 23, 42, 0.95);
  color: inherit;
  font-size: 12px;
  outline: none;

  &:focus {
    border-color: rgba(59, 130, 246, 0.9);
    box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.9);
  }
`;

export const MiniSelect = styled.select`
  border-radius: 999px;
  padding: 7px 10px;
  border: 1px solid rgba(55, 65, 81, 0.9);
  background: rgba(15, 23, 42, 0.95);
  color: inherit;
  font-size: 12px;
  outline: none;
`;

export const ColorSwatchRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
`;

export const ColorSwatch = styled.button<{
  color: string;
  active?: boolean;
  themeMode: "light" | "dark";
}>`
  width: 24px;
  height: 24px;
  border-radius: 8px;
  border: none;
  outline: 2px solid
    ${({ active, themeMode }) =>
      active ? (themeMode === "dark" ? "white" : "black") : "transparent"};
  background: ${({ color }) => color};
  cursor: pointer;
`;

export const IconPickerRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
`;

export const IconChip = styled.button<{ active?: boolean }>`
  border-radius: 999px;
  padding: 3px 7px;
  font-size: 12px;
  border: 1px solid
    ${({ active, theme }) => (active ? theme.accent : theme.borderSubtle)};
  background: ${({ active, theme }) =>
    active ? theme.accentSoft : "transparent"};
  cursor: pointer;
`;

export const Checklist = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 4px;
`;

export const ChecklistItem = styled.label<{ completed?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border-radius: 12px;
  padding: 7px 9px;
  font-size: 13px;
  background: rgba(15, 23, 42, 0.85);
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
  color: ${({ completed, theme }) =>
    completed ? theme.textSecondary : theme.textPrimary};
  cursor: pointer;
`;

export const ChecklistText = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

export const ChecklistCheckbox = styled.input.attrs({ type: "checkbox" })`
  width: 16px;
  height: 16px;
  border-radius: 4px;
`;
