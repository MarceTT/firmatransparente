import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { tenantContext, TenantContext } from './tenant.context';
import { JwtPayload } from '@ft/types';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // User is attached by JwtAuthGuard
    const user = (req as any).user as JwtPayload | undefined;

    if (!user?.estudioId) {
      // No tenant context - let the route handler decide (might be public)
      return next();
    }

    const ctx: TenantContext = {
      estudioId: user.estudioId,
      userId: user.sub,
      rol: user.rol,
    };

    tenantContext.run(ctx, () => {
      next();
    });
  }
}
