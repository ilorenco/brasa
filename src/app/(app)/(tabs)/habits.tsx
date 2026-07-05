import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { HabitListItem } from '@/components/habit/habit-list-item';
import { EmptyState } from '@/components/ui/empty-state';
import { Screen } from '@/components/ui/screen';
import { useHabits } from '@/contexts/habits-context';

export default function HabitsScreen() {
    const router = useRouter();
    const { habits } = useHabits();
    const activeHabits = habits.filter((habit) => !habit.isArchived);
    const archivedCount = habits.length - activeHabits.length;

    function handleAddPress() {
        router.push('/create-habit');
    }

    function handleArchivedPress() {
        router.push('/archived-habits');
    }

    return (
        <Screen>
            <View className="flex-row items-center justify-between">
                <Text className="font-display text-[26px] text-ink">Hábitos</Text>
                <Pressable
                    onPress={handleAddPress}
                    className="h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-warm-3 active:opacity-80"
                    accessibilityRole="button"
                    accessibilityLabel="Criar hábito"
                >
                    <Ionicons name="add" size={22} className="text-ink" />
                </Pressable>
            </View>
            {activeHabits.length === 0 ? (
                <EmptyState
                    icon="leaf-outline"
                    title="Nenhum hábito ativo"
                    description="Comece com um gesto minúsculo — uma página, um copo d'água. Toque em + para criar o primeiro."
                />
            ) : (
                <>
                    <Text className="mb-4 mt-1 font-body text-[12.5px] text-muted">
                        {activeHabits.length} {activeHabits.length === 1 ? 'ativo' : 'ativos'}
                    </Text>
                    {activeHabits.map((habit) => (
                        <HabitListItem key={habit.id} habit={habit} />
                    ))}
                </>
            )}
            {archivedCount > 0 && (
                <Pressable
                    onPress={handleArchivedPress}
                    className="mt-4 flex-row items-center gap-1.5 self-center rounded-full border border-line bg-card px-3.5 py-2 active:opacity-70"
                    accessibilityRole="button"
                    accessibilityLabel="Ver arquivados"
                >
                    <Ionicons name="archive-outline" size={13} className="text-slate" />
                    <Text className="font-mono-medium text-[11px] text-slate">
                        Ver arquivados ({archivedCount})
                    </Text>
                </Pressable>
            )}
        </Screen>
    );
}
