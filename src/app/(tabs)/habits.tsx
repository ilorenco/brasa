import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HabitListItem } from '@/components/habit-list-item';
import { mockHabits } from '@/data/mock-habits';

export default function HabitsScreen() {
    const activeHabits = mockHabits.filter((habit) => !habit.isArchived);
    const archivedCount = mockHabits.length - activeHabits.length;

    return (
        <SafeAreaView className="flex-1 bg-screen" edges={['top']}>
            <ScrollView className="flex-1 px-5" contentContainerClassName="pb-6 pt-4">
                <View className="flex-row items-center justify-between">
                    <Text className="font-display text-[26px] text-ink">Hábitos</Text>
                    <View className="h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-warm-3">
                        <Ionicons name="add" size={22} className="text-ink" />
                    </View>
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
