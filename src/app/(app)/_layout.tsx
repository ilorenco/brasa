import { Stack } from 'expo-router';

// Sem isso, a primeira tela declarada abaixo (o modal de criar hábito) viraria
// a rota inicial do grupo ao entrar logado.
export const unstable_settings = {
    initialRouteName: '(tabs)',
};

export default function AppLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="create-habit" options={{ presentation: 'modal' }} />
            <Stack.Screen
                name="reward/[habitId]"
                options={{ presentation: 'fullScreenModal', animation: 'fade' }}
            />
        </Stack>
    );
}
