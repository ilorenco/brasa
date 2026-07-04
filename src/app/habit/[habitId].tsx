import { Redirect, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import { BackLink } from '@/components/back-link';
import { ConstancyGrid } from '@/components/constancy-grid';
import { HabitAnchor } from '@/components/habit-anchor';
import { HeatLegend } from '@/components/heat-legend';
import { NoteCard } from '@/components/note-card';
import { Screen } from '@/components/screen';
import { StatCard } from '@/components/stat-card';
import { useHabits } from '@/contexts/habits-context';
import {
    ADHERENCE_WINDOW_DAYS,
    adherencePercent,
    CONSTANCY_WEEKS,
    countConstancyDays,
} from '@/lib/constancy';

export default function HabitDetailScreen() {
    const { habitId } = useLocalSearchParams<{ habitId: string }>();
    const { habits } = useHabits();
    const habit = habits.find((candidate) => candidate.id === habitId);

    if (!habit) return <Redirect href="/habits" />;

    const constancyDays = countConstancyDays(habit.heatHistory);
    const recentAdherence = adherencePercent(habit.heatHistory, ADHERENCE_WINDOW_DAYS);

    return (
        <Screen>
            <BackLink label="Hábito" />
            <Text className="font-display text-[21px] tracking-[-0.01em] text-ink">
                {habit.name}
            </Text>
            <HabitAnchor anchor={habit.anchor} />
            <View className="mt-4 flex-row gap-2.5">
                <StatCard value={String(constancyDays)} label="dias mantidos" tone="warm" />
                <StatCard value={`${recentAdherence}%`} label="últimas 4 sem" />
            </View>
            <Text className="mb-2.5 mt-[18px] font-mono-medium text-[10.5px] uppercase tracking-[0.08em] text-slate">
                Constância · {CONSTANCY_WEEKS} semanas
            </Text>
            <ConstancyGrid heatLevels={habit.heatHistory} />
            <View className="mt-3">
                <HeatLegend />
            </View>
            <View className="mt-3.5">
                <NoteCard icon="heart">
                    Faltou ontem? <Text className="font-body-semibold">Tudo bem.</Text> A grade
                    mostra o quanto você já construiu — uma falha não apaga isso.
                </NoteCard>
            </View>
        </Screen>
    );
}
