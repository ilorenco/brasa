import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { ProfileHeader } from '@/components/profile/profile-header';
import { Screen } from '@/components/ui/screen';
import { SettingsSection } from '@/components/ui/settings-section';
import { StatCard } from '@/components/ui/stat-card';
import { ADHERENCE_WINDOW_DAYS } from '@/constants/constancy';
import { useHabits } from '@/contexts/habits-context';
import { useProfile } from '@/contexts/profile-context';
import { bestConstancyDays, overallAdherencePercent } from '@/lib/constancy';

export default function YouScreen() {
    const router = useRouter();
    const { habits } = useHabits();
    const { profile } = useProfile();

    const activeHabits = habits.filter((habit) => !habit.isArchived);
    const activeHeatHistories = activeHabits.map((habit) => habit.heatHistory);
    const bestConstancy = bestConstancyDays(activeHeatHistories);
    const overallAdherence = overallAdherencePercent(activeHeatHistories, ADHERENCE_WINDOW_DAYS);

    function handleEditProfilePress() {
        router.push('/edit-profile');
    }

    return (
        <Screen>
            <Text className="font-mono-medium text-[10.5px] uppercase tracking-[0.12em] text-slate">
                Você
            </Text>
            <ProfileHeader profile={profile} onEditPress={handleEditProfilePress} />
            <View className="mb-[18px] flex-row gap-2">
                <StatCard
                    layout="glance"
                    value={String(activeHabits.length)}
                    label="hábitos ativos"
                />
                <StatCard
                    layout="glance"
                    tone="warm"
                    value={String(bestConstancy)}
                    label="melhor constância"
                />
                <StatCard layout="glance" value={`${overallAdherence}%`} label="adesão geral" />
            </View>
            <SettingsSection
                label="Atividade"
                rows={[
                    {
                        icon: 'stats-chart',
                        title: 'Estatísticas completas',
                        subtitle: 'grade, adesão e insights',
                        tone: 'feature',
                    },
                ]}
            />
            <SettingsSection
                label="Conta"
                rows={[
                    { icon: 'at', title: 'Conta', subtitle: profile.email },
                    { icon: 'notifications-outline', title: 'Notificações' },
                    {
                        icon: 'shield-checkmark-outline',
                        title: 'Privacidade e dados',
                        subtitle: 'exportar ou excluir · LGPD',
                        tone: 'privacy',
                    },
                ]}
            />
            <Text className="mt-3 py-2 text-center font-mono-bold text-[12px] text-danger">
                Sair
            </Text>
        </Screen>
    );
}
