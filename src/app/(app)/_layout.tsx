import { Stack } from 'expo-router';

import { useAuth } from '@/contexts/auth-context';

// Sem isso, a primeira tela declarada abaixo viraria a rota inicial do grupo
// ao entrar logado.
export const unstable_settings = {
    initialRouteName: '(tabs)',
};

export default function AppLayout() {
    const { isOnboarding } = useAuth();

    return (
        <Stack screenOptions={{ headerShown: false }}>
            {/* Durante o cadastro só o onboarding (RF01) e o passo 2 (criar hábito)
                ficam acessíveis — deep link nenhum fura a escolha de identidade.
                Quando o guard vira, o navigator remove o onboarding do histórico. */}
            <Stack.Protected guard={isOnboarding}>
                <Stack.Screen name="onboarding" />
            </Stack.Protected>
            <Stack.Protected guard={!isOnboarding}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="habit/[habitId]/index" />
                <Stack.Screen name="habit/[habitId]/edit" />
                <Stack.Screen name="archived-habits" />
                <Stack.Screen name="edit-profile" />
            </Stack.Protected>
            <Stack.Screen name="create-habit" options={{ presentation: 'modal' }} />
            <Stack.Screen
                name="reward/[habitId]"
                options={{ presentation: 'fullScreenModal', animation: 'fade' }}
            />
        </Stack>
    );
}
