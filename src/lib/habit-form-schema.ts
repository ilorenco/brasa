import { z } from 'zod';

export const habitFormSchema = z.object({
    name: z.string().trim().min(1),
    anchor: z.string().trim().min(1),
    obstaclePlan: z.string().trim(),
});

export type HabitFormValues = z.infer<typeof habitFormSchema>;
