import { Text, View } from 'react-native';

import { HabitCard } from '@/components/habit-card';
import { Screen } from '@/components/screen';
import { useHabits } from '@/contexts/habits-context';
import { useNow } from '@/hooks/use-now';
import { isHabitDoneToday } from '@/lib/constancy';
import { formatDateLabel, getGreeting } from '@/lib/date-labels';

export default function TodayScreen() {
    const { habits, toggleHabitDone } = useHabits();
    const now = useNow();
    const activeHabits = habits.filter((habit) => !habit.isArchived);
    const doneCount = activeHabits.filter((habit) => isHabitDoneToday(habit.heatHistory)).length;

    return (
        <Screen>
            <View className="mb-4">
                <Text className="font-mono text-[11px] uppercase tracking-[1px] text-muted">
                    {formatDateLabel(now)}
                </Text>
                <Text className="mt-0.5 font-display text-2xl text-ink">
                    {getGreeting(now.getHours())}
                </Text>
                <Text className="mt-1 font-body text-[13px] text-ink-soft">
                    <Text className="font-body-semibold text-warm-deep">
                        {doneCount} de {activeHabits.length}
                    </Text>
                    {' hoje · sem pressa'}
                </Text>
            </View>
            {activeHabits.map((habit) => (
                <HabitCard
                    key={habit.id}
                    habit={habit}
                    onToggle={() => toggleHabitDone(habit.id)}
                />
            ))}
        </Screen>
    );
}
