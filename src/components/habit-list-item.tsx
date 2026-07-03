import { Text, View } from 'react-native';

import { ConstancyStrip } from '@/components/constancy-strip';
import { HabitAnchor } from '@/components/habit-anchor';
import { countConstancyDays } from '@/lib/constancy';
import type { Habit } from '@/types/habit';

const RECENT_HEAT_DAYS = 14;

type HabitListItemProps = {
    habit: Habit;
};

export function HabitListItem({ habit }: HabitListItemProps) {
    const { name, anchor, heatHistory } = habit;
    const constancyDays = countConstancyDays(heatHistory);
    const recentHeat = heatHistory.slice(-RECENT_HEAT_DAYS);

    return (
        <View className="mb-2.5 rounded-2xl border border-line bg-card p-3.5">
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
        </View>
    );
}
