import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

import { AvatarChoice } from '@/components/avatar-choice';
import { BackLink } from '@/components/back-link';
import { FormField } from '@/components/form-field';
import { FormInput } from '@/components/form-input';
import { NoteCard } from '@/components/note-card';
import { PrimaryButton } from '@/components/primary-button';
import { Screen } from '@/components/screen';
import { useProfile } from '@/contexts/profile-context';
import { AVATAR_SEEDS } from '@/lib/avatar-svg';
import { chunk } from '@/lib/chunk';
import { profileFormSchema, type ProfileFormValues } from '@/lib/profile-form-schema';

const CHOICES_PER_ROW = 3;
const seedRows = chunk(AVATAR_SEEDS, CHOICES_PER_ROW);

export default function EditProfileScreen() {
    const router = useRouter();
    const { profile, updateProfile } = useProfile();
    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        mode: 'onChange',
        defaultValues: { name: profile.name, avatarSeed: profile.avatarSeed },
    });

    function handleSaveSubmit(editedProfile: ProfileFormValues) {
        updateProfile(editedProfile);
        router.back();
    }

    return (
        <Screen>
            <BackLink label="Perfil" />
            <Text className="mb-5 font-display text-[24px] tracking-[-0.02em] text-ink">
                Editar perfil
            </Text>

            <FormField label="Seu nome" helper="É assim que o app vai te chamar.">
                <FormInput control={control} name="name" placeholder="Lucas" />
            </FormField>

            <FormField label="Avatar" helper="Toque em um para escolher — cada carinha é única.">
                <Controller
                    control={control}
                    name="avatarSeed"
                    render={({ field: { value, onChange } }) => (
                        <View className="mt-1 gap-3.5">
                            {seedRows.map((rowSeeds, rowIndex) => (
                                <View key={rowIndex} className="flex-row justify-around">
                                    {rowSeeds.map((seed) => (
                                        <AvatarChoice
                                            key={seed}
                                            seed={seed}
                                            isSelected={seed === value}
                                            onPress={() => onChange(seed)}
                                        />
                                    ))}
                                </View>
                            ))}
                        </View>
                    )}
                />
            </FormField>

            <NoteCard icon="shield-checkmark">
                Avatares são <Text className="font-body-semibold">desenhados pelo app</Text> a
                partir de um código — não usamos fotos suas nem coletamos imagens.
            </NoteCard>
            <View className="mt-4">
                <PrimaryButton
                    label="Salvar"
                    onPress={handleSubmit(handleSaveSubmit)}
                    disabled={!isValid}
                />
            </View>
        </Screen>
    );
}
