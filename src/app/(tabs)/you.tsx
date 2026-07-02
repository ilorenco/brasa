import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function YouScreen() {
    return (
        <SafeAreaView className="flex-1 bg-screen" edges={['top']}>
            <View className="flex-1 items-center justify-center">
                <Text className="font-display text-2xl text-ink">Você</Text>
                <Text className="mt-1 font-body text-[13px] text-muted">em breve</Text>
            </View>
        </SafeAreaView>
    );
}
