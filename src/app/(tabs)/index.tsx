import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HabitCard } from '@/components/habit-card';
import { mockHabits } from '@/data/mock-habits';
import { useNow } from '@/hooks/use-now';
import { formatDateLabel, getGreeting } from '@/lib/date-labels';

export default function TodayScreen() {
    const [habits, setHabits] = useState(mockHabits);
    const now = useNow();
    const doneCount = habits.filter((habit) => habit.isDoneToday).length;

    function handleHabitToggle(habitId: string) {
        setHabits((currentHabits) =>
            currentHabits.map((habit) =>
                habit.id === habitId ? { ...habit, isDoneToday: !habit.isDoneToday } : habit
            )
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-screen" edges={['top']}>
            <ScrollView className="flex-1 px-5" contentContainerClassName="pb-6 pt-4">
                <View className="mb-4">
                    <Text className="font-mono text-[11px] uppercase tracking-[1px] text-muted">
                        {formatDateLabel(now)}
                    </Text>
                    <Text className="mt-0.5 font-display text-2xl text-ink">
                        {getGreeting(now.getHours())}
                    </Text>
                    <Text className="mt-1 font-body text-[13px] text-ink-soft">
                        <Text className="font-body-semibold text-warm-deep">
                            {doneCount} de {habits.length}
                        </Text>
                        {' hoje · sem pressa'}
                    </Text>
                </View>
                {habits.map((habit) => (
                    <HabitCard
                        key={habit.id}
                        habit={habit}
                        onToggle={() => handleHabitToggle(habit.id)}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
