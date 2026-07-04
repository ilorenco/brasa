import { zodResolver } from '@hookform/resolvers/zod';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

import { ActionRow } from '@/components/ui/action-row';
import { BackLink } from '@/components/ui/back-link';
import { FormField } from '@/components/ui/form-field';
import { FormInput } from '@/components/ui/form-input';
import { PrimaryButton } from '@/components/ui/primary-button';
import { Screen } from '@/components/ui/screen';
import { useConfirm } from '@/contexts/confirm-context';
import { useHabits } from '@/contexts/habits-context';
import { habitFormSchema, type HabitFormValues } from '@/lib/habit-form-schema';

export default function EditHabitScreen() {
    const router = useRouter();
    const confirm = useConfirm();
    const { habitId } = useLocalSearchParams<{ habitId: string }>();
    const { habits, updateHabit, archiveHabit, deleteHabit } = useHabits();
    const habit = habits.find((candidate) => candidate.id === habitId);
    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<HabitFormValues>({
        resolver: zodResolver(habitFormSchema),
        mode: 'onChange',
        defaultValues: {
            name: habit?.name ?? '',
            anchor: habit?.anchor ?? '',
            obstaclePlan: habit?.obstaclePlan ?? '',
        },
    });

    if (!habit) return <Redirect href="/habits" />;

    const { name: habitName } = habit;

    function handleSaveSubmit({ name, anchor, obstaclePlan }: HabitFormValues) {
        updateHabit(habitId, { name, anchor, obstaclePlan: obstaclePlan || undefined });
        router.back();
    }

    function handleArchivePress() {
        archiveHabit(habitId);
        router.dismissTo('/habits');
    }

    async function handleDeletePress() {
        const confirmed = await confirm({
            title: `Excluir “${habitName}”?`,
            message:
                'O hábito e toda a constância construída serão apagados. Se quiser só uma pausa, arquive.',
            confirmLabel: 'Excluir',
            tone: 'danger',
        });
        if (!confirmed) return;
        deleteHabit(habitId);
        router.dismissTo('/habits');
    }

    return (
        <Screen>
            <BackLink label="Hábito" />
            <Text className="font-display text-[23px] tracking-[-0.01em] text-ink">
                Editar hábito
            </Text>
            <Text className="mb-5 mt-1 font-body text-[13px] text-ink-soft">
                Mude o que precisar. Seu histórico continua intacto.
            </Text>

            <FormField label="O hábito">
                <FormInput control={control} name="name" placeholder="ler 1 página" />
            </FormField>

            <FormField label="A âncora">
                <View className="flex-row items-center gap-2">
                    <Text className="font-body-medium text-[14px] text-ink-soft">Depois de</Text>
                    <FormInput
                        control={control}
                        name="anchor"
                        placeholder="tomar meu café"
                        variant="pill"
                    />
                </View>
            </FormField>

            <FormField label="O plano B · opcional">
                <FormInput
                    control={control}
                    name="obstaclePlan"
                    placeholder="se não der, leio antes de dormir"
                />
            </FormField>

            <View className="mt-1">
                <ActionRow
                    icon="archive-outline"
                    label="Arquivar hábito"
                    onPress={handleArchivePress}
                />
                <Text className="mt-2 px-0.5 font-body text-[11.5px] leading-[17px] text-muted">
                    Arquivar tira o hábito da lista de hoje, mas guarda toda a constância que você
                    construiu.
                </Text>
                <View className="mt-3">
                    <ActionRow
                        icon="trash-outline"
                        label="Excluir definitivamente"
                        tone="danger"
                        onPress={handleDeletePress}
                    />
                </View>
            </View>

            <View className="mt-6">
                <PrimaryButton
                    label="Salvar alterações"
                    onPress={handleSubmit(handleSaveSubmit)}
                    disabled={!isValid}
                />
            </View>
        </Screen>
    );
}
