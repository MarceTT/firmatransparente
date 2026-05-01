export const Rol = {
  SUPERVISOR: 'SUPERVISOR',
  ABOGADO: 'ABOGADO',
  CLIENTE: 'CLIENTE',
} as const;
export type Rol = (typeof Rol)[keyof typeof Rol];

export const Plan = {
  BASICO: 'BASICO',
  PROFESIONAL: 'PROFESIONAL',
  ESTUDIO: 'ESTUDIO',
} as const;
export type Plan = (typeof Plan)[keyof typeof Plan];

export const TipoCaso = {
  LABORAL: 'LABORAL',
  FAMILIA: 'FAMILIA',
  CIVIL: 'CIVIL',
  COMERCIAL: 'COMERCIAL',
  ADMINISTRATIVO: 'ADMINISTRATIVO',
} as const;
export type TipoCaso = (typeof TipoCaso)[keyof typeof TipoCaso];

export const EtapaCaso = {
  INGRESO: 'INGRESO',
  DOCUMENTACION: 'DOCUMENTACION',
  TRAMITACION: 'TRAMITACION',
  AUDIENCIA: 'AUDIENCIA',
  RESOLUCION: 'RESOLUCION',
  CERRADO: 'CERRADO',
} as const;
export type EtapaCaso = (typeof EtapaCaso)[keyof typeof EtapaCaso];

export const TipoAccion = {
  ESCRITO: 'ESCRITO',
  AUDIENCIA: 'AUDIENCIA',
  LLAMADA: 'LLAMADA',
  DOCUMENTO: 'DOCUMENTO',
  RESOLUCION: 'RESOLUCION',
  OTRO: 'OTRO',
} as const;
export type TipoAccion = (typeof TipoAccion)[keyof typeof TipoAccion];

export const EstadoCuota = {
  PENDIENTE: 'PENDIENTE',
  PAGADA: 'PAGADA',
  VENCIDA: 'VENCIDA',
} as const;
export type EstadoCuota = (typeof EstadoCuota)[keyof typeof EstadoCuota];
