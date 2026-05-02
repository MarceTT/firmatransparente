import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tenantContext, TenantContext } from '../middleware/tenant.context';
import { JwtPayload } from '@ft/types';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload | undefined;

    if (!user?.estudioId) {
      // No tenant context - public route or no auth
      return next.handle();
    }

    const ctx: TenantContext = {
      estudioId: user.estudioId,
      userId: user.sub,
      rol: user.rol,
    };

    // Wrap the handler execution in the tenant context
    return new Observable((subscriber) => {
      tenantContext.run(ctx, () => {
        next.handle().subscribe({
          next: (value) => subscriber.next(value),
          error: (err) => subscriber.error(err),
          complete: () => subscriber.complete(),
        });
      });
    });
  }
}
