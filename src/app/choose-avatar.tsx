import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { AvatarChoice } from '@/components/avatar-choice';
import { BackLink } from '@/components/back-link';
import { NoteCard } from '@/components/note-card';
import { PrimaryButton } from '@/components/primary-button';
import { Screen } from '@/components/screen';
import { useProfile } from '@/contexts/profile-context';
import { AVATAR_SEEDS } from '@/lib/avatar-svg';
import { chunk } from '@/lib/chunk';

const CHOICES_PER_ROW = 3;
const seedRows = chunk(AVATAR_SEEDS, CHOICES_PER_ROW);

export default function ChooseAvatarScreen() {
    const router = useRouter();
    const { profile, updateAvatarSeed } = useProfile();
    const [selectedSeed, setSelectedSeed] = useState(profile.avatarSeed);

    function handleConfirmPress() {
        updateAvatarSeed(selectedSeed);
        router.back();
    }

    return (
        <Screen>
            <BackLink label="Perfil" />
            <Text className="font-display text-[24px] tracking-[-0.02em] text-ink">
                Escolha seu avatar
            </Text>
            <Text className="mt-1 font-body text-[13px] text-ink-soft">
                Toque em um para escolher — cada carinha é única.
            </Text>
            <View className="my-4 gap-3.5">
                {seedRows.map((rowSeeds, rowIndex) => (
                    <View key={rowIndex} className="flex-row justify-around">
                        {rowSeeds.map((seed) => (
                            <AvatarChoice
                                key={seed}
                                seed={seed}
                                isSelected={seed === selectedSeed}
                                onPress={() => setSelectedSeed(seed)}
                            />
                        ))}
                    </View>
                ))}
            </View>
            <NoteCard icon="shield-checkmark">
                Avatares são <Text className="font-body-semibold">desenhados pelo app</Text> a
                partir de um código — não usamos fotos suas nem coletamos imagens.
            </NoteCard>
            <View className="mt-4">
                <PrimaryButton label="Usar este avatar" onPress={handleConfirmPress} />
            </View>
        </Screen>
    );
}
