import { Ionicons } from '@expo/vector-icons';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { ConstancyGrid } from '@/components/habit/constancy-grid';
import { HabitAnchor } from '@/components/habit/habit-anchor';
import { HeatLegend } from '@/components/habit/heat-legend';
import { BackLink } from '@/components/ui/back-link';
import { NoteCard } from '@/components/ui/note-card';
import { Screen } from '@/components/ui/screen';
import { StatCard } from '@/components/ui/stat-card';
import { ADHERENCE_WINDOW_DAYS, CONSTANCY_WEEKS } from '@/constants/constancy';
import { useHabits } from '@/contexts/habits-context';
import { adherencePercent, countConstancyDays } from '@/lib/constancy';

export default function HabitDetailScreen() {
    const router = useRouter();
    const { habitId } = useLocalSearchParams<{ habitId: string }>();
    const { habits } = useHabits();
    const habit = habits.find((candidate) => candidate.id === habitId);

    if (!habit) return <Redirect href="/habits" />;

    const constancyDays = countConstancyDays(habit.heatHistory);
    const recentAdherence = adherencePercent(habit.heatHistory, ADHERENCE_WINDOW_DAYS);

    function handleEditPress() {
        router.push(`/habit/${habitId}/edit`);
    }

    return (
        <Screen>
            <BackLink label="Hábito" />
            <View className="flex-row items-center justify-between gap-3">
                <Text className="flex-1 font-display text-[21px] tracking-[-0.01em] text-ink">
                    {habit.name}
                </Text>
                <Pressable
                    onPress={handleEditPress}
                    className="h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-slate-soft active:opacity-80"
                    accessibilityRole="button"
                    accessibilityLabel="Editar hábito"
                >
                    <Ionicons name="pencil" size={15} className="text-slate" />
                </Pressable>
            </View>
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
