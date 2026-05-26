import { useState, type FormEvent } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { publicLogin } from '../lib/adminApi';
import { SmallBloom } from '../../components/decorative/Botanical';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const setSession = useAuthStore((s) => s.setSession);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const from = (location.state as { from?: string } | null)?.from ?? '/admin';

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await publicLogin(username, password);
      setSession(response.accessToken, response.expiresInMs, response.user);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore inatteso');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        {/* Brand */}
        <div className="text-center mb-12">
          <SmallBloom className="w-10 h-10 mx-auto text-bloom-deep mb-6" />
          <div className="eyebrow mb-3">Pannello di gestione</div>
          <h1 className="font-display text-4xl text-ink">Bugnara<br />Borgo Fiorito</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-paper-soft border border-stone-deep/40 rounded-sm p-8 shadow-paper space-y-6">
          <div>
            <label htmlFor="username" className="block eyebrow mb-2">
              Nome utente
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
              autoComplete="username"
              className="w-full px-4 py-3 bg-paper border border-stone-deep/40 rounded-sm font-serif text-lg text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-bloom/30 transition-all"
            />
          </div>

          <div>
            <label htmlFor="password" className="block eyebrow mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 bg-paper border border-stone-deep/40 rounded-sm font-serif text-lg text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-bloom/30 transition-all"
            />
          </div>

          {error && (
            <div className="p-3 border border-red-700/40 bg-red-50 rounded-sm font-serif text-sm text-red-800">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink text-paper px-6 py-3.5 rounded-full font-sans text-sm font-medium tracking-wide hover:bg-bloom-deep transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Accesso in corso…' : 'Accedi al pannello'}
          </button>
        </form>

        <div className="text-center mt-8">
          <Link to="/" className="link-editorial font-sans text-xs uppercase tracking-eyebrow">
            ← Torna al sito pubblico
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
