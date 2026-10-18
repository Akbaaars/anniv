import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { siteAccessEmail, supabase } from '../services/supabase.ts';

export const PasswordGate: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isConfigured = Boolean(supabase);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase || !password || isSubmitting) return;

    setIsSubmitting(true);
    setError('');
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: siteAccessEmail,
        password,
      });

      if (signInError) {
        setPassword('');
        setError('Password tidak cocok. Coba lagi.');
      }
    } catch {
      setPassword('');
      setError('Tidak dapat terhubung ke Supabase. Periksa koneksi lalu coba lagi.');
    } finally {
      setIsSubmitting(false);
    }

    setPassword('');
  };

  return (
    <main className="min-h-screen bg-[#F8F3EA] text-[#251C18] flex items-center justify-center px-5 py-10">
      <section className="w-full max-w-sm border-y border-[#E6DCCF] py-9">
        <img src="/heart-logo.svg" alt="" className="w-16 h-16 mb-5 object-contain" />
        <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#526E58]">Noy &amp; Poy</p>
        <h1 className="mt-1 font-serif text-3xl font-bold italic">Scrapbook pribadi</h1>
        <p className="mt-2 text-sm leading-relaxed text-[#68544A]">
          Masukkan password untuk membuka cerita kita.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-3">
          <label htmlFor="site-password" className="block text-xs font-semibold text-[#68544A]">
            Password
          </label>
          <input
            id="site-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={!isConfigured || isSubmitting}
            required
            className="w-full h-11 px-3 rounded-lg border border-[#D9CCBA] bg-white/80 text-sm outline-none focus:border-[#B93C34] focus:ring-2 focus:ring-[#B93C34]/15 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!isConfigured || isSubmitting || !password}
            className="w-full h-11 px-4 rounded-lg bg-[#251C18] text-[#FAF5EE] text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#3C2E29] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{isSubmitting ? 'Memeriksa...' : 'Masuk'}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
          {!isConfigured && (
            <p role="alert" className="text-xs leading-relaxed text-[#B93C34]">
              Supabase belum dikonfigurasi. Isi URL dan anon key Supabase di environment aplikasi.
            </p>
          )}
          {error && <p role="alert" className="text-xs text-[#B93C34]">{error}</p>}
        </form>
      </section>
    </main>
  );
};