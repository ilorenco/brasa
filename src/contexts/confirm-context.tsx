import { createContext, type ReactNode, use, useCallback, useMemo, useState } from 'react';

import { ConfirmDialog } from '@/components/confirm-dialog';

type ConfirmRequest = {
    title: string;
    message: string;
    confirmLabel: string;
    cancelLabel?: string;
    tone?: 'default' | 'danger';
};

type PendingConfirm = ConfirmRequest & { resolve: (confirmed: boolean) => void };

type ConfirmContextValue = {
    confirm: (request: ConfirmRequest) => Promise<boolean>;
};

const ConfirmContext = createContext<ConfirmContextValue | null>(null);

export function ConfirmProvider({ children }: { children: ReactNode }) {
    // `visible` controla o modal; `pending` mantém o conteúdo renderizado durante
    // o fade de saída, senão o texto some e o tom volta ao padrão no meio da animação.
    const [pending, setPending] = useState<PendingConfirm | null>(null);
    const [visible, setVisible] = useState(false);

    const confirm = useCallback(
        (request: ConfirmRequest) =>
            new Promise<boolean>((resolve) => {
                // Se já houver um diálogo aberto, encerra o anterior como recusado
                // para que aquele `await confirm()` não fique pendurado.
                setPending((current) => {
                    current?.resolve(false);
                    return { ...request, resolve };
                });
                setVisible(true);
            }),
        []
    );

    const settle = useCallback(
        (confirmed: boolean) => {
            pending?.resolve(confirmed);
            setVisible(false);
        },
        [pending]
    );

    const confirmContextValue = useMemo(() => ({ confirm }), [confirm]);

    return (
        <ConfirmContext.Provider value={confirmContextValue}>
            {children}
            <ConfirmDialog
                visible={visible}
                title={pending?.title ?? ''}
                message={pending?.message ?? ''}
                confirmLabel={pending?.confirmLabel ?? ''}
                cancelLabel={pending?.cancelLabel ?? 'Cancelar'}
                tone={pending?.tone}
                onConfirm={() => settle(true)}
                onCancel={() => settle(false)}
            />
        </ConfirmContext.Provider>
    );
}

export function useConfirm() {
    const confirmContext = use(ConfirmContext);
    if (!confirmContext) throw new Error('useConfirm must be used within ConfirmProvider');
    return confirmContext.confirm;
}
