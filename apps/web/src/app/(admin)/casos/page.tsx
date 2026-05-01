export default function CasosPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-display text-3xl text-marino">Mis casos</h1>
          <p className="text-marino-400">
            Buenos días, Roberto. <span className="text-red-500">2 casos</span> requieren tu atención hoy.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-marino-200 rounded-lg hover:bg-white transition-colors">
            Vista Kanban
          </button>
          <button className="px-4 py-2 bg-marino text-white rounded-lg hover:bg-marino-600 transition-colors">
            + Registrar acción
          </button>
        </div>
      </div>

      {/* Placeholder for Kanban board */}
      <div className="grid grid-cols-4 gap-4">
        {['Ingreso', 'Documentación', 'Tramitación', 'Audiencia'].map((etapa) => (
          <div key={etapa} className="bg-white rounded-lg p-4 min-h-[400px]">
            <h3 className="font-semibold text-marino mb-4 flex items-center gap-2">
              {etapa}
              <span className="text-xs bg-marino-100 text-marino-600 px-2 py-0.5 rounded-full">
                0
              </span>
            </h3>
            <p className="text-sm text-marino-300">Sin casos en esta etapa</p>
          </div>
        ))}
      </div>
    </div>
  );
}
