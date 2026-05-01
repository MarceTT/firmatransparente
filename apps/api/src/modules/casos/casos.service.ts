import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CasoCreateSchema, CasoUpdateSchema } from '@ft/types';
import { z } from 'zod';

@Injectable()
export class CasosService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const estudioId = this.prisma.getEstudioId();

    return this.prisma.caso.findMany({
      where: { estudioId },
      include: {
        abogado: { select: { id: true, nombre: true } },
        cliente: { select: { id: true, nombre: true } },
        _count: { select: { acciones: true } },
      },
      orderBy: { actualizadoEn: 'desc' },
    });
  }

  async findOne(id: string) {
    const estudioId = this.prisma.getEstudioId();

    const caso = await this.prisma.caso.findFirst({
      where: { id, estudioId },
      include: {
        abogado: { select: { id: true, nombre: true, email: true } },
        cliente: { select: { id: true, nombre: true, email: true } },
        acciones: { orderBy: { creadoEn: 'desc' } },
        cuotas: { orderBy: { vencimiento: 'asc' } },
      },
    });

    if (!caso) {
      throw new NotFoundException('Caso no encontrado');
    }

    return caso;
  }

  async create(data: z.infer<typeof CasoCreateSchema>) {
    const estudioId = this.prisma.getEstudioId();

    return this.prisma.caso.create({
      data: {
        ...data,
        estudioId,
      },
      include: {
        abogado: { select: { id: true, nombre: true } },
        cliente: { select: { id: true, nombre: true } },
      },
    });
  }

  async update(id: string, data: z.infer<typeof CasoUpdateSchema>) {
    const caso = await this.findOne(id); // Throws if not found

    return this.prisma.caso.update({
      where: { id: caso.id },
      data,
      include: {
        abogado: { select: { id: true, nombre: true } },
        cliente: { select: { id: true, nombre: true } },
      },
    });
  }
}
