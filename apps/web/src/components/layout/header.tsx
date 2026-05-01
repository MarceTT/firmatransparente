'use client';

export function Header() {
  return (
    <header className="h-16 border-b border-marino-100 bg-white px-6 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-ambar rounded-lg flex items-center justify-center">
            <span className="font-display text-marino text-sm font-bold">FT</span>
          </div>
          <span className="font-display text-marino">
            Firma<em>Transparente</em>
          </span>
        </div>

        <nav className="flex gap-6">
          <a href="/casos" className="text-marino font-medium hover:text-ambar transition-colors">
            Mis casos
          </a>
          <a href="/agenda" className="text-marino-400 hover:text-marino transition-colors">
            Agenda
          </a>
          <a href="/clientes" className="text-marino-400 hover:text-marino transition-colors">
            Clientes
          </a>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button className="px-4 py-2 bg-ambar text-marino font-medium rounded-lg hover:bg-ambar-400 transition-colors">
          + Nuevo caso
        </button>
        <button className="w-8 h-8 text-marino-400 hover:text-marino transition-colors">
          🔔
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-marino-100 rounded-full flex items-center justify-center">
            <span className="text-marino text-sm font-medium">RT</span>
          </div>
          <span className="text-sm text-marino">Roberto Tapia</span>
        </div>
      </div>
    </header>
  );
}
