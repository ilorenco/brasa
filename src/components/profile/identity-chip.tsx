import { Ionicons } from '@expo/vector-icons';
import { cva } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { Pressable, Text, View } from 'react-native';

const identityChip = cva(
    'flex-row items-center gap-3 rounded-[13px] border-[1.5px] p-[13px] active:opacity-80',
    {
        variants: {
            isSelected: {
                true: 'border-warm-3 bg-warm-surface',
                false: 'border-line bg-card',
            },
            kind: {
                preset: '',
                custom: 'justify-center border-dashed',
            },
        },
        defaultVariants: { kind: 'preset' },
    }
);

const identityChipIconBox = cva('h-[30px] w-[30px] items-center justify-center rounded-[9px]', {
    variants: {
        isSelected: {
            true: 'bg-warm-1',
            false: 'bg-slate-soft',
        },
    },
});

const identityChipIcon = cva('', {
    variants: {
        isSelected: {
            true: 'text-warm-deep',
            false: 'text-slate',
        },
    },
});

const identityChipLabel = cva('text-[14px]', {
    variants: {
        kind: {
            preset: 'font-body-medium text-ink',
            custom: 'text-center font-body-semibold text-slate',
        },
    },
    defaultVariants: { kind: 'preset' },
});

type IdentityChipProps = {
    label: string;
    description?: string;
    icon?: ComponentProps<typeof Ionicons>['name'];
    isSelected: boolean;
    onPress: () => void;
    kind?: 'preset' | 'custom';
};

export function IdentityChip({
    label,
    description,
    icon,
    isSelected,
    onPress,
    kind,
}: IdentityChipProps) {
    return (
        <Pressable
            onPress={onPress}
            className={identityChip({ isSelected, kind })}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
        >
            {icon && (
                <View className={identityChipIconBox({ isSelected })}>
                    <Ionicons name={icon} size={15} className={identityChipIcon({ isSelected })} />
                </View>
            )}
            <View className="flex-1">
                <Text className={identityChipLabel({ kind })}>{label}</Text>
                {description && (
                    <Text className="mt-0.5 font-body text-[12px] text-muted">{description}</Text>
                )}
            </View>
        </Pressable>
    );
}
