import { View } from 'react-native';

import type { HeatLevel } from '@/types/habit';

type RewardGridProps = {
    heatLevels: HeatLevel[];
};

const CELL_BASE = 'h-[13px] w-[13px] rounded-[2.5px]';

function cellTone(level: HeatLevel, isToday: boolean): string {
    if (isToday) return 'bg-reward-cell';
    return level > 0 ? 'bg-reward-ink/40' : 'bg-reward-ink/[0.14]';
}

export function RewardGrid({ heatLevels }: RewardGridProps) {
    const lastIndex = heatLevels.length - 1;

    return (
        <View className="w-[170px] flex-row flex-wrap gap-[4px]">
            {heatLevels.map((level, index) => (
                <View
                    key={index}
                    className={`${CELL_BASE} ${cellTone(level, index === lastIndex)}`}
                />
            ))}
        </View>
    );
}
