import type { HeatLevel } from '@/types/habit';

export const CONSTANCY_WEEKS = 17;
export const CONSTANCY_GRID_DAYS = CONSTANCY_WEEKS * 7;

// O calor de hoje acumula sobre o de ontem — modelo perdoador: nunca "zera",
// só esfria gradualmente; um retorno após falta já começa morno.
const warmedUpLevels: Record<HeatLevel, HeatLevel> = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 4 };

export function nextHeatLevel(previousDayLevel: HeatLevel): HeatLevel {
    return warmedUpLevels[previousDayLevel];
}

export function isHabitDoneToday(heatHistory: HeatLevel[]): boolean {
    return (heatHistory.at(-1) ?? 0) > 0;
}

export function countConstancyDays(heatHistory: HeatLevel[]): number {
    return heatHistory.filter((level) => level > 0).length;
}

export function toggleTodayHeat(heatHistory: HeatLevel[]): HeatLevel[] {
    const todayIndex = heatHistory.length - 1;
    const yesterdayLevel = heatHistory[todayIndex - 1] ?? 0;
    const todayLevel = isHabitDoneToday(heatHistory) ? 0 : nextHeatLevel(yesterdayLevel);
    return [...heatHistory.slice(0, todayIndex), todayLevel];
}

export function adherencePercent(heatHistory: HeatLevel[], lastDays: number): number {
    const windowLevels = heatHistory.slice(-lastDays);
    if (windowLevels.length === 0) return 0;
    const doneDaysCount = windowLevels.filter((level) => level > 0).length;
    return Math.round((doneDaysCount / windowLevels.length) * 100);
}
