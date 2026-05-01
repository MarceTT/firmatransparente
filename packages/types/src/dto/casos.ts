import { z } from 'zod';
import { CasoSchema, CasoCreateSchema, CasoUpdateSchema } from '../schemas/caso';
import { AccionSchema } from '../schemas/accion';
import { CuotaSchema } from '../schemas/cuota';
import { EtapaCaso, EstadoCuota } from '../enums';

// Response for GET /casos
export const CasoListItemSchema = CasoSchema.extend({
  abogado: z.object({
    id: z.string(),
    nombre: z.string(),
  }),
  cliente: z.object({
    id: z.string(),
    nombre: z.string(),
  }),
  _count: z.object({
    acciones: z.number(),
  }),
});

export type CasoListItem = z.infer<typeof CasoListItemSchema>;

// Response for GET /casos/:id
export const CasoDetalleSchema = CasoSchema.extend({
  abogado: z.object({
    id: z.string(),
    nombre: z.string(),
    email: z.string(),
  }),
  cliente: z.object({
    id: z.string(),
    nombre: z.string(),
    email: z.string(),
  }),
  acciones: z.array(AccionSchema),
  cuotas: z.array(CuotaSchema),
});

export type CasoDetalle = z.infer<typeof CasoDetalleSchema>;

// Response for GET /caso/:token (Client Portal)
export const CasoPortalSchema = z.object({
  titulo: z.string(),
  tipoCaso: z.string(),
  etapa: z.nativeEnum(EtapaCaso),
  estudioNombre: z.string(),
  abogadoNombre: z.string(),
  ultimasAcciones: z.array(
    z.object({
      descripcionCliente: z.string(),
      proximoPaso: z.string().nullable(),
      creadoEn: z.date(),
    })
  ),
  proximaCuota: z
    .object({
      monto: z.number(),
      vencimiento: z.date(),
      estado: z.nativeEnum(EstadoCuota),
    })
    .nullable(),
});

export type CasoPortal = z.infer<typeof CasoPortalSchema>;

export { CasoCreateSchema, CasoUpdateSchema };
