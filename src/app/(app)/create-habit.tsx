import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useForm, useWatch } from 'react-hook-form';
import { Text, View } from 'react-native';

import { FormField } from '@/components/ui/form-field';
import { FormInput } from '@/components/ui/form-input';
import { FormScreen } from '@/components/ui/form-screen';
import { PrefixedInput } from '@/components/ui/prefixed-input';
import { PrimaryButton } from '@/components/ui/primary-button';
import { ScreenEyebrow } from '@/components/ui/screen-eyebrow';
import { useAuth } from '@/contexts/auth-context';
import { useHabits } from '@/contexts/habits-context';
import { habitFormSchema, type HabitFormValues } from '@/lib/habit-form-schema';

export default function CreateHabitScreen() {
    const router = useRouter();
    // No onboarding a tela vira o passo "2 de 2", pré-semeada pela identidade.
    const { origin, suggestedName, suggestedAnchor } = useLocalSearchParams<{
        origin?: string;
        suggestedName?: string;
        suggestedAnchor?: string;
    }>();
    const isOnboardingStep = origin === 'onboarding';
    const { completeOnboarding } = useAuth();
    const { createHabit } = useHabits();
    const {
        control,
        handleSubmit,
        formState: { isValid, isSubmitSuccessful },
    } = useForm<HabitFormValues>({
        resolver: zodResolver(habitFormSchema),
        mode: 'onChange',
        defaultValues: {
            name: suggestedName ?? '',
            anchor: suggestedAnchor ?? '',
            obstaclePlan: '',
        },
    });
    const [watchedName, watchedAnchor] = useWatch({ control, name: ['name', 'anchor'] });

    function handleClosePress() {
        router.back();
    }

    function handleCreateSubmit({ name, anchor, obstaclePlan }: HabitFormValues) {
        createHabit({ name, anchor, obstaclePlan: obstaclePlan || undefined });
        if (isOnboardingStep) {
            // O flip do guard remove o onboarding do histórico; o replace leva
            // pro Hoje sem deixar tela órfã embaixo.
            completeOnboarding();
            router.replace('/');
        } else router.back();
    }

    return (
        <FormScreen
            footer={
                <PrimaryButton
                    label="Criar hábito"
                    onPress={handleSubmit(handleCreateSubmit)}
                    disabled={!isValid || isSubmitSuccessful}
                />
            }
        >
            <ScreenEyebrow
                label={isOnboardingStep ? 'Novo hábito · 2 de 2' : 'Novo hábito'}
                onClosePress={handleClosePress}
            />
            <Text className="mt-2 font-display text-[25px] leading-tight text-ink">
                Comece ridiculamente pequeno.
            </Text>
            <Text className="mb-5 mt-1 font-body text-[13px] text-ink-soft">
                Pequeno o bastante para você fazer até num dia ruim.
            </Text>

            <FormField
                label="O hábito"
                helper="Não “ler 30 minutos”. Uma página. Dá pra crescer depois."
            >
                <FormInput control={control} name="name" placeholder="ler 1 página" />
            </FormField>

            <FormField
                label="A âncora"
                helper="Prenda o hábito novo a algo que você já faz todo dia."
            >
                <PrefixedInput
                    prefix="Depois de"
                    control={control}
                    name="anchor"
                    placeholder="tomar meu café"
                />
            </FormField>

            <FormField
                label="O plano B · opcional"
                helper="Decidir agora o que fazer num dia difícil evita que uma falta vire duas."
            >
                <FormInput
                    control={control}
                    name="obstaclePlan"
                    placeholder="se não der, leio antes de dormir"
                />
            </FormField>

            {isValid && (
                <View className="mb-4 flex-row items-start gap-2 rounded-xl border border-warm-1 bg-warm-surface p-3.5">
                    <Ionicons name="sparkles" size={13} className="mt-0.5 text-warm-deep" />
                    <Text className="flex-1 font-body text-[12.5px] leading-[18px] text-warm-deep">
                        Toda vez que{' '}
                        <Text className="font-body-semibold">{watchedAnchor.trim()}</Text>, eu vou{' '}
                        <Text className="font-body-semibold">{watchedName.trim()}</Text>.
                    </Text>
                </View>
            )}
        </FormScreen>
    );
}
