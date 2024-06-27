import { z } from 'zod';

export const RegisterUserBodySchema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email(),
  password: z.string(),
});

export type RegisterUserBody = z.infer<typeof RegisterUserBodySchema>;
