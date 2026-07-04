import { AVATAR_SEEDS } from '@/lib/avatar-svg';
import type { Profile } from '@/types/profile';

export const mockProfile: Profile = {
    name: 'Lucas',
    email: 'lucas@email.com',
    avatarSeed: AVATAR_SEEDS[2],
    identityPhrase: 'alguém que lê',
    // Mês é 0-indexado no construtor de Date: 2 = março.
    memberSince: new Date(2026, 2, 1),
};
