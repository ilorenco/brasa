import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp, ZoomIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RewardGrid } from '@/components/habit/reward-grid';
import { REWARD_GRID_DAYS } from '@/constants/constancy';
import { useHabits } from '@/contexts/habits-context';
import { countConstancyDays } from '@/lib/constancy';
import { rewardHeadline } from '@/lib/reward-headline';
import { colors } from '@/theme/colors';

const REWARD_GRADIENT = [colors.reward.from, colors.reward.via, colors.reward.to] as const;

export default function RewardScreen() {
    const router = useRouter();
    const { habitId } = useLocalSearchParams<{ habitId: string }>();
    const { habits } = useHabits();
    const [headlineDraw] = useState(() => Math.random());
    const habit = habits.find((candidate) => candidate.id === habitId);

    if (!habit) return <Redirect href="/" />;

    const constancyDays = countConstancyDays(habit.heatHistory);
    const recentHeat = habit.heatHistory.slice(-REWARD_GRID_DAYS);

    function handleContinuePress() {
        router.back();
    }

    return (
        <LinearGradient
            colors={REWARD_GRADIENT}
            start={{ x: 0.15, y: 0 }}
            end={{ x: 0.85, y: 1 }}
            style={{ flex: 1 }}
        >
            <StatusBar style="dark" />
            <SafeAreaView className="flex-1">
                <View className="flex-1 items-center justify-center px-8">
                    <Animated.View entering={ZoomIn.springify().damping(14).delay(80)}>
                        <View className="h-24 w-24 items-center justify-center rounded-full bg-reward-glow/60">
                            <View className="h-16 w-16 items-center justify-center rounded-full bg-reward-ink">
                                <Ionicons
                                    name="checkmark"
                                    size={32}
                                    className="text-reward-cream"
                                />
                            </View>
                        </View>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(220).duration(400)}>
                        <View className="mt-4 flex-row items-center gap-1.5">
                            <Ionicons name="sparkles" size={11} className="text-reward-ink/80" />
                            <Text className="font-mono-bold text-[12px] uppercase tracking-[0.14em] text-reward-ink/80">
                                mais uma vez
                            </Text>
                            <Ionicons name="sparkles" size={11} className="text-reward-ink/80" />
                        </View>
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(300).duration(400)}>
                        <Text className="mt-1.5 text-center font-display text-[30px] leading-[32px] tracking-[-0.02em] text-reward-ink">
                            {rewardHeadline(constancyDays, headlineDraw)}
                        </Text>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(380).duration(400)}>
                        <View className="mt-3.5 rounded-full bg-reward-ink/[0.12] px-3.5 py-1.5">
                            <Text className="font-mono-bold text-[13px] text-reward-ink">
                                Constância · {constancyDays} dias
                            </Text>
                        </View>
                    </Animated.View>

                    <Animated.View entering={FadeIn.delay(560).duration(500)}>
                        <View className="mt-7 items-center">
                            <RewardGrid heatLevels={recentHeat} />
                            <Text className="mt-2.5 font-mono-bold text-[10px] uppercase tracking-[0.1em] text-reward-ink/70">
                                +1 hoje
                            </Text>
                        </View>
                    </Animated.View>
                </View>

                <Animated.View entering={FadeInUp.delay(720).duration(400)}>
                    <View className="px-6 pb-6">
                        <Pressable
                            onPress={handleContinuePress}
                            className="items-center rounded-[14px] bg-reward-ink p-[15px] active:opacity-80"
                            accessibilityRole="button"
                            accessibilityLabel="Continuar"
                        >
                            <Text className="font-body-semibold text-[15px] text-reward-cream">
                                Continuar
                            </Text>
                        </Pressable>
                    </View>
                </Animated.View>
            </SafeAreaView>
        </LinearGradient>
    );
}
