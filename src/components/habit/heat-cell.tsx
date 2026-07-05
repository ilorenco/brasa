import { cva, type VariantProps } from 'class-variance-authority';
import { View } from 'react-native';

import type { HeatLevel } from '@/types/habit';

const heatCell = cva('rounded-[2.5px]', {
    variants: {
        level: {
            0: 'bg-warm-0',
            1: 'bg-warm-1',
            2: 'bg-warm-2',
            3: 'bg-warm-3',
            4: 'bg-warm-4',
        },
        size: {
            fluid: 'aspect-square flex-1',
            legend: 'h-[11px] w-[11px]',
            brand: 'h-2.5 w-2.5',
        },
    },
    defaultVariants: { size: 'fluid' },
});

type HeatCellProps = VariantProps<typeof heatCell> & {
    level: HeatLevel;
};

export function HeatCell({ level, size }: HeatCellProps) {
    return <View className={heatCell({ level, size })} />;
}
