import type { ReactNode } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ScreenProps = {
    children: ReactNode;
};

export function Screen({ children }: ScreenProps) {
    return (
        <SafeAreaView className="flex-1 bg-screen" edges={['top']}>
            <ScrollView className="flex-1 px-5" contentContainerClassName="pb-6 pt-4">
                {children}
            </ScrollView>
        </SafeAreaView>
    );
}
