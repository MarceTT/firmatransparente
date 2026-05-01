import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@ft/prisma';
import { tenantContext } from '../common/middleware/tenant.context';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  /**
   * Gets the current tenant's estudioId from the async context.
   * Throws if no tenant context is available.
   *
   * Usage in services:
   * ```ts
   * const estudioId = this.prisma.getEstudioId();
   * return this.prisma.caso.findMany({
   *   where: { estudioId },
   * });
   * ```
   */
  getEstudioId(): string {
    const ctx = tenantContext.getStore();

    if (!ctx?.estudioId) {
      throw new Error('Tenant context not available. Ensure TenantMiddleware is applied.');
    }

    return ctx.estudioId;
  }

  /**
   * Gets the current user's ID from the async context.
   * Throws if no tenant context is available.
   */
  getUserId(): string {
    const ctx = tenantContext.getStore();

    if (!ctx?.userId) {
      throw new Error('Tenant context not available. Ensure TenantMiddleware is applied.');
    }

    return ctx.userId;
  }

  /**
   * Gets the full tenant context.
   * Throws if no tenant context is available.
   */
  getTenantContext() {
    const ctx = tenantContext.getStore();

    if (!ctx) {
      throw new Error('Tenant context not available. Ensure TenantMiddleware is applied.');
    }

    return ctx;
  }

  /**
   * Checks if a tenant context is available.
   * Use this when you need to conditionally check for tenant context
   * without throwing an error.
   */
  hasTenantContext(): boolean {
    return !!tenantContext.getStore()?.estudioId;
  }
}
