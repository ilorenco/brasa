import type { HeatLevel } from '@/types/habit';

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

// Agrega os dias crus (feitos / janela) em vez de tirar média dos
// percentuais já arredondados — evita erro de arredondamento duplo.
export function overallAdherencePercent(heatHistories: HeatLevel[][], lastDays: number): number {
    const windowsLevels = heatHistories.map((heatHistory) => heatHistory.slice(-lastDays));
    const totalDays = windowsLevels.reduce((sum, windowLevels) => sum + windowLevels.length, 0);
    if (totalDays === 0) return 0;
    const doneDays = windowsLevels.reduce(
        (sum, windowLevels) => sum + windowLevels.filter((level) => level > 0).length,
        0
    );
    return Math.round((doneDays / totalDays) * 100);
}

export function bestConstancyDays(heatHistories: HeatLevel[][]): number {
    return heatHistories.reduce(
        (best, heatHistory) => Math.max(best, countConstancyDays(heatHistory)),
        0
    );
}
