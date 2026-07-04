import type { ReactNode } from 'react';
import { Text, View } from 'react-native';

type FormFieldProps = {
    label: string;
    helper?: string;
    children: ReactNode;
};

export function FormField({ label, helper, children }: FormFieldProps) {
    return (
        <View className="mb-4">
            <Text className="mb-2 font-mono-medium text-[11px] uppercase tracking-[1px] text-slate">
                {label}
            </Text>
            {children}
            {helper && (
                <Text className="mt-2 font-body text-xs leading-[17px] text-muted">{helper}</Text>
            )}
        </View>
    );
}
