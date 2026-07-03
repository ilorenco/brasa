import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export function ForgivenessNote() {
    return (
        <View className="flex-row items-start gap-[9px] rounded-xl bg-slate-soft px-3.5 py-3">
            <Ionicons name="heart" size={13} className="mt-[2px] text-slate" />
            <Text className="flex-1 font-body text-[12.5px] leading-[18px] text-slate">
                Faltou ontem? <Text className="font-body-semibold">Tudo bem.</Text> A grade mostra o
                quanto você já construiu — uma falha não apaga isso.
            </Text>
        </View>
    );
}
