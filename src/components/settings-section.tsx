import { Text, View } from 'react-native';

import { SettingsRow, type SettingsRowProps } from '@/components/settings-row';

type SettingsSectionProps = {
    label: string;
    rows: Omit<SettingsRowProps, 'hasDivider'>[];
};

export function SettingsSection({ label, rows }: SettingsSectionProps) {
    return (
        <View className="mb-3.5">
            <Text className="mb-2 ml-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                {label}
            </Text>
            <View className="overflow-hidden rounded-[14px] border border-line bg-card">
                {rows.map((row, rowIndex) => (
                    <SettingsRow key={row.title} {...row} hasDivider={rowIndex < rows.length - 1} />
                ))}
            </View>
        </View>
    );
}
