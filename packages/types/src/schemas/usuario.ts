import { z } from 'zod';
import { Rol } from '../enums';

export const UsuarioSchema = z.object({
  id: z.string().cuid(),
  estudioId: z.string().cuid(),
  nombre: z.string().min(2).max(100),
  email: z.string().email(),
  rol: z.nativeEnum(Rol),
  activo: z.boolean(),
  creadoEn: z.date(),
  actualizadoEn: z.date(),
});

export type Usuario = z.infer<typeof UsuarioSchema>;

export const UsuarioCreateSchema = UsuarioSchema.omit({
  id: true,
  creadoEn: true,
  actualizadoEn: true,
}).extend({
  password: z.string().min(8),
});

export type UsuarioCreate = z.infer<typeof UsuarioCreateSchema>;
