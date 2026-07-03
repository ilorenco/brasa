import { cva, type VariantProps } from 'class-variance-authority';
import { Text, View } from 'react-native';

const statNumber = cva('font-display text-[24px] leading-none tracking-[-0.02em]', {
    variants: {
        tone: {
            ink: 'text-ink',
            warm: 'text-warm-deep',
        },
    },
    defaultVariants: { tone: 'ink' },
});

type HabitStatProps = VariantProps<typeof statNumber> & {
    value: string;
    label: string;
};

export function HabitStat({ value, label, tone }: HabitStatProps) {
    return (
        <View className="flex-1 rounded-[13px] border border-line bg-card px-3 py-[11px]">
            <Text className={statNumber({ tone })}>{value}</Text>
            <Text className="mt-[5px] font-mono text-[9.5px] uppercase tracking-[0.08em] text-muted">
                {label}
            </Text>
        </View>
    );
}
