import { Controller, Get, Param } from '@nestjs/common';
import { PortalService } from './portal.service';
import { Public } from '../../common/decorators';

@Controller('caso')
export class PortalController {
  constructor(private portalService: PortalService) {}

  @Public()
  @Get(':token')
  async findByToken(@Param('token') token: string) {
    return this.portalService.findByToken(token);
  }
}
