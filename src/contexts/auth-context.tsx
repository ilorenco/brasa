import { createContext, type ReactNode, use, useCallback, useMemo, useState } from 'react';

// Auth mock (RF12): sem backend ainda, a sessão é só um boolean em memória —
// recarregar o app desloga. A auth real troca esta implementação e a fiação
// em welcome.tsx (que hoje chama o mesmo signIn sem distinguir provedor).
type AuthContextValue = {
    isSignedIn: boolean;
    signIn: () => void;
    signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isSignedIn, setIsSignedIn] = useState(false);

    const signIn = useCallback(() => setIsSignedIn(true), []);
    const signOut = useCallback(() => setIsSignedIn(false), []);

    const authContextValue = useMemo(
        () => ({ isSignedIn, signIn, signOut }),
        [isSignedIn, signIn, signOut]
    );

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const authContext = use(AuthContext);
    if (!authContext) throw new Error('useAuth must be used within AuthProvider');
    return authContext;
}
