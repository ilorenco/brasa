import type { Control, FieldPathByValue, FieldValues } from 'react-hook-form';
import { Text, View } from 'react-native';

import { FormInput } from '@/components/ui/form-input';

type PrefixedInputProps<TFieldValues extends FieldValues> = {
    prefix: string;
    control: Control<TFieldValues>;
    name: FieldPathByValue<TFieldValues, string>;
    placeholder: string;
};

// Frase com lacuna: um prefixo fixo ("Depois de", "Alguém que") seguido do
// input pill que o usuário completa.
export function PrefixedInput<TFieldValues extends FieldValues>({
    prefix,
    control,
    name,
    placeholder,
}: PrefixedInputProps<TFieldValues>) {
    return (
        <View className="flex-row items-center gap-2">
            <Text className="font-body-medium text-[14px] text-ink-soft">{prefix}</Text>
            <FormInput control={control} name={name} placeholder={placeholder} variant="pill" />
        </View>
    );
}
