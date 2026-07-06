import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type FormScreenProps = {
    children: ReactNode;
    footer: ReactNode;
};

// Moldura das telas de formulário: o teclado empurra o conteúdo (iOS) e o
// rodapé fixo mantém a ação primária visível fora do scroll.
export function FormScreen({ children, footer }: FormScreenProps) {
    return (
        <SafeAreaView className="flex-1 bg-screen" edges={['top', 'bottom']}>
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    className="flex-1 px-5"
                    contentContainerClassName="pt-4"
                    keyboardShouldPersistTaps="handled"
                >
                    {children}
                </ScrollView>
                <View className="px-5 pb-2 pt-2">{footer}</View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
