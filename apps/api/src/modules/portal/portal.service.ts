import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CasoPortal } from '@ft/types';

@Injectable()
export class PortalService {
  constructor(private prisma: PrismaService) {}

  async findByToken(token: string): Promise<CasoPortal> {
    const caso = await this.prisma.caso.findUnique({
      where: { tokenCliente: token },
      include: {
        estudio: { select: { nombre: true } },
        abogado: { select: { nombre: true } },
        acciones: {
          where: { visibleCliente: true },
          orderBy: { creadoEn: 'desc' },
          take: 5,
          select: {
            descripcionCliente: true,
            proximoPaso: true,
            creadoEn: true,
          },
        },
        cuotas: {
          where: { estado: { in: ['PENDIENTE', 'VENCIDA'] } },
          orderBy: { vencimiento: 'asc' },
          take: 1,
        },
      },
    });

    if (!caso) {
      throw new NotFoundException('Caso no encontrado');
    }

    return {
      titulo: caso.titulo,
      tipoCaso: caso.tipoCaso,
      etapa: caso.etapa,
      estudioNombre: caso.estudio.nombre,
      abogadoNombre: caso.abogado.nombre,
      ultimasAcciones: caso.acciones,
      proximaCuota: caso.cuotas[0] || null,
    };
  }
}
