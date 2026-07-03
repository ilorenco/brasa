import { randomUUID } from 'expo-crypto';
import { createContext, type ReactNode, use, useCallback, useMemo, useState } from 'react';

import { CONSTANCY_GRID_DAYS, toggleTodayHeat } from '@/lib/constancy';
import { mockHabits } from '@/mocks/mock-habits';
import type { Habit, HeatLevel } from '@/types/habit';

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

    const toggleHabitDone = useCallback((habitId: string) => {
        setHabits((currentHabits) =>
            currentHabits.map((habit) =>
                habit.id === habitId
                    ? { ...habit, heatHistory: toggleTodayHeat(habit.heatHistory) }
                    : habit
            )
        );
    }, []);

    const createHabit = useCallback((newHabit: NewHabit) => {
        const coldHistory: HeatLevel[] = Array(CONSTANCY_GRID_DAYS).fill(0);
        const createdHabit: Habit = {
            id: randomUUID(),
            ...newHabit,
            isArchived: false,
            heatHistory: coldHistory,
        };
        setHabits((currentHabits) => [...currentHabits, createdHabit]);
    }, []);

    const habitsContextValue = useMemo(
        () => ({ habits, toggleHabitDone, createHabit }),
        [habits, toggleHabitDone, createHabit]
    );

    return <HabitsContext.Provider value={habitsContextValue}>{children}</HabitsContext.Provider>;
}

export function useHabits() {
    const habitsContext = use(HabitsContext);
    if (!habitsContext) throw new Error('useHabits must be used within HabitsProvider');
    return habitsContext;
}
