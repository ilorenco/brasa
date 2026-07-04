import { Ionicons } from '@expo/vector-icons';
import { cva, type VariantProps } from 'class-variance-authority';
import { Pressable, Text, View } from 'react-native';

const actionRow = cva(
    'flex-row items-center gap-[11px] rounded-xl border-[1.5px] bg-card px-3.5 py-[13px] active:opacity-70',
    {
        variants: {
            tone: {
                default: 'border-line',
                danger: 'border-danger-line',
            },
        },
        defaultVariants: { tone: 'default' },
    }
);

const actionIconBadge = cva('h-[26px] w-[26px] items-center justify-center rounded-lg', {
    variants: {
        tone: {
            default: 'bg-slate-soft',
            danger: 'bg-danger-soft',
        },
    },
    defaultVariants: { tone: 'default' },
});

const actionIconGlyph = cva('', {
    variants: {
        tone: {
            default: 'text-ink-soft',
            danger: 'text-danger',
        },
    },
    defaultVariants: { tone: 'default' },
});

const actionLabel = cva('font-body-medium text-[14px]', {
    variants: {
        tone: {
            default: 'text-ink',
            danger: 'text-danger',
        },
    },
    defaultVariants: { tone: 'default' },
});

type ActionRowProps = VariantProps<typeof actionRow> & {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    onPress: () => void;
};

export function ActionRow({ icon, label, tone, onPress }: ActionRowProps) {
    return (
        <Pressable
            onPress={onPress}
            className={actionRow({ tone })}
            accessibilityRole="button"
            accessibilityLabel={label}
        >
            <View className={actionIconBadge({ tone })}>
                <Ionicons name={icon} size={13} className={actionIconGlyph({ tone })} />
            </View>
            <Text className={actionLabel({ tone })}>{label}</Text>
        </Pressable>
    );
}
