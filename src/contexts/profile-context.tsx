import { createContext, type ReactNode, use, useCallback, useMemo, useState } from 'react';

import { mockProfile } from '@/mocks/mock-profile';
import type { Profile } from '@/types/profile';

type EditableProfileFields = Pick<Profile, 'name' | 'avatarSeed' | 'identityPhrase'>;

type ProfileContextValue = {
    profile: Profile;
    updateProfile: (editedFields: Partial<EditableProfileFields>) => void;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
    const [profile, setProfile] = useState(mockProfile);

    const updateProfile = useCallback((editedFields: Partial<EditableProfileFields>) => {
        setProfile((currentProfile) => ({ ...currentProfile, ...editedFields }));
    }, []);

    const profileContextValue = useMemo(
        () => ({ profile, updateProfile }),
        [profile, updateProfile]
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
