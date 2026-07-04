import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { HabitCard } from '@/components/habit/habit-card';
import { EmptyState } from '@/components/ui/empty-state';
import { PrimaryButton } from '@/components/ui/primary-button';
import { Screen } from '@/components/ui/screen';
import { useHabits } from '@/contexts/habits-context';
import { useProfile } from '@/contexts/profile-context';
import { useNow } from '@/hooks/use-now';
import { isHabitDoneToday } from '@/lib/constancy';
import { formatDateLabel, getGreeting } from '@/lib/date-labels';
import { firstName } from '@/lib/first-name';

export default function TodayScreen() {
    const router = useRouter();
    const { habits, toggleHabitDone } = useHabits();
    const { profile } = useProfile();
    const now = useNow();
    const activeHabits = habits.filter((habit) => !habit.isArchived);
    const doneCount = activeHabits.filter((habit) => isHabitDoneToday(habit.heatHistory)).length;

    function handleCreatePress() {
        router.push('/create-habit');
    }

    return (
        <Screen>
            <View className="mb-4">
                <Text className="font-mono text-[11px] uppercase tracking-[1px] text-muted">
                    {formatDateLabel(now)}
                </Text>
                <Text className="mt-0.5 font-display text-2xl text-ink">
                    {getGreeting(now.getHours())}, {firstName(profile.name)}
                </Text>
                {activeHabits.length > 0 && (
                    <Text className="mt-1 font-body text-[13px] text-ink-soft">
                        <Text className="font-body-semibold text-warm-deep">
                            {doneCount} de {activeHabits.length}
                        </Text>
                        {' hoje · sem pressa'}
                    </Text>
                )}
            </View>
            {activeHabits.length === 0 ? (
                <EmptyState
                    icon="leaf-outline"
                    title="Seu campo está calmo"
                    description="Nenhum hábito para hoje ainda. Escolha um gesto minúsculo e deixe o calor se acumular."
                    action={
                        <PrimaryButton
                            label="Criar hábito"
                            onPress={handleCreatePress}
                            size="compact"
                        />
                    }
                />
            ) : (
                activeHabits.map((habit) => (
                    <HabitCard
                        key={habit.id}
                        habit={habit}
                        onToggle={() => toggleHabitDone(habit.id)}
                    />
                ))
            )}
        </Screen>
    );
}
