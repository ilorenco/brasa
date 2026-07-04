import { View } from 'react-native';

import { HeatCell } from '@/components/habit/heat-cell';
import { CONSTANCY_WEEKS } from '@/constants/constancy';
import { chunk } from '@/lib/chunk';
import type { HeatLevel } from '@/types/habit';

type ConstancyGridProps = {
    heatLevels: HeatLevel[];
};

export function ConstancyGrid({ heatLevels }: ConstancyGridProps) {
    const dayRows = chunk(heatLevels, CONSTANCY_WEEKS);

    return (
        <View className="gap-[3px]">
            {dayRows.map((rowLevels, rowIndex) => (
                <View key={rowIndex} className="flex-row gap-[3px]">
                    {rowLevels.map((level, dayIndex) => (
                        <HeatCell key={dayIndex} level={level} />
                    ))}
                </View>
            ))}
        </View>
    );
}
