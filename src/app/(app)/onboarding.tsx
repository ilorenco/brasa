import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { type ComponentProps, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Text, View } from 'react-native';

import { IdentityChip } from '@/components/profile/identity-chip';
import { FormField } from '@/components/ui/form-field';
import { FormScreen } from '@/components/ui/form-screen';
import { PrefixedInput } from '@/components/ui/prefixed-input';
import { PrimaryButton } from '@/components/ui/primary-button';
import { ScreenEyebrow } from '@/components/ui/screen-eyebrow';
import { useProfile } from '@/contexts/profile-context';
import { capitalizeFirst } from '@/lib/capitalize-first';
import { identityFormSchema, type IdentityFormValues } from '@/lib/identity-form-schema';

type IdentityOption = {
    icon: ComponentProps<typeof Ionicons>['name'];
    complement: string;
    description: string;
    suggestedHabit: { name: string; anchor: string };
};

// Pontos de partida (tela 01 do esboço): cada identidade semeia o passo 2
// com um hábito ridiculamente pequeno já preenchido. Os chips carregam só o
// complemento — o prefixo "alguém que" é fixo na interface e na frase salva.
const IDENTITY_OPTIONS: IdentityOption[] = [
    {
        icon: 'book-outline',
        complement: 'lê',
        description: 'Uma página já conta',
        suggestedHabit: { name: 'ler 1 página', anchor: 'tomar meu café' },
    },
    {
        icon: 'walk-outline',
        complement: 'se move',
        description: 'Qualquer movimento conta',
        suggestedHabit: { name: 'alongar 2 minutos', anchor: 'acordar' },
    },
    {
        icon: 'flower-outline',
        complement: 'medita',
        description: 'Alguns minutos de calma',
        suggestedHabit: { name: 'respirar fundo 1 minuto', anchor: 'almoçar' },
    },
    {
        icon: 'create-outline',
        complement: 'escreve',
        description: 'Coloca as ideias no papel',
        suggestedHabit: { name: 'escrever 1 frase', anchor: 'jantar' },
    },
    {
        icon: 'water-outline',
        complement: 'se hidrata',
        description: "Um copo d'água já basta",
        suggestedHabit: { name: "beber um copo d'água", anchor: 'escovar os dentes' },
    },
    {
        icon: 'school-outline',
        complement: 'estuda',
        description: 'Um pouco por dia rende muito',
        suggestedHabit: { name: 'revisar 1 anotação', anchor: 'chegar em casa' },
    },
    {
        icon: 'heart-outline',
        complement: 'agradece',
        description: 'Nota o que já é bom',
        suggestedHabit: { name: 'anotar 1 coisa boa do dia', anchor: 'deitar na cama' },
    },
    {
        icon: 'wallet-outline',
        complement: 'cuida do dinheiro',
        description: 'Um gasto anotado por vez',
        suggestedHabit: { name: 'anotar 1 gasto', anchor: 'almoçar' },
    },
];

export default function OnboardingScreen() {
    const router = useRouter();
    const { updateProfile } = useProfile();
    const [isCustomIdentity, setIsCustomIdentity] = useState(false);
    const {
        control,
        handleSubmit,
        setValue,
        formState: { isValid },
    } = useForm<IdentityFormValues>({
        resolver: zodResolver(identityFormSchema),
        mode: 'onChange',
        defaultValues: { identityComplement: '' },
    });
    const watchedComplement = useWatch({ control, name: 'identityComplement' });

    function handleOptionPress(option: IdentityOption) {
        setIsCustomIdentity(false);
        setValue('identityComplement', option.complement, { shouldValidate: true });
    }

    function handleCustomPress() {
        setIsCustomIdentity(true);
        setValue('identityComplement', '', { shouldValidate: true });
    }

    function handleContinueSubmit({ identityComplement }: IdentityFormValues) {
        const complement = identityComplement.trim();
        updateProfile({ identityPhrase: `alguém que ${complement}` });
        // Identidade custom nunca herda sugestão de preset, mesmo com texto igual.
        const chosenOption = isCustomIdentity
            ? undefined
            : IDENTITY_OPTIONS.find((option) => option.complement === complement);
        router.push({
            pathname: '/create-habit',
            params: {
                origin: 'onboarding',
                ...(chosenOption && {
                    suggestedName: chosenOption.suggestedHabit.name,
                    suggestedAnchor: chosenOption.suggestedHabit.anchor,
                }),
            },
        });
    }

    return (
        <FormScreen
            footer={
                <PrimaryButton
                    tone="ink"
                    label="Continuar"
                    onPress={handleSubmit(handleContinueSubmit)}
                    disabled={!isValid}
                />
            }
        >
            <ScreenEyebrow label="Vamos começar · 1 de 2" />
            <Text className="mt-2 font-display text-[25px] leading-tight text-ink">
                Quem você quer se tornar?
            </Text>
            <Text className="mb-5 mt-1 font-body text-[13px] text-ink-soft">
                Hábitos são votos para o tipo de pessoa que você quer ser. Escolha um ponto de
                partida.
            </Text>
            <FormField
                label="Quero ser alguém que..."
                helper={
                    isCustomIdentity
                        ? 'Complete do seu jeito: cozinha, corre, estuda...'
                        : undefined
                }
            >
                <View className="gap-2.5">
                    {IDENTITY_OPTIONS.map((identityOption) => (
                        <IdentityChip
                            key={identityOption.complement}
                            icon={identityOption.icon}
                            label={capitalizeFirst(identityOption.complement)}
                            description={identityOption.description}
                            isSelected={
                                !isCustomIdentity && watchedComplement === identityOption.complement
                            }
                            onPress={() => handleOptionPress(identityOption)}
                        />
                    ))}
                    <IdentityChip
                        kind="custom"
                        label="+ Criar a minha"
                        isSelected={isCustomIdentity}
                        onPress={handleCustomPress}
                    />
                    {isCustomIdentity && (
                        <View className="mt-1">
                            <PrefixedInput
                                prefix="Alguém que"
                                control={control}
                                name="identityComplement"
                                placeholder="cozinha"
                            />
                        </View>
                    )}
                </View>
            </FormField>
        </FormScreen>
    );
}
