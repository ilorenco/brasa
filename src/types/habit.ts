export type HeatLevel = 0 | 1 | 2 | 3 | 4;

// isDoneToday e constancyDays não são campos: derivam de heatHistory via
// isHabitDoneToday/countConstancyDays (src/lib/constancy.ts) — uma única
// fonte de verdade, sem risco de drift entre check-in e grade.
export type Habit = {
    id: string;
    name: string;
    anchor: string;
    obstaclePlan?: string;
    isArchived: boolean;
    heatHistory: HeatLevel[];
};
