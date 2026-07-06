import { createContext, type ReactNode, use, useCallback, useMemo, useState } from 'react';

// Auth mock (RF12): sem backend ainda, a sessão é só um boolean em memória —
// recarregar o app desloga. A auth real troca esta implementação e a fiação
// em welcome.tsx (que hoje chama o mesmo signIn/signUp sem distinguir provedor).
// Cadastro (signUp) passa pelo onboarding de identidade (RF01); login não.
type AuthContextValue = {
    isSignedIn: boolean;
    isOnboarding: boolean;
    signIn: () => void;
    signUp: () => void;
    completeOnboarding: () => void;
    signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isOnboarding, setIsOnboarding] = useState(false);

    const signIn = useCallback(() => setIsSignedIn(true), []);
    const signUp = useCallback(() => {
        setIsSignedIn(true);
        setIsOnboarding(true);
    }, []);
    const completeOnboarding = useCallback(() => setIsOnboarding(false), []);
    const signOut = useCallback(() => {
        setIsSignedIn(false);
        setIsOnboarding(false);
    }, []);

    const authContextValue = useMemo(
        () => ({ isSignedIn, isOnboarding, signIn, signUp, completeOnboarding, signOut }),
        [isSignedIn, isOnboarding, signIn, signUp, completeOnboarding, signOut]
    );

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const authContext = use(AuthContext);
    if (!authContext) throw new Error('useAuth must be used within AuthProvider');
    return authContext;
}
