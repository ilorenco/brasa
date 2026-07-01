import { Text, View } from 'react-native';

export default function Index() {
    return (
        <View className="flex-1 items-center justify-center gap-2 bg-page">
            <Text className="font-mono text-xs uppercase tracking-widest text-slate">Brasa</Text>
            <Text className="font-display text-3xl text-ink">Pequenos hábitos,</Text>
            <Text className="font-display text-3xl text-warm-deep">mantidos acesos.</Text>
            <Text className="font-body text-base text-ink-soft">
                Sistema de design carregado 🔥
            </Text>
        </View>
    );
}
