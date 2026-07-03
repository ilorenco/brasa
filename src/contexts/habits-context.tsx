import { randomUUID } from 'expo-crypto';
import { createContext, type ReactNode, use, useState } from 'react';

import { type Habit, type HeatLevel, mockHabits } from '@/data/mock-habits';

type NewHabit = {
    name: string;
    anchor: string;
    obstaclePlan?: string;
};

type HabitsContextValue = {
    habits: Habit[];
    toggleHabitDone: (habitId: string) => void;
    createHabit: (newHabit: NewHabit) => void;
};

const HabitsContext = createContext<HabitsContextValue | null>(null);

export function HabitsProvider({ children }: { children: ReactNode }) {
    const [habits, setHabits] = useState(mockHabits);

    function toggleHabitDone(habitId: string) {
        setHabits((currentHabits) =>
            currentHabits.map((habit) =>
                habit.id === habitId ? { ...habit, isDoneToday: !habit.isDoneToday } : habit
            )
        );
    }

    function createHabit(newHabit: NewHabit) {
        const coldStrip: HeatLevel[] = Array(14).fill(0);
        const createdHabit: Habit = {
            id: randomUUID(),
            ...newHabit,
            isDoneToday: false,
            isArchived: false,
            constancyDays: 0,
            recentHeat: coldStrip,
        };
        setHabits((currentHabits) => [...currentHabits, createdHabit]);
    }

    return (
        <HabitsContext.Provider value={{ habits, toggleHabitDone, createHabit }}>
            {children}
        </HabitsContext.Provider>
    );
}

export function useHabits() {
    const habitsContext = use(HabitsContext);
    if (!habitsContext) throw new Error('useHabits must be used within HabitsProvider');
    return habitsContext;
}
