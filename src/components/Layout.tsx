import { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { CalendarCheck, LayoutGrid, BarChart2, Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import { BottomTabBar, BrandMark, BrandText, BrandTitle } from "./ui";

const FullScreenContainer = styled.div`
  display: flex;
  width: 100%;
  min-width: 0;
  min-height: 100vh;
  min-height: 100dvh;
  background-color: ${(props) => props.theme.background};
  overflow: hidden;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const ContentArea = styled.main`
  flex: 1;
  min-width: 0;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  padding: 16px 20px 100px;
  -webkit-overflow-scrolling: touch;

  @media (min-width: 901px) {
    padding: 24px 28px 32px;
  }

  @media (max-width: 480px) {
    padding: 12px 14px 100px;
  }
`;

const MobileHeader = styled.header`
  display: none;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.borderSubtle};
  z-index: 40;
  position: sticky;
  top: 0;

  @media (max-width: 900px) {
    display: flex;
  }
`;

const MobileHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const HamburgerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.textPrimary};
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.accentSoft};
  }
`;

const SidebarOverlay = styled.div<{ $isOpen: boolean }>`
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 50;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
  transition: opacity 0.3s ease;

  @media (max-width: 900px) {
    display: block;
  }
`;

const StyledBottomTabLink = styled(NavLink)`
  flex: 1;
  border-radius: 999px;
  border: none;
  padding: 7px 10px;
  font-size: 11px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  background: transparent;
  color: ${({ theme }) => theme.textSecondary};
  cursor: pointer;
  transition: all 0.18s ease;
  text-decoration: none;

  &.active {
    background: ${({ theme }) => theme.accentSoft};
    color: ${({ theme }) => theme.textPrimary};
  }

  span:first-child {
    font-size: 18px;
  }
`;

interface LayoutProps {
  themeMode: "light" | "dark";
  toggleTheme: () => void;
  habitsCount: number;
  funFact: string;
}

export function Layout({
  themeMode,
  toggleTheme,
  habitsCount,
  funFact,
}: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <FullScreenContainer>
      <MobileHeader>
        <MobileHeaderLeft>
          <HamburgerButton
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} aria-hidden />
          </HamburgerButton>
          <BrandMark aria-hidden="true" />
          <BrandText>
            <BrandTitle>HabitGrid</BrandTitle>
          </BrandText>
        </MobileHeaderLeft>
      </MobileHeader>
      <SidebarOverlay
        $isOpen={isSidebarOpen}
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
      />
      <Sidebar
        habitsCount={habitsCount}
        funFact={funFact}
        themeMode={themeMode}
        onToggleTheme={toggleTheme}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <ContentArea>
        <Outlet />
      </ContentArea>
      <BottomTabBar aria-label="Mobile navigation">
        <StyledBottomTabLink to="/" end>
          <CalendarCheck size={18} aria-hidden />
          <span>Today</span>
        </StyledBottomTabLink>
        <StyledBottomTabLink to="/habits">
          <LayoutGrid size={18} aria-hidden />
          <span>Habits</span>
        </StyledBottomTabLink>
        <StyledBottomTabLink to="/analytics">
          <BarChart2 size={18} aria-hidden />
          <span>Analytics</span>
        </StyledBottomTabLink>
      </BottomTabBar>
    </FullScreenContainer>
  );
}
