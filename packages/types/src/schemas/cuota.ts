import { z } from 'zod';
import { EstadoCuota } from '../enums';

export const CuotaSchema = z.object({
  id: z.string().cuid(),
  estudioId: z.string().cuid(),
  casoId: z.string().cuid(),
  monto: z.number().int().positive(), // Pesos chilenos
  vencimiento: z.date(),
  estado: z.nativeEnum(EstadoCuota),
  pagadoEn: z.date().nullable(),
  creadoEn: z.date(),
  actualizadoEn: z.date(),
});

export type Cuota = z.infer<typeof CuotaSchema>;

export const CuotaCreateSchema = z.object({
  casoId: z.string().cuid(),
  monto: z.number().int().positive(),
  vencimiento: z.date(),
});

export type CuotaCreate = z.infer<typeof CuotaCreateSchema>;
