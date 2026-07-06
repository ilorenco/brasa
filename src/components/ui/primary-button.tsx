import { cva } from 'class-variance-authority';
import { Pressable, Text } from 'react-native';

const primaryButton = cva('items-center rounded-[14px]', {
    variants: {
        tone: {
            warm: 'bg-warm-3',
            ink: 'bg-ink',
        },
        size: {
            default: 'p-[15px]',
            compact: 'self-center px-6 py-2.5',
        },
        disabled: {
            true: 'opacity-40',
            false: 'active:opacity-80',
        },
    },
    defaultVariants: { tone: 'warm', size: 'default', disabled: false },
});

const primaryButtonLabel = cva('font-body-semibold text-[15px]', {
    variants: {
        tone: {
            warm: 'text-ink',
            ink: 'text-white',
        },
    },
    defaultVariants: { tone: 'warm' },
});

type PrimaryButtonProps = {
    label: string;
    onPress: () => void;
    tone?: 'warm' | 'ink';
    size?: 'default' | 'compact';
    disabled?: boolean;
};

export function PrimaryButton({
    label,
    onPress,
    tone = 'warm',
    size = 'default',
    disabled = false,
}: PrimaryButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            className={primaryButton({ tone, size, disabled })}
            accessibilityRole="button"
            accessibilityState={{ disabled }}
        >
            <Text className={primaryButtonLabel({ tone })}>{label}</Text>
        </Pressable>
    );
}
