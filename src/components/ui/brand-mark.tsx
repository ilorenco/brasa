import { View } from 'react-native';

import { HeatCell } from '@/components/habit/heat-cell';
import { emberLevels } from '@/theme/brand-mark';

// A marca é a grade de constância em miniatura — um campo frio com brasas
// acesas (5 colunas × 3 linhas). O desenho vem de src/theme/brand-mark.js,
// a mesma fonte que gera assets/brand/brasa-mark.svg.
export function BrandMark() {
    return (
        <View className="w-[66px] flex-row flex-wrap gap-1">
            {emberLevels.map((emberLevel, cellIndex) => (
                <HeatCell key={cellIndex} level={emberLevel} size="brand" />
            ))}
        </View>
    );
}
