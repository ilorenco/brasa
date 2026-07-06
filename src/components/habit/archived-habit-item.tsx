import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { HabitAnchor } from '@/components/habit/habit-anchor';
import { capitalizeFirst } from '@/lib/capitalize-first';
import { countConstancyDays } from '@/lib/constancy';
import type { Habit } from '@/types/habit';

type ArchivedHabitItemProps = {
    habit: Habit;
    onRestore: () => void;
};

export function ArchivedHabitItem({ habit, onRestore }: ArchivedHabitItemProps) {
    const { name, anchor, heatHistory } = habit;
    const constancyDays = countConstancyDays(heatHistory);

    return (
        <View className="mb-2.5 rounded-2xl border border-line bg-card p-3.5">
            <View className="flex-row items-baseline justify-between gap-3">
                <Text className="flex-1 font-body-semibold text-[14.5px] text-ink-soft">
                    {capitalizeFirst(name)}
                </Text>
                <Text className="font-mono-bold text-[11px] text-slate">
                    {constancyDays} {constancyDays === 1 ? 'dia guardado' : 'dias guardados'}
                </Text>
            </View>
            <HabitAnchor anchor={anchor} />
            <Pressable
                onPress={onRestore}
                className="mt-3 flex-row items-center gap-1.5 self-start rounded-lg border-[1.5px] border-line bg-card px-3 py-2 active:opacity-70"
                accessibilityRole="button"
                accessibilityLabel={`Restaurar ${name}`}
            >
                <Ionicons name="arrow-undo" size={13} className="text-ink-soft" />
                <Text className="font-body-medium text-[13px] text-ink">Restaurar</Text>
            </Pressable>
        </View>
    );
}
