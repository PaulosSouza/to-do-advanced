import { string, z } from 'zod';

export const AuthenticateUserRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const AuthenticateUserResponseSchema = z.object({
  token: z.string(),
});

export type AuthenticateUserRequest = z.infer<
  typeof AuthenticateUserRequestSchema
>;

export type AuthenticateUserResponse = z.infer<
  typeof AuthenticateUserResponseSchema
>;
