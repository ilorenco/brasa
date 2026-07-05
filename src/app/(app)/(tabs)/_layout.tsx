import { Tabs } from 'expo-router/js-tabs';

import { BottomTabBar } from '@/components/navigation/bottom-tab-bar';

export default function TabsLayout() {
    return (
        <Tabs
            tabBar={(props) => <BottomTabBar {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Tabs.Screen name="index" options={{ title: 'Hoje' }} />
            <Tabs.Screen name="habits" options={{ title: 'Hábitos' }} />
            <Tabs.Screen name="you" options={{ title: 'Você' }} />
        </Tabs>
    );
}
