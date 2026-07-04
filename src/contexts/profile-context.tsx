import { createContext, type ReactNode, use, useCallback, useMemo, useState } from 'react';

import { mockProfile } from '@/mocks/mock-profile';
import type { Profile } from '@/types/profile';

type ProfileContextValue = {
    profile: Profile;
    updateAvatarSeed: (avatarSeed: string) => void;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
    const [profile, setProfile] = useState(mockProfile);

    const updateAvatarSeed = useCallback((avatarSeed: string) => {
        setProfile((currentProfile) => ({ ...currentProfile, avatarSeed }));
    }, []);

    const profileContextValue = useMemo(
        () => ({ profile, updateAvatarSeed }),
        [profile, updateAvatarSeed]
    );

    return (
        <ProfileContext.Provider value={profileContextValue}>{children}</ProfileContext.Provider>
    );
}

export function useProfile() {
    const profileContext = use(ProfileContext);
    if (!profileContext) throw new Error('useProfile must be used within ProfileProvider');
    return profileContext;
}
