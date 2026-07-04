import { CONSTANCY_GRID_DAYS } from '@/constants/constancy';
import { nextHeatLevel } from '@/lib/constancy';
import type { HeatLevel } from '@/types/habit';

type SeededHeatHistoryInput = {
    seed: number;
    activeDays: number;
    isDoneToday: boolean;
};

// PRNG de Park-Miller: o histórico precisa ser estável entre reloads.
function createSeededRandom(seed: number) {
    let state = seed;
    return () => {
        state = (state * 16807) % 2147483647;
        return (state - 1) / 2147483646;
    };
}

// Gera o padrão do esboço (tela 04): esparso no início, denso e mais quente no
// fim, com faltas preservadas — o modelo perdoador fica visível na grade.
export function seededHeatHistory({
    seed,
    activeDays,
    isDoneToday,
}: SeededHeatHistoryInput): HeatLevel[] {
    const random = createSeededRandom(seed);
    const firstActiveDay = CONSTANCY_GRID_DAYS - activeDays;

    const heatHistory = Array.from({ length: CONSTANCY_GRID_DAYS }, (_, dayIndex): HeatLevel => {
        if (dayIndex < firstActiveDay) return 0;
        const progress = (dayIndex - firstActiveDay) / activeDays;
        if (random() > 0.3 + progress * 0.55) return 0;
        const scaledLevel = Math.round(progress * 4 + (random() * 1.4 - 0.5));
        return Math.min(4, Math.max(1, scaledLevel)) as HeatLevel;
    });

    // A última célula é hoje: o check-in deriva dela, então o seed a define
    // pela mesma regra de acúmulo usada no toggle em runtime.
    const todayIndex = CONSTANCY_GRID_DAYS - 1;
    if (!isDoneToday) heatHistory[todayIndex] = 0;
    else if (heatHistory[todayIndex] === 0)
        heatHistory[todayIndex] = nextHeatLevel(heatHistory[todayIndex - 1]);

    return heatHistory;
}
