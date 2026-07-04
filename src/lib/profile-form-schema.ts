import { z } from 'zod';

export const profileFormSchema = z.object({
    name: z.string().trim().min(1).max(24),
    avatarSeed: z.string().min(1),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
