import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm, useWatch } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FormField } from '@/components/ui/form-field';
import { FormInput } from '@/components/ui/form-input';
import { PrimaryButton } from '@/components/ui/primary-button';
import { useHabits } from '@/contexts/habits-context';
import { habitFormSchema, type HabitFormValues } from '@/lib/habit-form-schema';

export default function CreateHabitScreen() {
    const router = useRouter();
    const { createHabit } = useHabits();
    const {
        control,
        handleSubmit,
        formState: { isValid, isSubmitSuccessful },
    } = useForm<HabitFormValues>({
        resolver: zodResolver(habitFormSchema),
        mode: 'onChange',
        defaultValues: { name: '', anchor: '', obstaclePlan: '' },
    });
    const [watchedName, watchedAnchor] = useWatch({ control, name: ['name', 'anchor'] });

    function handleClosePress() {
        router.back();
    }

    function handleCreateSubmit({ name, anchor, obstaclePlan }: HabitFormValues) {
        createHabit({ name, anchor, obstaclePlan: obstaclePlan || undefined });
        router.back();
    }

    return (
        <SafeAreaView className="flex-1 bg-screen" edges={['top', 'bottom']}>
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    className="flex-1 px-5"
                    contentContainerClassName="pt-4"
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="flex-row items-center justify-between">
                        <Text className="font-mono-medium text-[10.5px] uppercase tracking-[1px] text-slate">
                            Novo hábito
                        </Text>
                        <Pressable
                            onPress={handleClosePress}
                            className="active:opacity-60"
                            accessibilityRole="button"
                            accessibilityLabel="Fechar"
                        >
                            <Ionicons name="close" size={22} className="text-muted" />
                        </Pressable>
                    </View>
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
                        <View className="flex-row items-center gap-2">
                            <Text className="font-body-medium text-[14px] text-ink-soft">
                                Depois de
                            </Text>
                            <FormInput
                                control={control}
                                name="anchor"
                                placeholder="tomar meu café"
                                variant="pill"
                            />
                        </View>
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
                                <Text className="font-body-semibold">{watchedAnchor.trim()}</Text>,
                                eu vou{' '}
                                <Text className="font-body-semibold">{watchedName.trim()}</Text>.
                            </Text>
                        </View>
                    )}
                </ScrollView>
                <View className="px-5 pb-2 pt-2">
                    <PrimaryButton
                        label="Criar hábito"
                        onPress={handleSubmit(handleCreateSubmit)}
                        disabled={!isValid || isSubmitSuccessful}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
