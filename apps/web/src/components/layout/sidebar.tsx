'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Mis casos', href: '/casos', count: 11 },
  { label: 'Alertas', href: '/alertas', count: 3, alert: true },
  { label: 'Hoy', href: '/hoy', count: 4 },
  { label: 'Esta semana', href: '/semana', count: 9 },
];

const filters = [
  { label: 'Laboral', count: 4 },
  { label: 'Civil', count: 3 },
  { label: 'Familia', count: 3 },
  { label: 'Administrativo', count: 1 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-marino-100 bg-white p-4 min-h-[calc(100vh-4rem)]">
      {/* Search */}
      <div className="mb-6">
        <input
          type="search"
          placeholder="Buscar caso o cliente"
          className="w-full px-3 py-2 border border-marino-200 rounded-lg text-sm focus:ring-2 focus:ring-ambar focus:border-ambar outline-none"
        />
      </div>

      {/* Views */}
      <div className="mb-6">
        <p className="text-xs text-marino-400 font-medium mb-2">VISTAS</p>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors',
                pathname === item.href
                  ? 'bg-marino-50 text-marino font-medium'
                  : 'text-marino-400 hover:bg-marino-50 hover:text-marino'
              )}
            >
              <span>{item.label}</span>
              <span
                className={cn(
                  'text-xs px-2 py-0.5 rounded-full',
                  item.alert
                    ? 'bg-red-100 text-red-600'
                    : 'bg-marino-100 text-marino-600'
                )}
              >
                {item.count}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Filters */}
      <div>
        <p className="text-xs text-marino-400 font-medium mb-2">FILTROS</p>
        <p className="text-xs text-marino-500 mb-2">Tipo de caso</p>
        <div className="space-y-1">
          {filters.map((filter) => (
            <label key={filter.label} className="flex items-center gap-2 text-sm text-marino-600">
              <input type="checkbox" className="rounded border-marino-300" />
              <span>{filter.label}</span>
              <span className="text-marino-400">({filter.count})</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
