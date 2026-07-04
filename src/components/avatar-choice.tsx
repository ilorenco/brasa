import { cva } from 'class-variance-authority';
import { Pressable, View } from 'react-native';

import { AvatarBadge } from '@/components/avatar-badge';
import { SeededAvatar } from '@/components/seeded-avatar';

const AVATAR_CHOICE_SIZE = 76;

const avatarChoiceRing = cva('rounded-full border-[3px] p-[3px]', {
    variants: {
        isSelected: {
            true: 'border-warm-3',
            false: 'border-transparent',
        },
    },
});

type AvatarChoiceProps = {
    seed: string;
    isSelected: boolean;
    onPress: () => void;
};

export function AvatarChoice({ seed, isSelected, onPress }: AvatarChoiceProps) {
    return (
        <Pressable
            onPress={onPress}
            className="active:opacity-80"
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
            accessibilityLabel="Avatar gerado"
        >
            <View className={avatarChoiceRing({ isSelected })}>
                <SeededAvatar seed={seed} size={AVATAR_CHOICE_SIZE} />
                {isSelected && <AvatarBadge icon="checkmark" size="sm" />}
            </View>
        </Pressable>
    );
}
