import { cva, type VariantProps } from 'class-variance-authority';
import { Text, View } from 'react-native';

const statCard = cva('flex-1 rounded-[13px] border border-line bg-card', {
    variants: {
        layout: {
            detail: 'px-3 py-[11px]',
            glance: 'items-center px-2 py-2.5',
        },
    },
    defaultVariants: { layout: 'detail' },
});

const statNumber = cva('font-display leading-none tracking-[-0.02em]', {
    variants: {
        tone: {
            ink: 'text-ink',
            warm: 'text-warm-deep',
        },
        layout: {
            detail: 'text-[24px]',
            glance: 'text-[20px]',
        },
    },
    defaultVariants: { tone: 'ink', layout: 'detail' },
});

const statLabel = cva('mt-[5px] font-mono uppercase text-muted', {
    variants: {
        layout: {
            detail: 'text-[9.5px] tracking-[0.08em]',
            glance: 'text-[8.5px] tracking-[0.06em]',
        },
    },
    defaultVariants: { layout: 'detail' },
});

type StatCardProps = VariantProps<typeof statNumber> & {
    value: string;
    label: string;
};

export function StatCard({ value, label, tone, layout }: StatCardProps) {
    return (
        <View className={statCard({ layout })}>
            <Text className={statNumber({ tone, layout })}>{value}</Text>
            <Text className={statLabel({ layout })}>{label}</Text>
        </View>
    );
}
