interface PageProps {
  params: Promise<{ token: string }>;
}

export default async function PortalCasoPage({ params }: PageProps) {
  const { token } = await params;

  // In production, fetch from API
  // const caso = await fetch(`${API_URL}/caso/${token}`).then(r => r.json());

  return (
    <div className="min-h-screen bg-hueso p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-marino rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T&A</span>
            </div>
            <div>
              <p className="text-xs text-marino-400">ESTUDIO</p>
              <p className="font-semibold text-marino">Tapia & Asociados</p>
            </div>
          </div>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
            📞
          </button>
        </div>

        {/* Greeting */}
        <div className="mb-6">
          <h1 className="font-display text-3xl text-marino">Hola, Juan.</h1>
          <p className="text-marino-400">
            Esta semana avanzamos con tu caso. Aquí está el resumen.
          </p>
        </div>

        {/* Case Card */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <p className="text-xs text-marino-400 mb-1">TU CASO</p>
          <h2 className="font-display text-2xl text-marino mb-2">Despido injustificado</h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-verde rounded-full"></span>
            <span className="text-sm text-verde font-medium">EN TRAMITACIÓN</span>
          </div>
        </div>

        {/* This Week */}
        <div className="mb-6">
          <p className="text-xs text-marino-400 text-center mb-4">ESTA SEMANA</p>
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-verde-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-verde">✓</span>
            </div>
            <div>
              <p className="text-marino font-medium">
                Presentamos tu demanda ante el tribunal y entregamos el contrato laboral como prueba.
              </p>
              <p className="text-sm text-marino-400 mt-1">📅 Lunes 14 de abril</p>
            </div>
          </div>
        </div>

        {/* Next Step */}
        <div className="bg-ambar-50 rounded-xl p-6">
          <p className="text-xs text-marino-400 text-center mb-4">PRÓXIMO PASO</p>
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-ambar rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white">→</span>
            </div>
            <div>
              <p className="text-marino font-medium">
                Audiencia preparatoria, estimada para la 3ra semana de mayo
              </p>
              <p className="text-sm text-marino-400 mt-1">
                Te avisaremos cuando se confirme la fecha exacta.
              </p>
            </div>
          </div>
        </div>

        {/* Debug info */}
        <p className="text-xs text-marino-300 text-center mt-8">
          Token: {token}
        </p>
      </div>
    </div>
  );
}
