import { Ionicons } from '@expo/vector-icons';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { Pressable, Text, View } from 'react-native';

const authButton = cva('flex-row items-center rounded-[13px] p-[13px] active:opacity-80', {
    variants: {
        emphasis: {
            primary: 'bg-ink',
            neutral: 'border-[1.5px] border-line bg-card',
        },
    },
    defaultVariants: { emphasis: 'neutral' },
});

const authButtonLabel = cva('flex-1 text-center font-body-semibold text-[14px]', {
    variants: {
        emphasis: {
            primary: 'text-white',
            neutral: 'text-ink',
        },
    },
    defaultVariants: { emphasis: 'neutral' },
});

const authButtonIcon = cva('ml-8', {
    variants: {
        emphasis: {
            primary: 'text-white',
            neutral: 'text-ink',
        },
    },
    defaultVariants: { emphasis: 'neutral' },
});

type AuthButtonProps = VariantProps<typeof authButton> & {
    label: string;
    icon: ComponentProps<typeof Ionicons>['name'];
    onPress: () => void;
};

export function AuthButton({ label, icon, onPress, emphasis }: AuthButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            className={authButton({ emphasis })}
            accessibilityRole="button"
        >
            <Ionicons name={icon} size={16} className={authButtonIcon({ emphasis })} />
            <Text className={authButtonLabel({ emphasis })}>{label}</Text>
            {/* Espelha a largura do ícone + margem pra manter o rótulo oticamente centrado. */}
            <View className="w-12" />
        </Pressable>
    );
}
