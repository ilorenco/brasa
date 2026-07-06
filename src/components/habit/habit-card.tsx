import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { HabitAnchor } from '@/components/habit/habit-anchor';
import { capitalizeFirst } from '@/lib/capitalize-first';
import { isHabitDoneToday } from '@/lib/constancy';
import type { Habit } from '@/types/habit';

type HabitCardProps = {
    habit: Habit;
    onToggle: () => void;
};

export function HabitCard({ habit, onToggle }: HabitCardProps) {
    const { name, anchor } = habit;
    const isDoneToday = isHabitDoneToday(habit.heatHistory);

    return (
        <Pressable
            onPress={onToggle}
            className={`mb-2.5 flex-row items-center gap-3.5 rounded-2xl border p-3.5 active:opacity-80 ${
                isDoneToday ? 'border-warm-1 bg-warm-surface' : 'border-line bg-card'
            }`}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: isDoneToday }}
            accessibilityLabel={name}
        >
            <View
                className={`h-[42px] w-[42px] items-center justify-center rounded-full border-2 ${
                    isDoneToday ? 'border-warm-3 bg-warm-3' : 'border-line bg-card'
                }`}
            >
                {isDoneToday && <Ionicons name="checkmark" size={20} className="text-card" />}
            </View>
            <View className="flex-1">
                <Text
                    className={`font-body-semibold text-[14.5px] ${
                        isDoneToday ? 'text-ink-soft' : 'text-ink'
                    }`}
                >
                    {capitalizeFirst(name)}
                </Text>
                {isDoneToday ? (
                    <View className="mt-0.5 flex-row items-center gap-1">
                        <Ionicons name="sparkles" size={10} className="text-warm-deep" />
                        <Text className="font-mono-bold text-[10.5px] text-warm-deep">
                            +1 de constância
                        </Text>
                    </View>
                ) : (
                    <HabitAnchor anchor={anchor} />
                )}
            </View>
        </Pressable>
    );
}
