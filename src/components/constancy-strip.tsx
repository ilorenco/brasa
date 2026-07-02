import { View } from 'react-native';

import type { HeatLevel } from '@/data/mock-habits';

const heatLevelClasses: Record<HeatLevel, string> = {
    0: 'bg-warm-0',
    1: 'bg-warm-1',
    2: 'bg-warm-2',
    3: 'bg-warm-3',
    4: 'bg-warm-4',
};

type ConstancyStripProps = {
    heatLevels: HeatLevel[];
};

export function ConstancyStrip({ heatLevels }: ConstancyStripProps) {
    return (
        <View className="flex-row gap-[3px]">
            {heatLevels.map((level, dayIndex) => (
                <View
                    key={dayIndex}
                    className={`aspect-square flex-1 rounded-[2px] ${heatLevelClasses[level]}`}
                />
            ))}
        </View>
    );
}
