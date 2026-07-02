import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

type HabitAnchorProps = {
    anchor: string;
};

export function HabitAnchor({ anchor }: HabitAnchorProps) {
    return (
        <View className="mt-0.5 flex-row items-center gap-1">
            <Ionicons name="return-down-forward-outline" size={12} className="text-slate" />
            <Text className="font-mono text-[11px] text-slate">{anchor}</Text>
        </View>
    );
}
