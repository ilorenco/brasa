import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Pressable, Text } from 'react-native';

export type IoniconName = ComponentProps<typeof Ionicons>['name'];

type TabItemProps = {
    label: string;
    icon: IoniconName;
    iconActive: IoniconName;
    isActive: boolean;
    onPress: () => void;
};

export function TabItem({ label, icon, iconActive, isActive, onPress }: TabItemProps) {
    return (
        <Pressable
            onPress={onPress}
            className="flex-1 items-center gap-0.5 py-1 active:opacity-70"
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
        >
            <Ionicons
                name={isActive ? iconActive : icon}
                size={22}
                className={isActive ? 'text-warm-3' : 'text-muted'}
            />
            <Text
                className={`font-body-medium text-[11px] ${
                    isActive ? 'text-warm-deep' : 'text-muted'
                }`}
            >
                {label}
            </Text>
        </Pressable>
    );
}
