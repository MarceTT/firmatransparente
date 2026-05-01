import { LoginForm } from './login-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex flex-col justify-between bg-marino text-white p-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-ambar rounded-lg flex items-center justify-center">
            <span className="font-display text-marino font-bold">FT</span>
          </div>
          <span className="font-display text-xl">
            Firma<em>Transparente</em>
          </span>
        </div>

        <div>
          <p className="text-ambar text-sm mb-4">PLATAFORMA DE GESTIÓN LEGAL</p>
          <h1 className="font-display text-4xl mb-6">
            El estudio que tus clientes <em>siempre</em> entienden.
          </h1>
          <p className="text-marino-200">
            Cada acción del caso, traducida al cliente. Cada plazo, antes de que se venza. Cada cuota, visible.
          </p>
        </div>

        <div className="flex gap-8 text-sm">
          <div>
            <p className="text-ambar font-mono text-2xl">127</p>
            <p className="text-marino-300">estudios activos</p>
          </div>
          <div>
            <p className="text-ambar font-mono text-2xl">8.4k</p>
            <p className="text-marino-300">casos gestionados</p>
          </div>
          <div>
            <p className="text-ambar font-mono text-2xl">98%</p>
            <p className="text-marino-300">puntualidad de plazos</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex items-center justify-center p-8 bg-hueso">
        <div className="w-full max-w-md">
          <h2 className="font-display text-3xl text-marino mb-2">Bienvenido de vuelta</h2>
          <p className="text-marino-400 mb-8">Ingresa con tu cuenta del estudio.</p>
          
          <LoginForm />
          
          <p className="text-center text-sm text-marino-400 mt-8">
            ¿Estudio nuevo?{' '}
            <a href="#" className="text-ambar hover:underline">
              Solicitar acceso
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
