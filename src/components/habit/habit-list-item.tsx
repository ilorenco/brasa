import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { ConstancyStrip } from '@/components/habit/constancy-strip';
import { HabitAnchor } from '@/components/habit/habit-anchor';
import { RECENT_HEAT_DAYS } from '@/constants/constancy';
import { countConstancyDays } from '@/lib/constancy';
import type { Habit } from '@/types/habit';

type HabitListItemProps = {
    habit: Habit;
};

export function HabitListItem({ habit }: HabitListItemProps) {
    const router = useRouter();
    const { name, anchor, heatHistory } = habit;
    const constancyDays = countConstancyDays(heatHistory);
    const recentHeat = heatHistory.slice(-RECENT_HEAT_DAYS);

    function handleHabitPress() {
        router.push(`/habit/${habit.id}`);
    }

    return (
        <Pressable
            onPress={handleHabitPress}
            className="mb-2.5 rounded-2xl border border-line bg-card p-3.5 active:opacity-80"
            accessibilityRole="button"
            accessibilityLabel={name}
        >
            <View className="flex-row items-baseline justify-between">
                <Text className="font-body-semibold text-[14.5px] text-ink">{name}</Text>
                <Text className="font-mono-bold text-[11px] text-warm-deep">
                    {constancyDays} {constancyDays === 1 ? 'dia' : 'dias'}
                </Text>
            </View>
            <HabitAnchor anchor={anchor} />
            <View className="mt-2.5">
                <ConstancyStrip heatLevels={recentHeat} />
            </View>
        </Pressable>
    );
}
