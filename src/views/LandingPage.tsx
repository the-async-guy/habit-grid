import { useMemo } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import moment from "moment";
import { type Habit } from "../types";
import { HabitCalendarGrid } from "../components/HabitCalendarGrid";

// Sample data: habits with realistic completion patterns for current month
function getSampleHabits(): Habit[] {
  const today = moment();
  const startOfMonth = moment(today).startOf("month");

  // Helper: mark ~p% of past days as completed (deterministic, looks natural)
  const completionsFor = (p: number, skipWeekends = false): string[] => {
    const out: string[] = [];
    const d = startOfMonth.clone();
    while (d.isSameOrBefore(today, "day")) {
      if (skipWeekends && (d.day() === 0 || d.day() === 6)) {
        d.add(1, "day");
        continue;
      }
      const dateStr = d.format("YYYY-MM-DD");
      const hash = dateStr.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
      if ((hash % 100) / 100 < p) out.push(dateStr);
      d.add(1, "day");
    }
    return out;
  };

  return [
    {
      id: "landing-1",
      name: "Morning run",
      color: "#2ECC71",
      icon: "🏃",
      frequency: "daily",
      createdAt: moment(today).subtract(2, "months").format("YYYY-MM-DD"),
      completions: completionsFor(85),
      order: 0,
      time: "07:00",
    },
    {
      id: "landing-2",
      name: "Read 20 min",
      color: "#1ABCFF",
      icon: "📖",
      frequency: "daily",
      createdAt: moment(today).subtract(1, "month").format("YYYY-MM-DD"),
      completions: completionsFor(92),
      order: 1,
      time: "21:00",
    },
    {
      id: "landing-3",
      name: "Meditate",
      color: "#A66CFF",
      icon: "🧘",
      frequency: "daily",
      createdAt: moment(today).subtract(3, "months").format("YYYY-MM-DD"),
      completions: completionsFor(70),
      order: 2,
      time: "08:00",
    },
    {
      id: "landing-4",
      name: "No phone before 9",
      color: "#FF9F1C",
      icon: "📵",
      frequency: "daily",
      createdAt: moment(today).subtract(1, "month").format("YYYY-MM-DD"),
      completions: completionsFor(78, true),
      order: 3,
      time: "09:00",
    },
  ];
}

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrapper = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 24px 40px;
  background: ${({ theme }) => theme.background};
  overflow-y: auto;
`;

const Hero = styled.section`
  text-align: center;
  margin-bottom: 40px;
  animation: ${fadeUp} 0.6s ease-out;
`;

const Title = styled.h1`
  font-size: clamp(32px, 8vw, 52px);
  font-weight: 700;
  letter-spacing: -0.04em;
  color: ${({ theme }) => theme.textPrimary};
  margin: 0 0 12px;
  line-height: 1.1;
`;

const Tagline = styled.p`
  font-size: 17px;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0 auto 8px;
  max-width: 380px;
  line-height: 1.45;
`;

const Sub = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.textSecondary};
  opacity: 0.85;
  margin: 0;
`;

const PreviewSection = styled.section`
  width: 100%;
  max-width: 720px;
  margin-bottom: 40px;
`;

const PreviewLabel = styled.p`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.accent};
  margin: 0 0 16px;
  text-align: center;
`;

const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (min-width: 520px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
  }
`;

const PreviewCard = styled.div<{ $delay: number }>`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  border-radius: 14px;
  padding: 12px;
  animation: ${fadeUp} 0.5s ease-out ${({ $delay }) => $delay}s both;

  @media (min-width: 520px) {
    padding: 14px;
  }
`;

const PreviewCardTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.textPrimary};

  @media (min-width: 520px) {
    font-size: 13px;
    margin-bottom: 12px;
  }
`;

const CtaWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  animation: ${fadeUp} 0.6s ease-out 0.4s both;
`;

const ClientSideNote = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
  opacity: 0.9;
`;

const Cta = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background: ${({ theme }) => theme.accent};
  border-radius: 14px;
  text-decoration: none;
  transition: opacity 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 20px ${({ theme }) => theme.accentSoft};

  &:hover {
    opacity: 0.95;
    transform: translateY(-2px);
    box-shadow: 0 8px 28px ${({ theme }) => theme.accentSoft};
  }
`;

export function LandingPage() {
  const sampleHabits = useMemo(() => getSampleHabits(), []);
  const today = moment().format("YYYY-MM-DD");
  const currentDate = new Date();

  return (
    <Wrapper>
      <Hero className="mt-auto">
        <Title>Your habits, at a glance.</Title>
        <Tagline>
          See every streak and miss in one grid. No clutter—just consistency.
        </Tagline>
        <Sub>Track habits and todos. One tap at a time.</Sub>
      </Hero>

      <PreviewSection>
        <PreviewLabel>See it in action</PreviewLabel>
        <PreviewGrid>
          {sampleHabits.map((habit, i) => (
            <PreviewCard key={habit.id} $delay={0.08 * (i + 1)}>
              <PreviewCardTitle>
                {habit.icon && <span>{habit.icon}</span>}
                <span>{habit.name}</span>
              </PreviewCardTitle>
              <HabitCalendarGrid
                habit={habit}
                today={today}
                currentDate={currentDate}
              />
            </PreviewCard>
          ))}
        </PreviewGrid>
      </PreviewSection>

      <CtaWrap className="mb-auto">
        <Cta to="/app">Open HabitGrid →</Cta>
        <ClientSideNote>
          Completely client-side. Your data never leaves your device.
        </ClientSideNote>
      </CtaWrap>
    </Wrapper>
  );
}
