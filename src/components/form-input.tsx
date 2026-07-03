import { cva, type VariantProps } from 'class-variance-authority';
import { type Control, Controller, type FieldPathByValue, type FieldValues } from 'react-hook-form';
import { TextInput } from 'react-native';

import { colors } from '@/theme/colors';

const formInput = cva('rounded-xl border-[1.5px]', {
    variants: {
        variant: {
            field: 'border-line bg-card p-[13px] font-body-medium text-[15px] text-ink',
            pill: 'flex-1 border-slate bg-slate-soft px-[13px] py-[11px] font-body-semibold text-[14px] text-slate',
        },
    },
    defaultVariants: { variant: 'field' },
});

type FormInputProps<TFieldValues extends FieldValues> = VariantProps<typeof formInput> & {
    control: Control<TFieldValues>;
    name: FieldPathByValue<TFieldValues, string>;
    placeholder: string;
};

export function FormInput<TFieldValues extends FieldValues>({
    control,
    name,
    placeholder,
    variant,
}: FormInputProps<TFieldValues>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    placeholderTextColor={colors.muted}
                    className={formInput({ variant })}
                />
            )}
        />
    );
}
