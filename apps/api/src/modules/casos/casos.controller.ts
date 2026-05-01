import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { CasosService } from './casos.service';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { Roles, CurrentUser } from '../../common/decorators';
import { CasoCreateSchema, CasoUpdateSchema, JwtPayload, Rol } from '@ft/types';
import { z } from 'zod';

@Controller('casos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CasosController {
  constructor(private casosService: CasosService) {}

  @Get()
  @Roles(Rol.SUPERVISOR, Rol.ABOGADO)
  async findAll() {
    return this.casosService.findAll();
  }

  @Get(':id')
  @Roles(Rol.SUPERVISOR, Rol.ABOGADO)
  async findOne(@Param('id') id: string) {
    return this.casosService.findOne(id);
  }

  @Post()
  @Roles(Rol.SUPERVISOR, Rol.ABOGADO)
  async create(
    @Body() dto: z.infer<typeof CasoCreateSchema>,
    @CurrentUser() _user: JwtPayload,
  ) {
    return this.casosService.create(dto);
  }

  @Patch(':id')
  @Roles(Rol.SUPERVISOR, Rol.ABOGADO)
  async update(
    @Param('id') id: string,
    @Body() dto: z.infer<typeof CasoUpdateSchema>,
  ) {
    return this.casosService.update(id, dto);
  }
}
