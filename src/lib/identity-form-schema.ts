import { z } from 'zod';

// O usuário escolhe/escreve só o complemento — a frase completa é montada
// com o prefixo fixo "alguém que" (padroniza o formato salvo no perfil).
export const identityFormSchema = z.object({
    identityComplement: z.string().trim().min(1),
});

export type IdentityFormValues = z.infer<typeof identityFormSchema>;
