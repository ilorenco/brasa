import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, Text } from 'react-native';

type BackLinkProps = {
    label: string;
};

export function BackLink({ label }: BackLinkProps) {
    const router = useRouter();

    function handleBackPress() {
        router.back();
    }

    return (
        <Pressable
            onPress={handleBackPress}
            className="mb-2.5 flex-row items-center gap-1 self-start active:opacity-70"
            accessibilityRole="button"
            accessibilityLabel="Voltar"
        >
            <Ionicons name="arrow-back" size={13} className="text-slate" />
            <Text className="font-mono-medium text-[10.5px] uppercase tracking-[0.12em] text-slate">
                {label}
            </Text>
        </Pressable>
    );
}
