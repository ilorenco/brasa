import { Ionicons } from '@expo/vector-icons';
import { cva, type VariantProps } from 'class-variance-authority';
import { Modal, Pressable, Text, View } from 'react-native';

const confirmButton = cva('flex-1 items-center rounded-[13px] p-[13px] active:opacity-80', {
    variants: {
        tone: {
            default: 'bg-warm-3',
            danger: 'bg-danger',
        },
    },
    defaultVariants: { tone: 'default' },
});

const confirmButtonLabel = cva('font-body-semibold text-[14.5px]', {
    variants: {
        tone: {
            default: 'text-ink',
            danger: 'text-white',
        },
    },
    defaultVariants: { tone: 'default' },
});

const iconBadge = cva('mb-3.5 h-11 w-11 items-center justify-center rounded-full', {
    variants: {
        tone: {
            default: 'bg-slate-soft',
            danger: 'bg-danger-soft',
        },
    },
    defaultVariants: { tone: 'default' },
});

const iconGlyph = cva('', {
    variants: {
        tone: {
            default: 'text-slate',
            danger: 'text-danger',
        },
    },
    defaultVariants: { tone: 'default' },
});

const toneIcon = {
    default: 'alert-circle-outline',
    danger: 'trash-outline',
} as const;

type ConfirmDialogProps = VariantProps<typeof confirmButton> & {
    visible: boolean;
    title: string;
    message: string;
    confirmLabel: string;
    cancelLabel: string;
    onConfirm: () => void;
    onCancel: () => void;
};

export function ConfirmDialog({
    visible,
    title,
    message,
    confirmLabel,
    cancelLabel,
    tone,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    const activeTone = tone ?? 'default';

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onCancel}
            statusBarTranslucent
        >
            <View className="flex-1 items-center justify-center px-8">
                <Pressable
                    onPress={onCancel}
                    className="absolute inset-0 bg-black/40"
                    accessibilityRole="button"
                    accessibilityLabel="Fechar"
                />
                <View
                    className="w-full max-w-[360px] items-center rounded-[20px] bg-card p-6"
                    accessibilityViewIsModal
                >
                    <View className={iconBadge({ tone: activeTone })}>
                        <Ionicons
                            name={toneIcon[activeTone]}
                            size={20}
                            className={iconGlyph({ tone: activeTone })}
                        />
                    </View>
                    <Text className="text-center font-display text-[19px] leading-tight text-ink">
                        {title}
                    </Text>
                    <Text className="mt-2 text-center font-body text-[13px] leading-[19px] text-ink-soft">
                        {message}
                    </Text>
                    <View className="mt-5 w-full flex-row gap-3">
                        <Pressable
                            onPress={onCancel}
                            className="flex-1 items-center rounded-[13px] bg-slate-soft p-[13px] active:opacity-70"
                            accessibilityRole="button"
                        >
                            <Text className="font-body-medium text-[14.5px] text-ink-soft">
                                {cancelLabel}
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={onConfirm}
                            className={confirmButton({ tone: activeTone })}
                            accessibilityRole="button"
                        >
                            <Text className={confirmButtonLabel({ tone: activeTone })}>
                                {confirmLabel}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
