import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

type ScreenEyebrowProps = {
    label: string;
    onClosePress?: () => void;
};

// Altura fixa: com ou sem o botão de fechar, o título abaixo começa no mesmo
// lugar — passos de um mesmo fluxo não "pulam" entre telas.
export function ScreenEyebrow({ label, onClosePress }: ScreenEyebrowProps) {
    return (
        <View className="h-[22px] flex-row items-center justify-between">
            <Text className="font-mono-medium text-[10.5px] uppercase tracking-[1px] text-slate">
                {label}
            </Text>
            {onClosePress && (
                <Pressable
                    onPress={onClosePress}
                    className="active:opacity-60"
                    accessibilityRole="button"
                    accessibilityLabel="Fechar"
                >
                    <Ionicons name="close" size={22} className="text-muted" />
                </Pressable>
            )}
        </View>
    );
}
