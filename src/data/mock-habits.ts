export type Habit = {
    id: string;
    name: string;
    anchor: string;
    isDoneToday: boolean;
};

export const mockHabits: Habit[] = [
    { id: '1', name: 'Ler 1 página', anchor: 'depois de tomar meu café', isDoneToday: true },
    { id: '2', name: "Beber um copo d'água", anchor: 'depois de acordar', isDoneToday: true },
    { id: '3', name: 'Alongar 2 minutos', anchor: 'depois de acordar', isDoneToday: false },
    { id: '4', name: 'Escrever 1 frase', anchor: 'depois do jantar', isDoneToday: false },
];
