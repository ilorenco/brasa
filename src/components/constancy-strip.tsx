import { View } from 'react-native';

import { HeatCell } from '@/components/heat-cell';
import type { HeatLevel } from '@/types/habit';

type ConstancyStripProps = {
    heatLevels: HeatLevel[];
};

export function ConstancyStrip({ heatLevels }: ConstancyStripProps) {
    return (
        <View className="flex-row gap-[3px]">
            {heatLevels.map((level, dayIndex) => (
                <HeatCell key={dayIndex} level={level} />
            ))}
        </View>
    );
}
