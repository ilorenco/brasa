import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthButton } from '@/components/ui/auth-button';
import { BrandMark } from '@/components/ui/brand-mark';
import { useAuth } from '@/contexts/auth-context';

export default function WelcomeScreen() {
    // Cadastro (Continuar com...) passa pelo onboarding de identidade; Entrar não.
    const { signIn, signUp } = useAuth();

    return (
        <SafeAreaView className="flex-1 bg-screen" edges={['top', 'bottom']}>
            <View className="flex-1 items-center px-5 pb-4 pt-12">
                <BrandMark />
                <Text className="mt-6 font-display text-[34px] text-ink">Brasa</Text>
                <Text className="mt-2 max-w-[200px] text-center font-body text-[14px] text-ink-soft">
                    Pequenos hábitos, mantidos acesos.
                </Text>
                <View className="mt-auto w-full gap-2.5">
                    <AuthButton
                        label="Continuar com e-mail"
                        icon="at"
                        emphasis="primary"
                        onPress={signUp}
                    />
                    <AuthButton label="Continuar com Google" icon="logo-google" onPress={signUp} />
                    <AuthButton label="Continuar com Apple" icon="logo-apple" onPress={signUp} />
                </View>
                <Text className="mt-4 font-body text-[12.5px] text-slate">
                    Já tem conta?{' '}
                    <Text className="font-body-semibold" onPress={signIn} suppressHighlighting>
                        Entrar
                    </Text>
                </Text>
                {/* Pendência de publicação (Play Store e App Store): os Termos e a
                    Política de Privacidade precisam existir como documentos acessíveis
                    (links tocáveis) antes do aceite valer — criar junto com a auth real.
                    Na App Store, manter o login Google exige oferecer também o Sign in
                    with Apple (guideline 4.8). */}
                <Text className="mt-3.5 max-w-[230px] text-center font-body text-[10.5px] leading-4 text-muted">
                    Ao continuar você concorda com os Termos e a Política de Privacidade (LGPD).
                </Text>
            </View>
        </SafeAreaView>
    );
}
