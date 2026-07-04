import { Pressable, Text, View } from 'react-native';

import { AvatarBadge } from '@/components/avatar-badge';
import { SeededAvatar } from '@/components/seeded-avatar';
import { formatSinceLabel } from '@/lib/date-labels';
import type { Profile } from '@/types/profile';

type ProfileHeaderProps = {
    profile: Profile;
    onEditPress: () => void;
};

export function ProfileHeader({ profile, onEditPress }: ProfileHeaderProps) {
    const { name, avatarSeed, identityPhrase, memberSince } = profile;

    return (
        <View className="mb-[18px] mt-1.5 items-center">
            <Pressable
                onPress={onEditPress}
                className="mb-3 active:opacity-80"
                accessibilityRole="button"
                accessibilityLabel="Editar perfil"
            >
                <SeededAvatar seed={avatarSeed} size={78} />
                <AvatarBadge icon="pencil" />
            </Pressable>
            <Text className="font-display text-[23px] tracking-[-0.02em] text-ink">{name}</Text>
            <Text className="mt-1 font-mono text-[11px] uppercase text-muted">
                {identityPhrase} · {formatSinceLabel(memberSince)}
            </Text>
        </View>
    );
}
