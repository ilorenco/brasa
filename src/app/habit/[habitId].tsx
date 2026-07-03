import { Ionicons } from '@expo/vector-icons';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { ConstancyGrid } from '@/components/constancy-grid';
import { ForgivenessNote } from '@/components/forgiveness-note';
import { HabitAnchor } from '@/components/habit-anchor';
import { HabitStat } from '@/components/habit-stat';
import { HeatLegend } from '@/components/heat-legend';
import { Screen } from '@/components/screen';
import { useHabits } from '@/contexts/habits-context';
import { adherencePercent, CONSTANCY_WEEKS, countConstancyDays } from '@/lib/constancy';

const ADHERENCE_WINDOW_DAYS = 28;

export default function HabitDetailScreen() {
    const router = useRouter();
    const { habitId } = useLocalSearchParams<{ habitId: string }>();
    const { habits } = useHabits();
    const habit = habits.find((candidate) => candidate.id === habitId);

    if (!habit) return <Redirect href="/habits" />;

    const constancyDays = countConstancyDays(habit.heatHistory);
    const recentAdherence = adherencePercent(habit.heatHistory, ADHERENCE_WINDOW_DAYS);

    function handleBackPress() {
        router.back();
    }

    return (
        <Screen>
            <Pressable
                onPress={handleBackPress}
                className="mb-2.5 flex-row items-center gap-1 self-start active:opacity-70"
                accessibilityRole="button"
                accessibilityLabel="Voltar"
            >
                <Ionicons name="arrow-back" size={13} className="text-slate" />
                <Text className="font-mono-medium text-[10.5px] uppercase tracking-[0.12em] text-slate">
                    Hábito
                </Text>
            </Pressable>
            <Text className="font-display text-[21px] tracking-[-0.01em] text-ink">
                {habit.name}
            </Text>
            <HabitAnchor anchor={habit.anchor} />
            <View className="mt-4 flex-row gap-2.5">
                <HabitStat value={String(constancyDays)} label="dias mantidos" tone="warm" />
                <HabitStat value={`${recentAdherence}%`} label="últimas 4 sem" />
            </View>
            <Text className="mb-2.5 mt-[18px] font-mono-medium text-[10.5px] uppercase tracking-[0.08em] text-slate">
                Constância · {CONSTANCY_WEEKS} semanas
            </Text>
            <ConstancyGrid heatLevels={habit.heatHistory} />
            <View className="mt-3">
                <HeatLegend />
            </View>
            <View className="mt-3.5">
                <ForgivenessNote />
            </View>
        </Screen>
    );
}
