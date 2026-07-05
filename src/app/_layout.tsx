import '../global.css';
import '@/nativewind-interop';

import {
    BricolageGrotesque_400Regular,
    BricolageGrotesque_600SemiBold,
    BricolageGrotesque_800ExtraBold,
} from '@expo-google-fonts/bricolage-grotesque';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import {
    JetBrainsMono_400Regular,
    JetBrainsMono_500Medium,
    JetBrainsMono_700Bold,
} from '@expo-google-fonts/jetbrains-mono';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider, useAuth } from '@/contexts/auth-context';
import { ConfirmProvider } from '@/contexts/confirm-context';
import { HabitsProvider } from '@/contexts/habits-context';
import { ProfileProvider } from '@/contexts/profile-context';

// Mantém a splash na tela até as fontes carregarem.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        BricolageGrotesque_400Regular,
        BricolageGrotesque_600SemiBold,
        BricolageGrotesque_800ExtraBold,
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        JetBrainsMono_400Regular,
        JetBrainsMono_500Medium,
        JetBrainsMono_700Bold,
    });

    useEffect(() => {
        if (loaded || error) SplashScreen.hideAsync();
    }, [loaded, error]);

    if (!loaded && !error) return null;

    return (
        <SafeAreaProvider>
            <AuthProvider>
                <HabitsProvider>
                    <ProfileProvider>
                        <ConfirmProvider>
                            <RootStack />
                        </ConfirmProvider>
                    </ProfileProvider>
                </HabitsProvider>
            </AuthProvider>
        </SafeAreaProvider>
    );
}

function RootStack() {
    const { isSignedIn } = useAuth();

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={!isSignedIn}>
                <Stack.Screen name="(auth)/welcome" />
            </Stack.Protected>
            {/* Toda tela autenticada vive no grupo (app)/ — proteção por pasta,
                sem lista de rotas pra manter em dia. */}
            <Stack.Protected guard={isSignedIn}>
                <Stack.Screen name="(app)" />
            </Stack.Protected>
        </Stack>
    );
}
