import { useMemo } from "react";
import moment from "moment";
import styled from "styled-components";
import { type Habit } from "../types";
import {
  Card,
  CardHeader,
  CardMeta,
  CardTitle,
  HabitDot,
  StatDelta,
  StatValue,
} from "../components/ui";
import { TrendingUp, Calendar, Activity } from "lucide-react";

const AnalyticsWrapper = styled.div`
  padding: 20px 10px 40px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 480px) {
    padding: 14px 8px 40px;
  }

  @media (min-width: 901px) {
    padding: 32px 10px 40px;
  }
`;

const AnalyticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
  gap: 12px;
  margin-bottom: 20px;

  @media (min-width: 601px) {
    gap: 16px;
    margin-bottom: 24px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 24px 0 12px;
  display: flex;
  align-items: center;
  gap: 8px;

  @media (min-width: 601px) {
    font-size: 18px;
    margin: 32px 0 16px;
  }
`;

const HeatmapContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
  margin-top: 10px;

  @media (min-width: 601px) {
    gap: 4px;
    margin-top: 12px;
  }
`;

const HeatmapDay = styled.div<{ intensity: number }>`
  width: 10px;
  height: 10px;
  border-radius: 2px;

  @media (min-width: 601px) {
    width: 12px;
    height: 12px;
  }
  background-color: ${({ intensity, theme }) => {
    if (intensity === 0) return "rgba(255,255,255,0.05)";
    if (intensity === 1) return theme.accentSoft;
    if (intensity === 2) return theme.accent;
    return theme.success;
  }};
  opacity: ${({ intensity }) => (intensity === 0 ? 0.3 : 1)};
`;

type AnalyticsViewProps = {
  habits: Habit[];
  today: string;
};

export function AnalyticsView({ habits, today }: AnalyticsViewProps) {
  const stats = useMemo(() => {
    const now = moment(today, "YYYY-MM-DD");
    let totalPossible = 0;
    let totalCompleted = 0;
    const last30Days: string[] = [];

    for (let i = 0; i < 30; i++) {
      const d = now.clone().subtract(i, "days");
      last30Days.push(d.format("YYYY-MM-DD"));
    }

    habits.forEach((h) => {
      totalPossible += 30;
      h.completions.forEach((c) => {
        if (last30Days.includes(c)) totalCompleted++;
      });
    });

    const completionRate = totalPossible
      ? Math.round((totalCompleted / totalPossible) * 100)
      : 0;

    const totalCheckins = habits.reduce(
      (acc, h) => acc + h.completions.length,
      0
    );

    const heatmap: { date: string; count: number }[] = [];
    for (let i = 89; i >= 0; i--) {
      const d = now.clone().subtract(i, "days");
      const iso = d.format("YYYY-MM-DD");
      let count = 0;
      habits.forEach((h) => {
        if (h.completions.includes(iso)) count++;
      });
      heatmap.push({ date: iso, count });
    }

    return { completionRate, totalCheckins, heatmap };
  }, [habits, today]);

  return (
    <AnalyticsWrapper>
      <CardHeader>
        <div>
          <CardTitle style={{ fontSize: "clamp(20px, 5vw, 24px)" }}>
            Insights
          </CardTitle>
          <CardMeta>Your progress and consistency at a glance</CardMeta>
        </div>
      </CardHeader>

      <AnalyticsGrid>
        <Card>
          <CardHeader>
            <CardTitle
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <Activity size={18} color="#0A84FF" />
              Completion Rate
            </CardTitle>
          </CardHeader>
          <StatValue>{stats.completionRate}%</StatValue>
          <StatDelta>Last 30 days</StatDelta>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <Calendar size={18} color="#30D158" />
              Total Check-ins
            </CardTitle>
          </CardHeader>
          <StatValue>{stats.totalCheckins}</StatValue>
          <StatDelta>Lifetime habits completed</StatDelta>
        </Card>
      </AnalyticsGrid>

      <SectionTitle>
        <TrendingUp size={20} />
        Activity Heatmap
      </SectionTitle>
      <Card>
        <CardMeta>
          <span style={{ fontSize: 13 }}>
            Combined activity across all habits (Last 90 days)
          </span>
        </CardMeta>
        <HeatmapContainer>
          {stats.heatmap.map((day) => {
            let intensity = 0;
            if (day.count > 0) intensity = 1;
            if (day.count >= 2) intensity = 2;
            if (day.count >= 4) intensity = 3;

            return (
              <HeatmapDay
                key={day.date}
                intensity={intensity}
                title={`${day.date}: ${day.count}`}
              />
            );
          })}
        </HeatmapContainer>
      </Card>

      <SectionTitle>Top Habits</SectionTitle>
      <AnalyticsGrid>
        {habits.slice(0, 6).map((h) => (
          <Card key={h.id}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  overflow: "hidden",
                }}
              >
                <HabitDot color={h.color} />
                <span
                  style={{
                    fontWeight: 500,
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                  title={h.name}
                >
                  {h.name}
                </span>
              </div>
              <span
                style={{ fontSize: 13, color: "#A1A1AA", whiteSpace: "nowrap" }}
              >
                {h.completions.length} done
              </span>
            </div>
          </Card>
        ))}
      </AnalyticsGrid>
    </AnalyticsWrapper>
  );
}
