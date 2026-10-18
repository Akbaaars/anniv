import React, { useRef, useState, useEffect } from 'react';
import { PolaroidChapter } from '../types.ts';
import { getHeartCount, incrementHeartCount } from '../services/storage.ts';

const CHAPTERS: PolaroidChapter[] = [
  {
    id: 'ch-1',
    chapterNumber: 'Chapter 01',
    dayLabel: 'DAY 01',
    date: '23/09/25',
    title: 'Kencan Pertama di Pameran Buku',
    description:
      '"First date kita di pameran buku jadi awal cerita Noy dan Poy. Dari obrolan buku, kita makin dekat lewat ikan dan kopi."',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAB0YogeX3EszaP4zgnL4X3y37P3c5HWIu1_yCwDFbMUtSP1jOtiodFESp-rm_HBW6kxtZelaWPTeggNQZG0A0fpabuN41j7t3wBC88_sgKuQFsIhIdOBFXdFCHg75AloTxbQYBhywZASBhlOmNOO4MxVp_Iu7ybT5FjMDz5gHTiFEqJReqEVcNdosX1ojN2jSewbagrHkEQhWcq24dDaK81OMfaZdtovJaLo_Xt-vWwY4OXt2Zaoz9HvkV8UoWvAjRqEE',
    emoji: '📚',
    rotateDeg: -2,
  },
  {
    id: 'ch-2',
    chapterNumber: 'Chapter 02',
    dayLabel: 'SWEET SPOT',
    date: 'Buku, Ikan & Kopi',
    title: 'Hal-Hal yang Bikin Kita Dekat',
    description:
      '"Obrolan tentang buku, melihat ikan, dan menikmati kopi jadi hal sederhana yang membuat Noy dan Poy semakin dekat."',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDWSJzYvILL0zahfCRfOibd4h5Kuv__tE9ku7n6JJ_tLTj2LDiYESTPCtGpiI6rvJJPYTkB-V_sXGKfyH_fYMCx__smAZXTmcTpv7t7o6Ad6Jdnw0I4ZBQL-OEIyFppI1kLj2yOFvo4Qjey0aO5PPF89a2Jbwey1Fk1ukjNfjeYNMZRDKLmgNwZVgjx_26a1ag0tNWUhoG8GoRuFQ6Pj4a6_Kp-jDcATUyYUSlJA49SICABucFOUkj-Mg',
    emoji: '📚',
    rotateDeg: 1.5,
  },
  {
    id: 'ch-3',
    chapterNumber: 'Chapter 03',
    dayLabel: 'OUR STORY',
    date: 'Sejak 23/09/25',
    title: 'Cerita Kita Terus Bertumbuh',
    description:
      '"Dari first date di pameran buku, cerita Noy dan Poy terus bertumbuh lewat buku, ikan, dan kopi."',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAB0YogeX3EszaP4zgnL4X3y37P3c5HWIu1_yCwDFbMUtSP1jOtiodFESp-rm_HBW6kxtZelaWPTeggNQZG0A0fpabuN41j7t3wBC88_sgKuQFsIhIdOBFXdFCHg75AloTxbQYBhywZASBhlOmNOO4MxVp_Iu7ybT5FjMDz5gHTiFEqJReqEVcNdosX1ojN2jSewbagrHkEQhWcq24dDaK81OMfaZdtovJaLo_Xt-vWwY4OXt2Zaoz9HvkV8UoWvAjRqEE',
    emoji: '🐟',
    rotateDeg: -1.5,
  },
];

