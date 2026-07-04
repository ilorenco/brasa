import { Ionicons } from '@expo/vector-icons';
import { cva } from 'class-variance-authority';
import { View } from 'react-native';

const avatarBadge = cva(
    'absolute -bottom-0.5 -right-0.5 items-center justify-center rounded-full border-[2.5px] border-screen bg-warm-3',
    {
        variants: {
            size: {
                md: 'h-[26px] w-[26px]',
                sm: 'h-[22px] w-[22px]',
            },
        },
        defaultVariants: { size: 'md' },
    }
);

const badgeGlyphSizes = { md: 12, sm: 11 };

type AvatarBadgeProps = {
    icon: keyof typeof Ionicons.glyphMap;
    size?: keyof typeof badgeGlyphSizes;
};

export function AvatarBadge({ icon, size = 'md' }: AvatarBadgeProps) {
    return (
        <View className={avatarBadge({ size })}>
            <Ionicons name={icon} size={badgeGlyphSizes[size]} className="text-ink" />
        </View>
    );
}
