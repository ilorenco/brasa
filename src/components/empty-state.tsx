import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { Text, View } from 'react-native';

type EmptyStateProps = {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    description: string;
    action?: ReactNode;
};

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
    return (
        <View className="items-center px-6 pt-10">
            <View className="h-16 w-16 items-center justify-center rounded-full bg-slate-soft">
                <Ionicons name={icon} size={26} className="text-slate" />
            </View>
            <Text className="mt-4 font-display text-[18px] tracking-[-0.01em] text-ink">
                {title}
            </Text>
            <Text className="mt-1.5 max-w-[260px] text-center font-body text-[13px] leading-[19px] text-muted">
                {description}
            </Text>
            {action ? <View className="mt-5">{action}</View> : null}
        </View>
    );
}
