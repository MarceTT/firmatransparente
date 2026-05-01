import { AsyncLocalStorage } from 'async_hooks';
import { Rol } from '@ft/types';

export interface TenantContext {
  estudioId: string;
  userId: string;
  rol: Rol;
}

export const tenantContext = new AsyncLocalStorage<TenantContext>();
