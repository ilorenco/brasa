import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { Text, View } from 'react-native';

type NoteCardProps = {
    icon: keyof typeof Ionicons.glyphMap;
    children: ReactNode;
};

export function NoteCard({ icon, children }: NoteCardProps) {
    return (
        <View className="flex-row items-start gap-[9px] rounded-xl bg-slate-soft px-3.5 py-3">
            <Ionicons name={icon} size={13} className="mt-[2px] text-slate" />
            <Text className="flex-1 font-body text-[12.5px] leading-[18px] text-slate">
                {children}
            </Text>
        </View>
    );
}
