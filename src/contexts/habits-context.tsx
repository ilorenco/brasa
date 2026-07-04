import { randomUUID } from 'expo-crypto';
import { createContext, type ReactNode, use, useCallback, useMemo, useState } from 'react';

import { CONSTANCY_GRID_DAYS, toggleTodayHeat } from '@/lib/constancy';
import { mockHabits } from '@/mocks/mock-habits';
import type { Habit, HeatLevel } from '@/types/habit';

type HabitDraft = {
    name: string;
    anchor: string;
    obstaclePlan?: string;
};

type HabitsContextValue = {
    habits: Habit[];
    toggleHabitDone: (habitId: string) => void;
    createHabit: (habitDraft: HabitDraft) => void;
    updateHabit: (habitId: string, habitDraft: HabitDraft) => void;
    archiveHabit: (habitId: string) => void;
    deleteHabit: (habitId: string) => void;
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

    const createHabit = useCallback((habitDraft: HabitDraft) => {
        const coldHistory: HeatLevel[] = Array(CONSTANCY_GRID_DAYS).fill(0);
        const createdHabit: Habit = {
            id: randomUUID(),
            ...habitDraft,
            isArchived: false,
            heatHistory: coldHistory,
        };
        setHabits((currentHabits) => [...currentHabits, createdHabit]);
    }, []);

    const updateHabit = useCallback((habitId: string, habitDraft: HabitDraft) => {
        setHabits((currentHabits) =>
            currentHabits.map((habit) =>
                habit.id === habitId ? { ...habit, ...habitDraft } : habit
            )
        );
    }, []);

    const archiveHabit = useCallback((habitId: string) => {
        setHabits((currentHabits) =>
            currentHabits.map((habit) =>
                habit.id === habitId ? { ...habit, isArchived: true } : habit
            )
        );
    }, []);

    const deleteHabit = useCallback((habitId: string) => {
        setHabits((currentHabits) => currentHabits.filter((habit) => habit.id !== habitId));
    }, []);

    const habitsContextValue = useMemo(
        () => ({ habits, toggleHabitDone, createHabit, updateHabit, archiveHabit, deleteHabit }),
        [habits, toggleHabitDone, createHabit, updateHabit, archiveHabit, deleteHabit]
    );

    return <HabitsContext.Provider value={habitsContextValue}>{children}</HabitsContext.Provider>;
}

export function useHabits() {
    const habitsContext = use(HabitsContext);
    if (!habitsContext) throw new Error('useHabits must be used within HabitsProvider');
    return habitsContext;
}