export const ScrapbookScreen: React.FC = () => {
  const [heartCount, setHeartCount] = useState<number | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [heartFeedback, setHeartFeedback] = useState<string>('Sayang kamu bertambah +1! ❤️');
  const [isHeartUpdating, setIsHeartUpdating] = useState<boolean>(false);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const burstContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    void getHeartCount()
      .then((count) => {
        if (isMounted) setHeartCount(count);
      })
      .catch((error: unknown) => {
        if (isMounted) {
          setHeartFeedback(error instanceof Error ? error.message : 'Jumlah hati gagal dimuat.');
          setShowToast(true);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleHeartBurst = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isHeartUpdating) return;
    setIsHeartUpdating(true);
    try {
      const updated = await incrementHeartCount();
      setHeartCount(updated);
      setHeartFeedback('Sayang kamu bertambah +1! ❤️');
    } catch (error) {
      setHeartFeedback(error instanceof Error ? error.message : 'Jumlah hati gagal disimpan.');
    } finally {
      setIsHeartUpdating(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2200);
    }

    // Spawn emoji heart particles
    const container = burstContainerRef.current;
    if (!container) return;

    const emojis = ['❤️', '💖', '🍓', '✨', '💕', '🥰', '💌'];
    for (let i = 0; i < 9; i++) {
      const particle = document.createElement('span');
      particle.className = 'burst-particle text-base select-none';
      particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];

      const angle = Math.random() * 2 * Math.PI;
      const distance = 40 + Math.random() * 70;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance - 25;
      const tr = (Math.random() - 0.5) * 60;

      particle.style.setProperty('--tx', `${tx}px`);
      particle.style.setProperty('--ty', `${ty}px`);
      particle.style.setProperty('--tr', `${tr}deg`);
      particle.style.left = '50%';
      particle.style.top = '50%';

      container.appendChild(particle);
      setTimeout(() => particle.remove(), 1000);
    }
  };

  const handleCarouselScroll = (direction: 'prev' | 'next') => {
    if (!sliderRef.current) return;
    const scrollAmount = 290;
    sliderRef.current.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  const onSliderScroll = () => {
    if (!sliderRef.current) return;
    const index = Math.round(sliderRef.current.scrollLeft / 285);
    setActiveCarouselIndex(Math.min(Math.max(index, 0), CHAPTERS.length - 1));
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Central Scrapbook Page Container */}
      <div className="w-full max-w-[430px] sm:max-w-[480px] bg-[#FAF5EE] min-h-screen shadow-2xl border-x border-[#E9E1D2]/80 flex flex-col relative pb-16">
        {/* BEGIN: Hero Editorial Masthead */}
        <section className="relative pt-6 pb-4 px-5">

          {/* Scrapbook Tape Header Strip */}
          <div className="flex justify-center mb-3">
            <div className="washi-tape px-4 py-1 text-[11px] font-mono tracking-widest uppercase text-[#68544A] rotate-[-1deg] border border-[#d9ccba]/80">
              FIRST ANNIVERSARY • 20/20/25
            </div>
          </div>

          {/* Handwritten Subtitle & Main Editorial Title */}
          <div className="text-center relative">
            <h2 className="font-handwriting text-2xl text-[#B93C34] mb-0 font-bold -rotate-1 tracking-wide">
              Noy & Poy's Love Chronicle
            </h2>
            <h1 className="font-serif text-[38px] leading-[1.08] text-[#251C18] tracking-tight font-bold italic mt-0.5">
              A Tale of Two Hearts
            </h1>
            <p className="font-handwriting text-lg text-[#68544A] mt-1">
              "Satu tahun penuh cinta, kopi hangat, ikan & buku cerita kita"
            </p>
          </div>

          {/* Days Counter Pills Matrix */}
          <div className="mt-5 grid grid-cols-3 gap-2.5 bg-[#F2E8D7]/80 p-2.5 rounded-2xl border border-[#E5DAC8] shadow-inner text-center">
            <div className="py-2 px-1 bg-white/80 rounded-xl border border-white/60 shadow-sm">
              <span className="block text-[15px] font-bold font-serif text-[#251C18] leading-none">23/09/25</span>
              <span className="text-[9px] uppercase tracking-wider text-[#68544A] font-sans font-semibold">FIRST DATE</span>
            </div>
            <div className="py-2 px-1 bg-white/80 rounded-xl border border-white/60 shadow-sm">
              <span className="block text-xs font-bold font-serif text-[#B93C34] leading-none">PAMERAN BUKU</span>
              <span className="text-[9px] uppercase tracking-wider text-[#68544A] font-sans font-semibold">TEMPAT KENCAN</span>
            </div>
            <div className="py-2 px-1 bg-white/80 rounded-xl border border-white/60 shadow-sm">
              <span className="block text-[10px] font-bold font-serif text-[#526E58] leading-none">BUKU • IKAN • KOPI</span>
              <span className="text-[9px] uppercase tracking-wider text-[#68544A] font-sans font-semibold">CERITA KITA</span>
            </div>
          </div>
        </section>

        {/* BEGIN: Hero Visual & Verbatim Letter Section */}
        <section className="px-4 py-2">
          <div className="bg-[#FCF9F2] rounded-3xl p-5 shadow-sm border border-[#ECE0CE] relative">
            {/* Story Paragraph 1 */}
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B93C34] inline-block" />
                <span className="font-handwriting text-xl font-bold text-[#B93C34]">Dear Poy, My Sweetheart,</span>
              </div>
              <p className="font-serif text-[15px] leading-relaxed text-[#3C2E29] text-justify">
                "First date kita di pameran buku pada 23 September 2025 menjadi awal dari banyak cerita. Dari buku, ikan,
                dan kopi, kita menemukan semakin banyak alasan untuk dekat."
              </p>
            </div>

            {/* Collage Feature Photo Snapshot */}
            <div className="my-5 relative">
              {/* Washi Tape */}
              <div className="absolute -top-3 left-6 z-20 washi-tape w-24 h-5 rotate-[-3deg]" />

              {/* Photo Frame */}
              <div className="relative p-2 bg-white rounded-xl shadow-md border border-[#E4D8C3] transform rotate-[1deg] transition-transform hover:rotate-0">
                <div className="overflow-hidden rounded-lg relative aspect-[16/9] bg-stone-200">
                  <img
                    alt="A Tale of Two Hearts Snapshot Collage"
                    className="w-full h-full object-cover object-center filter saturate-[0.95] contrast-[1.02]"
                    loading="lazy"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB0YogeX3EszaP4zgnL4X3y37P3c5HWIu1_yCwDFbMUtSP1jOtiodFESp-rm_HBW6kxtZelaWPTeggNQZG0A0fpabuN41j7t3wBC88_sgKuQFsIhIdOBFXdFCHg75AloTxbQYBhywZASBhlOmNOO4MxVp_Iu7ybT5FjMDz5gHTiFEqJReqEVcNdosX1ojN2jSewbagrHkEQhWcq24dDaK81OMfaZdtovJaLo_Xt-vWwY4OXt2Zaoz9HvkV8UoWvAjRqEE"
                  />
                  <div className="absolute inset-0 bg-amber-950/5 pointer-events-none mix-blend-color" />
                </div>

                {/* Romantic Tag Pill & Lover Badge */}
                <div className="flex items-center justify-between mt-2.5 px-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#526E58] text-white text-[11px] font-sans font-medium tracking-wide shadow-xs">
                    <span>☕ 🐟 📚 Noy & Poy</span>
                  </div>
                  <div className="px-2.5 py-0.5 bg-[#E5C5C2]/90 text-[#932922] text-[10px] uppercase font-black tracking-widest rounded rotate-[-2deg] border border-[#B93C34]/20 shadow-xs">
                    OUR STORY 🍓
                  </div>
                </div>
              </div>

              {/* Floating Stamp Card Overlap */}
              <div className="absolute -bottom-5 right-2 z-20 w-32 bg-white p-1.5 rounded shadow-md border border-[#251C18]/15 rotate-[4deg]">
                <div className="stamp-border">
                  <div className="aspect-square bg-[#E8E2D5] rounded flex items-center justify-center overflow-hidden relative">
                    <div className="font-handwriting text-xs text-center text-[#68544A] leading-tight p-1 font-semibold">
                      "I love you more than words can say"
                    </div>
                  </div>
                  <div className="text-[10px] font-handwriting text-center text-[#B93C34] font-bold mt-1">
                    Noy & Poy ♥
                  </div>
                </div>
              </div>
            </div>

            {/* Story Paragraph 2 */}
            <div className="mt-8 pt-3 relative z-10">
              <p className="font-serif text-[15px] leading-relaxed text-[#3C2E29] text-justify">
                "Aku bersyukur pada setiap obrolan tentang buku, setiap kali kita mengamati ikan, dan setiap kopi yang kita
                nikmati bersama. Hal-hal sederhana itu selalu mengingatkanku betapa berartinya kamu."
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-[#EDE3D4] pt-3">
                <span className="font-handwriting text-base text-[#526E58] font-bold">Selamanya bersamamu, Poy,</span>
                <div className="font-handwriting text-xl text-[#B93C34] font-bold rotate-[-3deg]">Yours, Always Noy ✨</div>
              </div>
            </div>
          </div>
        </section>

        {/* BEGIN: Interactive Polaroid Memory Carousel */}
        <section className="mt-8 relative">
          <div className="px-5 mb-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#B93C34] font-sans">
                Chapter by Chapter
              </span>
              <h3 className="font-serif text-2xl font-bold italic text-[#251C18]">Galeri Kenangan Kita</h3>
            </div>
            {/* Carousel Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleCarouselScroll('prev')}
                aria-label="Previous memory slide"
                className="w-8 h-8 rounded-full border border-[#251C18]/20 bg-[#F2E8D7] flex items-center justify-center text-[#251C18] hover:bg-[#251C18] hover:text-white transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </button>
              <button
                onClick={() => handleCarouselScroll('next')}
                aria-label="Next memory slide"
                className="w-8 h-8 rounded-full border border-[#251C18]/20 bg-[#F2E8D7] flex items-center justify-center text-[#251C18] hover:bg-[#251C18] hover:text-white transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </button>
            </div>
          </div>

          {/* Snap-scrollable Polaroid Strip */}
          <div
            ref={sliderRef}
            onScroll={onSliderScroll}
            className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory px-5 py-3 scroll-smooth"
          >
            {CHAPTERS.map((ch, idx) => (
              <article
                key={ch.id}
                className="shrink-0 w-[275px] snap-center bg-white p-3 pb-4 rounded-xl shadow-md border border-[#E7DDCD] transform transition-all duration-300"
                style={{ transform: `rotate(${ch.rotateDeg}deg)` }}
              >
                <div className="relative bg-stone-100 rounded-lg overflow-hidden border border-stone-200 aspect-[4/3] flex items-center justify-center">
                  <img alt={ch.title} className="w-full h-full object-cover" src={ch.image} />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[9px] font-mono text-white">
                    {ch.dayLabel}
                  </div>
                  <div className="absolute bottom-2 right-2 text-xl drop-shadow">{ch.emoji}</div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#526E58]">
                      {ch.chapterNumber}
                    </span>
                    <span className="text-[10px] font-mono text-[#68544A]">{ch.date}</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#251C18] leading-snug mt-0.5">{ch.title}</h4>
                  <p className="font-handwriting text-base text-[#68544A] mt-1 leading-tight">{ch.description}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center items-center gap-1.5 mt-2">
            {CHAPTERS.map((_, idx) => (
              <span
                key={idx}
                className={`transition-all rounded-full ${
                  idx === activeCarouselIndex ? 'w-5 h-1.5 bg-[#B93C34]' : 'w-1.5 h-1.5 bg-[#251C18]/20'
                }`}
              />
            ))}
          </div>
        </section>


        {/* BEGIN: Milestone Timeline */}
        <section className="px-5 mt-10">
          <div className="text-center mb-7">
            <div className="inline-block mb-1">
              <span className="px-3 py-0.5 rounded-full bg-[#EFE3D0] text-[#7A5B46] text-[10px] font-mono uppercase tracking-widest font-semibold border border-[#DECEB7]">
                Jejak Langkah Cinta • Noy & Poy
              </span>
            </div>
            <h3 className="font-serif text-3xl font-bold italic text-[#251C18]">Milestone Perjalanan Kita</h3>
            <p className="font-handwriting text-base text-[#8B5E43] mt-0.5">
              "Dari pameran buku, cerita kita tumbuh lewat ikan dan kopi"
            </p>
          </div>

          <div className="relative pl-7 space-y-6 before:content-[''] before:absolute before:left-3 before:top-3 before:bottom-3 before:w-[2px] before:border-l-2 before:border-dashed before:border-[#B93C34]/30">
            {/* Node 1: First Date */}
            <div className="relative group">
              <span className="absolute -left-[33px] top-2 w-6 h-6 rounded-full bg-[#FCEAE8] border-2 border-[#B93C34] shadow-xs flex items-center justify-center text-xs text-[#B93C34] group-hover:scale-110 transition-transform">
                🌸
              </span>
              <div className="bg-white/95 p-4 rounded-2xl border border-[#F4D9D4] shadow-xs hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FCEAE8] text-[10px] font-mono text-[#B93C34] font-bold tracking-wider border border-[#F4CCD0]">
                    23/09/25 • FIRST DATE
                  </span>
                  <span className="text-[10px] font-sans font-medium text-[#B93C34] bg-rose-50 px-2 py-0.5 rounded-md">
                    Pameran Buku 📚
                  </span>
                </div>
                <h4 className="font-serif text-lg font-bold text-[#251C18]">First Date Noy & Poy 📚</h4>
                <div className="font-handwriting text-sm text-[#B93C34] font-semibold mt-0.5">
                  "Dari satu pameran buku, cerita kita dimulai..."
                </div>
                <p className="text-xs text-[#5C4A42] mt-1.5 font-sans leading-relaxed">
                  First date Noy dan Poy di pameran buku menjadi awal cerita yang tumbuh lewat buku, ikan, dan kopi.
                </p>
              </div>
            </div>

            {/* Node 2: Shared interests */}
            <div className="relative group">
              <span className="absolute -left-[33px] top-2 w-6 h-6 rounded-full bg-[#EEF5F0] border-2 border-[#526E58] shadow-xs flex items-center justify-center text-xs text-[#526E58] group-hover:scale-110 transition-transform">
                🌿
              </span>
              <div className="bg-white/95 p-4 rounded-2xl border border-[#D7E8DC] shadow-xs hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#EDF4EE] text-[10px] font-mono text-[#4A6B52] font-bold tracking-wider border border-[#CCE2D2]">
                    CERITA KITA • BUKU FAVORIT
                  </span>
                  <span className="text-[10px] font-sans font-medium text-[#4A6B52] bg-emerald-50 px-2 py-0.5 rounded-md">
                    Obrolan Noy & Poy 📚
                  </span>
                </div>
                <h4 className="font-serif text-lg font-bold text-[#251C18]">Dekat Karena Buku</h4>
                <div className="font-handwriting text-sm text-[#4A6B52] font-semibold mt-0.5">
                  "Dari halaman buku, obrolan kita terus berlanjut..."
                </div>
                <p className="text-xs text-[#5C4A42] mt-1.5 font-sans leading-relaxed">
                  Buku menjadi awal obrolan yang membuka jalan untuk mengenal satu sama lain lebih dekat.
                </p>
              </div>
            </div>

            {/* Node 3: Books, fish, and coffee */}
            <div className="relative group">
              <span className="absolute -left-[33px] top-2 w-6 h-6 rounded-full bg-[#F7EFE8] border-2 border-[#8C5E3B] shadow-xs flex items-center justify-center text-xs text-[#8C5E3B] group-hover:scale-110 transition-transform">
                ☕
              </span>
              <div className="bg-white/95 p-4 rounded-2xl border border-[#E8D7C7] shadow-xs hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#F7EFE8] text-[10px] font-mono text-[#8C5E3B] font-bold tracking-wider border border-[#DEC4AF]">
                    BUKU • IKAN • KOPI
                  </span>
                  <span className="text-xs">☕ 🐟 📚</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-[#251C18]">Buku, Ikan & Kopi</h4>
                <div className="font-handwriting text-sm text-[#8C5E3B] font-semibold mt-0.5">
                  "Awal mula rasa yang tumbuh perlahan tapi pasti..."
                </div>
                <p className="text-xs text-[#5C4A42] mt-1.5 font-sans leading-relaxed">
                  Dari obrolan buku, melihat ikan, hingga menikmati kopi bersama, hal-hal sederhana itu membuat Noy dan Poy semakin dekat.
                </p>
              </div>
            </div>

            {/* Node 4: Growing closer */}
            <div className="relative group">
              <span className="absolute -left-[33px] top-2 w-6 h-6 rounded-full bg-[#FAEBEC] border-2 border-[#B93C34] shadow-xs flex items-center justify-center text-xs text-[#B93C34] group-hover:scale-110 transition-transform">
                💌
              </span>
              <div className="bg-white/95 p-4 rounded-2xl border border-[#F3CDD1] shadow-xs hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FAEBEC] text-[10px] font-mono text-[#B93C34] font-bold tracking-wider border border-[#F0B8BF]">
                    OUR STORY • NOY & POY
                  </span>
                  <span className="text-[10px] font-sans font-medium text-[#B93C34] bg-rose-50 px-2 py-0.5 rounded-md">
                    Cerita yang Terus Tumbuh 💕
                  </span>
                </div>
                <h4 className="font-serif text-lg font-bold text-[#251C18]">Makin Dekat Setiap Hari 💌</h4>
                <div className="font-handwriting text-sm text-[#B93C34] font-semibold mt-0.5">
                  "Setiap obrolan menjadi halaman baru dalam cerita kita..."
                </div>
                <p className="text-xs text-[#5C4A42] mt-1.5 font-sans leading-relaxed">
                  Setiap kenangan bersama membuat cerita Noy dan Poy terus bertumbuh, satu halaman demi satu halaman.
                </p>
              </div>
            </div>

            {/* Node 5: The next chapter */}
            <div className="relative group">
              <span className="absolute -left-[33px] top-2 w-6 h-6 rounded-full bg-[#FFF8EB] border-2 border-[#B87A1E] shadow-xs flex items-center justify-center text-xs text-[#B87A1E] group-hover:scale-110 transition-transform">
                🥂
              </span>
              <div className="bg-gradient-to-br from-white via-[#FCFAF5] to-[#FBF4E7] p-4 rounded-2xl border-2 border-[#EEDBBA] shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FEF8EC] text-[10px] font-mono text-[#B87A1E] font-bold tracking-wider border border-[#F4DCB4]">
                    NEXT CHAPTER • NOY & POY
                  </span>
                  <span className="text-[10px] font-sans font-bold text-[#B87A1E] bg-amber-100/70 px-2 py-0.5 rounded-md">
                    Cerita Kita Berlanjut ✨
                  </span>
                </div>
                <h4 className="font-serif text-xl font-bold text-[#251C18]">Bab Berikutnya Menanti 🥂</h4>
                <div className="font-handwriting text-base text-[#B87A1E] font-bold mt-0.5">
                  "Setiap hari, satu halaman baru dalam cerita kita..."
                </div>
                <p className="text-xs text-[#5C4A42] mt-1.5 font-sans leading-relaxed">
                  Cerita Noy dan Poy terus berlanjut. Semoga masih banyak halaman indah yang bisa kita tulis bersama.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BEGIN: Interactive Heart Burst Button */}
        <section className="px-5 mt-10 text-center">
          <div className="bg-gradient-to-b from-white/90 to-[#F2E8D7]/90 rounded-3xl p-6 border border-[#E8DDCD] shadow-sm relative overflow-hidden">
            <h3 className="font-serif text-2xl font-bold italic text-[#251C18]">Kirim Peluk & Cinta</h3>
            <p className="text-xs text-[#68544A] font-sans mt-1 max-w-[260px] mx-auto">
              Ketuk tombol hati ini sebanyak-banyaknya untuk menghujani harimu dengan cinta!
            </p>
            {/* Heart Counter & Burst Trigger */}
            <div className="mt-5 relative inline-block">
              <div ref={burstContainerRef} className="absolute inset-0 pointer-events-none" />
              <button
                onClick={handleHeartBurst}
                disabled={isHeartUpdating}
                className="relative group px-6 py-3.5 bg-[#B93C34] hover:bg-[#932922] active:scale-95 text-white rounded-full font-sans font-semibold text-sm shadow-md transition-all flex items-center gap-2.5 mx-auto cursor-pointer"
                type="button"
              >
                <svg className="w-5 h-5 text-[#FAF5EE] fill-current animate-pulse" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span>I Love You!</span>
                <span className="ml-1 px-2 py-0.5 rounded-full bg-white/20 text-xs font-mono font-bold">
                  {heartCount ?? '...'}
                </span>
              </button>
            </div>
            <div
              className={`h-5 mt-2 font-handwriting text-sm text-[#B93C34] font-bold transition-opacity duration-300 ${
                showToast ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {heartFeedback}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-8 border-t border-[#E8DEC9] bg-[#F7F0E3] px-6 py-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-xl">🍓</span>
            <span className="font-handwriting text-xl font-bold text-[#251C18]">A Tale of Two Hearts</span>
            <span className="text-xl">🍓</span>
          </div>
          <p className="text-[11px] font-sans text-[#68544A]">
            Dibuat dengan cinta untuk mengenang first date di pameran buku dan cerita kita yang terus bertumbuh.
          </p>
          <div className="mt-3 text-[9px] font-mono tracking-widest uppercase text-[#251C18]/40">
            OFFICIAL DAY • 20/20/25
          </div>
        </footer>
      </div>
    </div>
  );
};
