import { Ionicons } from '@expo/vector-icons';
import { cva, type VariantProps } from 'class-variance-authority';
import { Pressable, Text, View } from 'react-native';

const settingsRow = cva('flex-row items-center gap-3 px-3.5 py-[13px]', {
    variants: {
        hasDivider: {
            true: 'border-b border-line',
            false: '',
        },
        isPressable: {
            true: 'active:opacity-70',
            false: '',
        },
    },
    defaultVariants: { hasDivider: false, isPressable: false },
});

const rowIconBadge = cva('h-7 w-7 items-center justify-center rounded-lg', {
    variants: {
        tone: {
            default: 'bg-slate-soft',
            feature: 'bg-warm-1',
            privacy: 'bg-slate-soft',
        },
    },
    defaultVariants: { tone: 'default' },
});

const rowIconGlyph = cva('', {
    variants: {
        tone: {
            default: 'text-ink-soft',
            feature: 'text-warm-deep',
            privacy: 'text-slate',
        },
    },
    defaultVariants: { tone: 'default' },
});

export type SettingsRowProps = VariantProps<typeof rowIconBadge> & {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle?: string;
    hasDivider?: boolean;
    onPress?: () => void;
};

export function SettingsRow({
    icon,
    title,
    subtitle,
    tone,
    hasDivider = false,
    onPress,
}: SettingsRowProps) {
    const isPressable = onPress !== undefined;

    return (
        <Pressable
            onPress={onPress}
            disabled={!isPressable}
            className={settingsRow({ hasDivider, isPressable })}
            accessibilityRole="button"
            accessibilityState={{ disabled: !isPressable }}
            accessibilityLabel={title}
        >
            <View className={rowIconBadge({ tone })}>
                <Ionicons name={icon} size={14} className={rowIconGlyph({ tone })} />
            </View>
            <View className="flex-1">
                <Text className="font-body-medium text-[14px] text-ink">{title}</Text>
                {subtitle && (
                    <Text className="mt-px font-mono text-[10px] text-muted">{subtitle}</Text>
                )}
            </View>
            <Ionicons name="chevron-forward" size={15} className="text-muted" />
        </Pressable>
    );
}
