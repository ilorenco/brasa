import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { type IoniconName, TabItem } from '@/components/tab-item';

type TabNavigation = BottomTabBarProps['navigation'];
type TabRoute = BottomTabBarProps['state']['routes'][number];

const tabMeta: Record<string, { label: string; icon: IoniconName; iconActive: IoniconName }> = {
    index: { label: 'Hoje', icon: 'today-outline', iconActive: 'today' },
    habits: { label: 'Hábitos', icon: 'grid-outline', iconActive: 'grid' },
    you: { label: 'Você', icon: 'person-outline', iconActive: 'person' },
};

function navigateToTab(navigation: TabNavigation, route: TabRoute, isActiveTab: boolean) {
    const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
    });

    if (!isActiveTab && !event.defaultPrevented) navigation.navigate(route.name);
}

export function BottomTabBar({ state, navigation }: BottomTabBarProps) {
    const insets = useSafeAreaInsets();

    return (
        <View
            className="flex-row border-t border-line bg-card px-2 pt-2"
            style={{ paddingBottom: insets.bottom + 8 }}
        >
            {state.routes.map((route, index) => {
                const tab = tabMeta[route.name];
                if (!tab) return null;

                const isActiveTab = state.index === index;

                return (
                    <TabItem
                        key={route.key}
                        label={tab.label}
                        icon={tab.icon}
                        iconActive={tab.iconActive}
                        isActive={isActiveTab}
                        onPress={() => navigateToTab(navigation, route, isActiveTab)}
                    />
                );
            })}
        </View>
    );
}
