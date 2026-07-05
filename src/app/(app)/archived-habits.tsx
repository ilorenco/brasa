import { Text } from 'react-native';

import { ArchivedHabitItem } from '@/components/habit/archived-habit-item';
import { BackLink } from '@/components/ui/back-link';
import { EmptyState } from '@/components/ui/empty-state';
import { Screen } from '@/components/ui/screen';
import { useHabits } from '@/contexts/habits-context';

export default function ArchivedHabitsScreen() {
    const { habits, unarchiveHabit } = useHabits();
    const archivedHabits = habits.filter((habit) => habit.isArchived);

    return (
        <Screen>
            <BackLink label="Hábitos" />
            <Text className="font-display text-[23px] tracking-[-0.01em] text-ink">Arquivados</Text>
            {archivedHabits.length === 0 ? (
                <EmptyState
                    icon="archive-outline"
                    title="Nada arquivado"
                    description="Hábitos que você pausar esperam aqui — com toda a constância intacta."
                />
            ) : (
                <>
                    <Text className="mb-5 mt-1 font-body text-[13px] text-ink-soft">
                        Hábitos em pausa. A constância que você construiu continua guardada —
                        restaure quando quiser.
                    </Text>
                    {archivedHabits.map((habit) => (
                        <ArchivedHabitItem
                            key={habit.id}
                            habit={habit}
                            onRestore={() => unarchiveHabit(habit.id)}
                        />
                    ))}
                </>
            )}
        </Screen>
    );
}
