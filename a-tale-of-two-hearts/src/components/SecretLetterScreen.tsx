import React, { useState, useEffect } from 'react';
import { LoveNote } from '../types.ts';
import {
  getLoveNotes,
  saveLoveNote,
  incrementNoteLike,
} from '../services/storage.ts';

export const SecretLetterScreen: React.FC = () => {
  const [notes, setNotes] = useState<LoveNote[]>([]);
  const [message, setMessage] = useState<string>('');
  const [sender, setSender] = useState<'Noy' | 'Poy'>('Noy');
  const [isLetterOpen, setIsLetterOpen] = useState<boolean>(true);
  const [newlyAddedId, setNewlyAddedId] = useState<string | null>(null);
  const [isLoadingNotes, setIsLoadingNotes] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [notesError, setNotesError] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    void getLoveNotes()
      .then((loadedNotes) => {
        if (isMounted) setNotes(loadedNotes);
      })
      .catch((error: unknown) => {
        if (isMounted) setNotesError(error instanceof Error ? error.message : 'Pesan gagal dimuat.');
      })
      .finally(() => {
        if (isMounted) setIsLoadingNotes(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setNotesError('');
    try {
      const saved = await saveLoveNote({
        authorName: sender === 'Noy' ? 'Noy ♥ (Untuk Poy)' : 'Poy ♥ (Untuk Noy)',
        message: message.trim(),
      });

      setNotes((prev) => [saved, ...prev]);
      setNewlyAddedId(saved.id);
      setMessage('');
    } catch (error) {
      setNotesError(error instanceof Error ? error.message : 'Pesan gagal disimpan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (id: string) => {
    setNotesError('');
    try {
      const newLikes = await incrementNoteLike(id);
      setNotes((prev) => prev.map((note) => (note.id === id ? { ...note, likes: newLikes } : note)));
    } catch (error) {
      setNotesError(error instanceof Error ? error.message : 'Like gagal disimpan.');
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Central Screen Frame */}
      <div className="w-full max-w-[430px] sm:max-w-[480px] bg-[#FAF7F2] min-h-screen shadow-2xl border-x border-[#EDE5D8] flex flex-col relative pb-16">


        <section className="px-5 pt-5 pb-4 text-center relative">
          <div className="inline-block relative mb-3">
            <div className="washi-tape px-4 py-1 text-[11px] uppercase tracking-widest font-semibold text-[#68544A] rotate-[-1deg] border border-[#d9ccba]/80 font-mono">
              FIRST ANNIVERSARY • 20/20/25
            </div>
          </div>

          <p className="font-handwriting text-2xl text-[#B93C34] -mb-1 font-bold">Noy & Poy's Love Chronicle</p>
          <h1 className="font-serif italic font-bold text-3xl tracking-tight text-[#251C18]">A Tale of Two Hearts</h1>
          <p className="font-handwriting text-base text-[#68544A] mt-1">
            "Cerita kita bermula dari buku, ikan & kopi"
          </p>

          {/* First date details */}
          <div className="grid grid-cols-3 gap-2 mt-4 px-2">
            <div className="bg-white/80 rounded-xl p-2 border border-[#EADFCB] shadow-xs">
              <div className="font-serif text-sm font-bold text-[#251C18]">23/09/25</div>
              <div className="text-[9px] uppercase tracking-wider text-[#68544A]">FIRST DATE</div>
            </div>
            <div className="bg-white/80 rounded-xl p-2 border border-[#EADFCB] shadow-xs">
              <div className="font-serif text-xs font-bold text-[#B93C34]">PAMERAN BUKU</div>
              <div className="text-[9px] uppercase tracking-wider text-[#68544A]">TEMPAT KENCAN</div>
            </div>
            <div className="bg-white/80 rounded-xl p-2 border border-[#EADFCB] shadow-xs">
              <div className="font-serif text-[10px] font-bold text-[#526E58]">BUKU • IKAN • KOPI</div>
              <div className="text-[9px] uppercase tracking-wider text-[#68544A]">CERITA KITA</div>
            </div>
          </div>
        </section>

        {/* BEGIN: Secret Envelope Hero Section */}
        <section className="px-4 py-3">
          <div className="bg-[#EBDCC8]/40 border border-[#DFCEB9] rounded-2xl p-4 shadow-xs relative overflow-hidden">
            {/* Airmail Ribbon Pattern Top */}
            <div className="h-1.5 w-full airmail-ribbon rounded mb-3" />

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs">💌</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#68544A]">
                  TOP SECRET • NOY UNTUK POY
                </span>
              </div>
              <div className="bg-white border-2 border-[#B93C34] px-2 py-0.5 rounded text-[9px] font-mono tracking-tighter text-[#B93C34] font-bold rotate-2 shadow-xs">
                OUR STORY ✈ NOY + POY
              </div>
            </div>

            <h2 className="font-serif text-xl font-bold text-[#251C18]">Surat Rahasia untuk Poy</h2>
            <p className="text-xs text-[#68544A] mb-4">
              Ketuk segel lilin merah di bawah untuk membuka surat cinta penuh kita.
            </p>

            {/* Wax Seal Toggle Button */}
            <div className="flex flex-col items-center justify-center my-2">
              <button
                onClick={() => setIsLetterOpen(!isLetterOpen)}
                className="group relative flex flex-col items-center focus:outline-none transition-transform active:scale-95 cursor-pointer"
                type="button"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C84242] to-[#7F1D1D] flex items-center justify-center shadow-lg border-2 border-[#FF9E9E]/30 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-13 h-13 rounded-full border border-[#F08585]/40 flex flex-col items-center justify-center text-white">
                    <span className="font-serif italic font-bold text-sm leading-none">N &amp; P</span>
                    <span className="text-[7px] uppercase tracking-wider text-rose-200">Always</span>
                  </div>
                </div>
                <span className="mt-2 text-xs font-handwriting text-[#B93C34] font-bold tracking-wide italic group-hover:underline">
                  {isLetterOpen ? '[ Lipat Kembali Surat Cinta 🕊️ ]' : '[ Buka & Baca Surat Segel 💌 ]'}
                </span>
              </button>
            </div>

            {/* Unfolded Letter Sheet */}
            {isLetterOpen && (
              <article className="transition-all duration-500 ease-in-out mt-3 bg-[#FDFBF7] rounded-xl border border-[#E5D8C3] shadow-md relative overflow-hidden">
                <div className="washi-tape w-24 h-4 mx-auto -mt-2 rotate-[-1deg] border border-amber-900/10 rounded-sm" />
                <div className="p-5">
                  {/* Salutation */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B93C34] inline-block" />
                    <h3 className="font-handwriting text-2xl font-bold text-[#B93C34]">Dear Poy, My Sweetheart,</h3>
                  </div>

                  {/* Letter Body Text */}
                  <div className="text-[13px] leading-relaxed text-[#3B342E] font-serif space-y-3 text-justify">
                    <p>
                      Cerita kita dimulai di pameran buku. Dari sana, obrolan tentang buku membawa kita lebih dekat,
                      lalu ikan dan kopi menjadi bagian dari banyak kenangan yang kusayangi.
                    </p>
                    <p>
                      First date kita di pameran buku pada <strong>23/09/25</strong> menjadi awal dari cerita yang terus
                      bertumbuh. Kedekatan kita hadir lewat obrolan tentang buku, melihat ikan, dan menikmati kopi
                      bersama—hal-hal sederhana yang selalu punya cerita kalau kita jalani berdua.
                    </p>
                    <p>
                      Terima kasih sudah menjadi bagian paling berharga dalam cerita Noy. Kamu bukan hanya pasangan,
                      tapi juga teman berbagi obrolan, buku, ikan, dan kopi. Bersamamu, hal-hal sederhana terasa istimewa.
                    </p>
                  </div>

                  {/* Embedded Polaroid Photo Collage */}
                  <figure className="my-5 p-2 bg-white rounded-lg shadow-md border border-[#E8DED1] rotate-[1deg]">
                    <img
                      alt="A Tale of Two Hearts scrapbook memories"
                      className="w-full h-auto rounded border border-gray-100 object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWSJzYvILL0zahfCRfOibd4h5Kuv__tE9ku7n6JJ_tLTj2LDiYESTPCtGpiI6rvJJPYTkB-V_sXGKfyH_fYMCx__smAZXTmcTpv7t7o6Ad6Jdnw0I4ZBQL-OEIyFppI1kLj2yOFvo4Qjey0aO5PPF89a2Jbwey1Fk1ukjNfjeYNMZRDKLmgNwZVgjx_26a1ag0tNWUhoG8GoRuFQ6Pj4a6_Kp-jDcATUyYUSlJA49SICABucFOUkj-Mg"
                    />
                    <figcaption className="font-handwriting text-center text-sm text-[#68544A] mt-2">
                      "Noy & Poy • First Date 23/09/25"
                    </figcaption>
                  </figure>

                  {/* Letter Sign-off */}
                  <div className="flex justify-between items-end pt-3 border-t border-dashed border-[#E6D8C4]">
                    <span className="font-handwriting text-base text-[#68544A] italic">Selamanya bersamamu, Poy ♥</span>
                    <span className="font-handwriting font-bold text-xl text-[#B93C34] tracking-wide">
                      Yours, Always Noy ✨
                    </span>
                  </div>
                </div>
              </article>
            )}
          </div>
        </section>


        {/* BEGIN: Interactive Reply / Love Notes Section */}
        <section className="px-4 py-5">
          <div className="text-center mb-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#B93C34]">TULISKAN PERASAANMU</span>
            <h2 className="font-serif italic font-bold text-2xl text-[#251C18]">Beri Balasan Cinta</h2>
            <p className="text-xs text-[#68544A] font-handwriting text-base">
              Tinggalkan pesan manis, reaksi, atau janji kecil untuk kita 💌
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-[#FCFAF7] border border-[#DFD2BE] rounded-2xl p-4 shadow-xs mb-6">
            <form onSubmit={handleFormSubmit} className="space-y-3">
              {/* Sender Selector */}
              <div>
                <label className="block text-[11px] font-semibold text-[#68544A] uppercase tracking-wider mb-1.5">
                  Pengirim Pesan
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSender('Noy')}
                    className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                      sender === 'Noy'
                        ? 'bg-[#FCEAE8] text-[#B93C34] border-[#F4CCD0] shadow-xs'
                        : 'bg-white/80 text-[#68544A] border-[#D9CCBA] hover:bg-stone-50'
                    }`}
                  >
                    <span>🌸 Noy</span>
                    <span className="text-[10px] font-normal opacity-75">(Untuk Poy)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSender('Poy')}
                    className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                      sender === 'Poy'
                        ? 'bg-[#EEF5F0] text-[#4A6B52] border-[#CCE2D2] shadow-xs'
                        : 'bg-white/80 text-[#68544A] border-[#D9CCBA] hover:bg-stone-50'
                    }`}
                  >
                    <span>🌿 Poy</span>
                    <span className="text-[10px] font-normal opacity-75">(Untuk Noy)</span>
                  </button>
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-[11px] font-semibold text-[#68544A] uppercase tracking-wider mb-1">
                  Pesan Rahasiamu
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    sender === 'Noy'
                      ? 'Tulis pesan cinta balasan untuk Poy sayang...'
                      : 'Tulis balasan manis penuh cinta untuk Noy sayang...'
                  }
                  className="w-full text-xs rounded-xl border border-[#D9CCBA] bg-white/90 focus:border-[#B93C34] focus:ring-1 focus:ring-[#B93C34] text-[#251C18] p-3 leading-relaxed outline-none resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-[#B93C34] to-[#932922] text-white font-medium text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-60 disabled:cursor-wait cursor-pointer"
              >
                <span>{isSubmitting ? 'Menyimpan...' : 'Kirim Balasan Cinta'}</span>
                <span className="text-sm">💌</span>
              </button>
              {notesError && <p role="alert" className="text-xs text-[#B93C34]">{notesError}</p>}
            </form>
          </div>

          {/* Stored Messages Feed */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#68544A]">
                Surat Balasan Tersimpan ({notes.length})
              </span>
              <span className="text-[10px] text-[#68544A] italic">Tersimpan di Supabase</span>
            </div>

            {isLoadingNotes && <p className="text-xs text-[#68544A]">Memuat pesan...</p>}
            {!isLoadingNotes && notes.length === 0 && !notesError && (
              <p className="text-xs text-[#68544A]">Belum ada pesan. Tulis balasan pertama kalian.</p>
            )}

            {notes.map((note) => {
              const displayName = note.authorName || 'Untukmu ♥';
              const firstInitial = displayName.charAt(0).toUpperCase();
              const isNewlyAdded = note.id === newlyAddedId;

              return (
                <article
                  key={note.id}
                  className={`bg-white rounded-xl p-3.5 border border-[#EBDCCB] shadow-xs relative transition-all duration-300 ${
                    isNewlyAdded ? 'ring-2 ring-[#B93C34]/40 scale-[1.01]' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#FBEAE5] border border-[#B93C34]/20 flex items-center justify-center text-xs font-bold text-[#B93C34]">
                        {firstInitial}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#251C18] leading-tight">{displayName}</p>
                        <p className="text-[10px] text-[#68544A]">{note.timestamp}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#251C18] font-serif italic mt-2.5 leading-relaxed">
                    "{note.message}"
                  </p>

                  <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                    <span className="text-[#68544A] text-[10px] font-handwriting text-sm">
                      {note.isPinned ? 'Disematkan di hati' : 'Tersimpan di scrapbook'}
                    </span>
                    <button
                      onClick={() => void handleLike(note.id)}
                      className="flex items-center gap-1 text-[#B93C34] font-medium hover:scale-105 transition-transform active:scale-90 cursor-pointer"
                    >
                      <span>❤️</span>
                      <span className="font-mono text-xs">{note.likes}</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>


        </section>

        {/* Footer */}
        <footer className="mt-6 px-6 pt-6 pb-8 border-t border-[#EBD8C5] bg-[#F7F2EA] text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-base">🍓</span>
            <h5 className="font-serif italic font-bold text-sm tracking-wide text-[#251C18]">A Tale of Two Hearts</h5>
            <span className="text-base">🍓</span>
          </div>
          <p className="text-[11px] text-[#68544A] leading-relaxed">
            Dibuat dengan cinta untuk mengenang first date di pameran buku dan cerita kita yang terus bertumbuh.
          </p>
          <div className="mt-3 pt-3 border-t border-dashed border-[#E5D5BF] text-[10px] font-mono text-[#68544A] uppercase tracking-widest">
            OFFICIAL DAY • 20/20/25
          </div>
        </footer>
      </div>
    </div>
  );
};
