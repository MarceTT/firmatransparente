import { z } from 'zod';
import { TipoCaso, EtapaCaso } from '../enums';

export const CasoSchema = z.object({
  id: z.string().cuid(),
  estudioId: z.string().cuid(),
  titulo: z.string().min(3).max(200),
  descripcion: z.string().max(1000).nullable(),
  tipoCaso: z.nativeEnum(TipoCaso),
  etapa: z.nativeEnum(EtapaCaso),
  rol: z.string().max(50).nullable(), // ROL del tribunal
  abogadoId: z.string().cuid(),
  clienteId: z.string().cuid(),
  tokenCliente: z.string().cuid(),
  creadoEn: z.date(),
  actualizadoEn: z.date(),
  ultimaAccion: z.date().nullable(),
});

export type Caso = z.infer<typeof CasoSchema>;

export const CasoCreateSchema = CasoSchema.omit({
  id: true,
  estudioId: true, // Injected by middleware
  tokenCliente: true,
  creadoEn: true,
  actualizadoEn: true,
  ultimaAccion: true,
});

export type CasoCreate = z.infer<typeof CasoCreateSchema>;

export const CasoUpdateSchema = CasoCreateSchema.partial();

export type CasoUpdate = z.infer<typeof CasoUpdateSchema>;
