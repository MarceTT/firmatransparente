import { z } from 'zod';
import { Rol } from '../enums';

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const LoginResponseSchema = z.object({
  accessToken: z.string(),
  user: z.object({
    id: z.string().cuid(),
    nombre: z.string(),
    email: z.string().email(),
    rol: z.nativeEnum(Rol),
    estudioId: z.string().cuid(),
    estudioNombre: z.string(),
  }),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const JwtPayloadSchema = z.object({
  sub: z.string().cuid(), // userId
  estudioId: z.string().cuid(),
  rol: z.nativeEnum(Rol),
  iat: z.number().optional(),
  exp: z.number().optional(),
});

export type JwtPayload = z.infer<typeof JwtPayloadSchema>;
