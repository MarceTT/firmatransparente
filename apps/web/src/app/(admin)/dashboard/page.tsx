export default function DashboardPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-3xl text-marino">Buenos días, Carmen.</h1>
        <p className="text-marino-400">
          Martes 29 de abril, 2026 · 47 casos activos · <span className="text-red-500">8 requieren atención</span>
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-6">
          <p className="text-marino-400 text-sm mb-1">Sin movimiento +15 días</p>
          <p className="text-3xl font-mono text-red-500">8</p>
          <p className="text-xs text-marino-300">Crítico</p>
        </div>
        <div className="bg-white rounded-lg p-6">
          <p className="text-marino-400 text-sm mb-1">Sin movimiento 8-14 días</p>
          <p className="text-3xl font-mono text-ambar">12</p>
          <p className="text-xs text-marino-300">Atención</p>
        </div>
        <div className="bg-white rounded-lg p-6">
          <p className="text-marino-400 text-sm mb-1">Cuota vencida</p>
          <p className="text-3xl font-mono text-red-500">5</p>
          <p className="text-xs text-marino-300">Cobranza</p>
        </div>
        <div className="bg-white rounded-lg p-6">
          <p className="text-marino-400 text-sm mb-1">Audiencia próx. 7 días</p>
          <p className="text-3xl font-mono text-verde">3</p>
          <p className="text-xs text-marino-300">Preparar</p>
        </div>
      </div>

      {/* Placeholder for table */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="font-semibold text-marino mb-4">Todos los casos</h2>
        <p className="text-marino-300">La tabla de casos se implementará en la siguiente fase.</p>
      </div>
    </div>
  );
}
