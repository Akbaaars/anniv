import React, { useState, useEffect } from 'react';
import { ScreenView } from './types.ts';
import { AudioHeader } from './components/AudioHeader.tsx';
import { ScrapbookScreen } from './components/ScrapbookScreen.tsx';
import { SecretLetterScreen } from './components/SecretLetterScreen.tsx';
import { SwimmingFishLayer } from './components/SwimmingFishLayer.tsx';
import { PasswordGate } from './components/PasswordGate.tsx';
import { supabase } from './services/supabase.ts';

export default function App() {
  const [currentView, setCurrentView] = useState<ScreenView>('scrapbook');
  const [hasAccess, setHasAccess] = useState<boolean>(false);

  useEffect(() => {
    if (!supabase) return;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setHasAccess(Boolean(session));
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleNavigate = (view: ScreenView) => {
    setCurrentView(view);
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    window.scrollTo({ top: 0, behavior });
  };

  const isUnconfiguredLocalPreview = import.meta.env.DEV && !supabase;
  if (!hasAccess && !isUnconfiguredLocalPreview) return <PasswordGate />;

  return (
    <div className="min-h-screen bg-[#F8F3EA] text-[#251C18] flex flex-col relative selection:bg-[#B93C34]/20 selection:text-[#B93C34]">
      {/* Floating Crayon Doodle Fish Layer */}
      <SwimmingFishLayer />

      {/* Sticky Audio Player & Navigation Header */}
      <AudioHeader currentView={currentView} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main className="flex-1 w-full flex justify-center py-2 sm:py-6 px-0 sm:px-4 z-10">
        {currentView === 'scrapbook' ? (
          <ScrapbookScreen />
        ) : (
          <SecretLetterScreen />
        )}
      </main>
    </div>
  );
}
