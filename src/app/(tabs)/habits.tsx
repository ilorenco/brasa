import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HabitListItem } from '@/components/habit-list-item';
import { useHabits } from '@/contexts/habits-context';

export default function HabitsScreen() {
    const router = useRouter();
    const { habits } = useHabits();
    const activeHabits = habits.filter((habit) => !habit.isArchived);
    const archivedCount = habits.length - activeHabits.length;

    function handleAddPress() {
        router.push('/create-habit');
    }

    return (
        <SafeAreaView className="flex-1 bg-screen" edges={['top']}>
            <ScrollView className="flex-1 px-5" contentContainerClassName="pb-6 pt-4">
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
                <Text className="mb-4 mt-1 font-body text-[12.5px] text-muted">
                    {activeHabits.length} {activeHabits.length === 1 ? 'ativo' : 'ativos'}
                </Text>
                {activeHabits.map((habit) => (
                    <HabitListItem key={habit.id} habit={habit} />
                ))}
                <Text className="mt-1.5 text-center font-mono text-[11px] text-muted">
                    Ver arquivados ({archivedCount})
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}
