import { Text, View } from 'react-native';

import { HeatCell } from '@/components/habit/heat-cell';
import type { HeatLevel } from '@/types/habit';

const legendLevels: HeatLevel[] = [0, 1, 2, 3, 4];

export function HeatLegend() {
    return (
        <View className="flex-row items-center justify-end gap-[5px]">
            <Text className="font-mono text-[10px] text-muted">menos</Text>
            {legendLevels.map((level) => (
                <HeatCell key={level} level={level} size="legend" />
            ))}
            <Text className="font-mono text-[10px] text-muted">mais</Text>
        </View>
    );
}
