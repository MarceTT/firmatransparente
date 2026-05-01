import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-marino text-white p-8">
      <div className="max-w-2xl text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-ambar rounded-lg flex items-center justify-center">
            <span className="font-display text-marino text-xl font-bold">FT</span>
          </div>
          <h1 className="font-display text-3xl">
            Firma<em>Transparente</em>
          </h1>
        </div>
        
        <p className="text-lg text-marino-200 mb-4">PLATAFORMA DE GESTIÓN LEGAL</p>
        
        <h2 className="font-display text-5xl mb-6">
          El estudio que tus clientes <em>siempre</em> entienden.
        </h2>
        
        <p className="text-marino-200 mb-12">
          Cada acción del caso, traducida al cliente. Cada plazo, antes de que se venza. Cada cuota, visible.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="px-6 py-3 bg-ambar text-marino font-semibold rounded-lg hover:bg-ambar-400 transition-colors"
          >
            Ingresar
          </Link>
        </div>
      </div>
    </main>
  );
}
