import { seededHeatHistory } from '@/mocks/seeded-heat-history';
import type { Habit } from '@/types/habit';

export const mockHabits: Habit[] = [
    {
        id: '1',
        name: 'Ler 1 página',
        anchor: 'tomar meu café',
        obstaclePlan: 'se não der depois do café, leio antes de dormir',
        isArchived: false,
        heatHistory: seededHeatHistory({ seed: 7, activeDays: 119, isDoneToday: true }),
    },
    {
        id: '2',
        name: "Beber um copo d'água",
        anchor: 'acordar',
        isArchived: false,
        heatHistory: seededHeatHistory({ seed: 21, activeDays: 58, isDoneToday: true }),
    },
    {
        id: '3',
        name: 'Alongar 2 minutos',
        anchor: 'acordar',
        isArchived: false,
        heatHistory: seededHeatHistory({ seed: 33, activeDays: 49, isDoneToday: false }),
    },
    {
        id: '4',
        name: 'Escrever 1 frase',
        anchor: 'jantar',
        isArchived: false,
        heatHistory: seededHeatHistory({ seed: 48, activeDays: 21, isDoneToday: false }),
    },
    {
        id: '5',
        name: 'Meditar 5 minutos',
        anchor: 'almoçar',
        isArchived: true,
        heatHistory: seededHeatHistory({ seed: 55, activeDays: 23, isDoneToday: false }),
    },
    {
        id: '6',
        name: 'Anotar 3 gratidões',
        anchor: 'escovar os dentes à noite',
        isArchived: true,
        heatHistory: seededHeatHistory({ seed: 61, activeDays: 9, isDoneToday: false }),
    },
];
