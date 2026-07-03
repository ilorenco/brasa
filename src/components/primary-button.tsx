import { cva } from 'class-variance-authority';
import { Pressable, Text } from 'react-native';

const primaryButton = cva('items-center rounded-[14px] bg-warm-3 p-[15px]', {
    variants: {
        disabled: {
            true: 'opacity-40',
            false: 'active:opacity-80',
        },
    },
    defaultVariants: { disabled: false },
});

type PrimaryButtonProps = {
    label: string;
    onPress: () => void;
    disabled?: boolean;
};

export function PrimaryButton({ label, onPress, disabled = false }: PrimaryButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            className={primaryButton({ disabled })}
            accessibilityRole="button"
            accessibilityState={{ disabled }}
        >
            <Text className="font-body-semibold text-[15px] text-ink">{label}</Text>
        </Pressable>
    );
}
