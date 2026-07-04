import { cva } from 'class-variance-authority';
import { Pressable, Text } from 'react-native';

const primaryButton = cva('items-center rounded-[14px] bg-warm-3', {
    variants: {
        size: {
            default: 'p-[15px]',
            compact: 'self-center px-6 py-2.5',
        },
        disabled: {
            true: 'opacity-40',
            false: 'active:opacity-80',
        },
    },
    defaultVariants: { size: 'default', disabled: false },
});

type PrimaryButtonProps = {
    label: string;
    onPress: () => void;
    size?: 'default' | 'compact';
    disabled?: boolean;
};

export function PrimaryButton({
    label,
    onPress,
    size = 'default',
    disabled = false,
}: PrimaryButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            className={primaryButton({ size, disabled })}
            accessibilityRole="button"
            accessibilityState={{ disabled }}
        >
            <Text className="font-body-semibold text-[15px] text-ink">{label}</Text>
        </Pressable>
    );
}
