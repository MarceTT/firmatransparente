'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Credenciales inválidas');
      }

      const data = await res.json();
      
      // Store token (in production, use httpOnly cookies)
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect based on role
      if (data.user.rol === 'SUPERVISOR') {
        router.push('/dashboard');
      } else {
        router.push('/casos');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-marino mb-2">
          Correo electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="roberto@tapiayasociados.cl"
          className="w-full px-4 py-3 border border-marino-200 rounded-lg focus:ring-2 focus:ring-ambar focus:border-ambar outline-none transition-colors"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="password" className="block text-sm font-medium text-marino">
            Contraseña
          </label>
          <a href="#" className="text-sm text-ambar hover:underline">
            ¿Olvidaste?
          </a>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="••••••••"
          className="w-full px-4 py-3 border border-marino-200 rounded-lg focus:ring-2 focus:ring-ambar focus:border-ambar outline-none transition-colors"
        />
      </div>

      <div className="flex items-center">
        <input
          id="remember"
          name="remember"
          type="checkbox"
          className="w-4 h-4 text-ambar border-marino-200 rounded focus:ring-ambar"
        />
        <label htmlFor="remember" className="ml-2 text-sm text-marino-400">
          Mantener sesión iniciada en este dispositivo
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-marino text-white font-semibold rounded-lg hover:bg-marino-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? 'Ingresando...' : 'Ingresar'}
        {!isLoading && <span>→</span>}
      </button>
    </form>
  );
}
