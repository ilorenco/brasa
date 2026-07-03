export type HeatLevel = 0 | 1 | 2 | 3 | 4;

export type Habit = {
    id: string;
    name: string;
    anchor: string;
    obstaclePlan?: string;
    isDoneToday: boolean;
    isArchived: boolean;
    constancyDays: number;
    recentHeat: HeatLevel[];
};

export const mockHabits: Habit[] = [
    {
        id: '1',
        name: 'Ler 1 página',
        anchor: 'tomar meu café',
        obstaclePlan: 'se não der depois do café, leio antes de dormir',
        isDoneToday: true,
        isArchived: false,
        constancyDays: 63,
        recentHeat: [2, 3, 3, 0, 3, 4, 3, 4, 4, 3, 4, 4, 3, 4],
    },
    {
        id: '2',
        name: "Beber um copo d'água",
        anchor: 'acordar',
        isDoneToday: true,
        isArchived: false,
        constancyDays: 34,
        recentHeat: [3, 3, 4, 3, 0, 3, 4, 4, 3, 4, 0, 3, 4, 4],
    },
    {
        id: '3',
        name: 'Alongar 2 minutos',
        anchor: 'acordar',
        isDoneToday: false,
        isArchived: false,
        constancyDays: 21,
        recentHeat: [0, 1, 2, 2, 0, 2, 3, 2, 3, 3, 0, 3, 3, 4],
    },
    {
        id: '4',
        name: 'Escrever 1 frase',
        anchor: 'jantar',
        isDoneToday: false,
        isArchived: false,
        constancyDays: 9,
        recentHeat: [0, 0, 1, 0, 1, 2, 1, 0, 2, 2, 1, 2, 3, 2],
    },
    {
        id: '5',
        name: 'Meditar 5 minutos',
        anchor: 'almoçar',
        isDoneToday: false,
        isArchived: true,
        constancyDays: 12,
        recentHeat: [1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    },
    {
        id: '6',
        name: 'Anotar 3 gratidões',
        anchor: 'escovar os dentes à noite',
        isDoneToday: false,
        isArchived: true,
        constancyDays: 5,
        recentHeat: [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
];
