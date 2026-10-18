import React, { useEffect, useState } from 'react';
import { SkipBack, SkipForward } from 'lucide-react';
import { audioEngine } from '../services/audioEngine.ts';
import { ScreenView } from '../types.ts';

interface AudioHeaderProps {
  currentView: ScreenView;
  onNavigate: (view: ScreenView) => void;
}

export const AudioHeader: React.FC<AudioHeaderProps> = ({ currentView, onNavigate }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [tracks, setTracks] = useState<{ title: string; artist?: string; src: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = audioEngine.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setTracks(state.tracks);
      setCurrentIndex(state.currentIndex);
      setHasError(state.hasError);
    });
    void audioEngine.loadPlaylist();
    return unsubscribe;
  }, []);

  const handleToggle = () => void audioEngine.toggle();
  const currentTrack = tracks[currentIndex];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF5EE]/95 backdrop-blur-md border-b border-[#E6DCCF] px-4 py-2.5 shadow-sm">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        {/* Navigation tabs */}
        <div className="flex items-center gap-0.5 bg-[#EFE4D2]/90 p-0.5 rounded-full border border-[#DFD1BD] shrink-0 shadow-xs">
          <button
            onClick={() => onNavigate('scrapbook')}
            className={`px-2 py-0.5 rounded-full text-[10px] font-medium tracking-tight whitespace-nowrap transition-all cursor-pointer ${
              currentView === 'scrapbook'
                ? 'bg-white text-[#B93C34] shadow-xs font-semibold'
                : 'text-[#68544A] hover:text-[#251C18]'
            }`}
          >
            📖 Scrapbook
          </button>
          <button
            onClick={() => onNavigate('letter')}
            className={`px-2 py-0.5 rounded-full text-[10px] font-medium tracking-tight whitespace-nowrap transition-all cursor-pointer ${
              currentView === 'letter'
                ? 'bg-white text-[#B93C34] shadow-xs font-semibold'
                : 'text-[#68544A] hover:text-[#251C18]'
            }`}
          >
            💌 Surat Rahasia
          </button>
        </div>

        {/* Music controls */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Animated visualizer bars */}
          <div
            className={`flex items-end gap-[2.5px] h-4.5 px-1 transition-opacity ${
              isPlaying ? 'opacity-100' : 'opacity-25'
            }`}
          >
            <span
              className="w-[2.5px] bg-[#B93C34] rounded-full bar-anim-1 h-2"
              style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
            />
            <span
              className="w-[2.5px] bg-[#B93C34] rounded-full bar-anim-2 h-3.5"
              style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
            />
            <span
              className="w-[2.5px] bg-[#B93C34] rounded-full bar-anim-3 h-1.5"
              style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
            />
            <span
              className="w-[2.5px] bg-[#B93C34] rounded-full bar-anim-4 h-3"
              style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
            />
          </div>

          <button
            onClick={() => void audioEngine.skip('previous')}
            aria-label="Previous track"
            title="Previous track"
            disabled={tracks.length === 0}
            className="w-8 h-8 rounded-full text-[#251C18] flex items-center justify-center hover:bg-[#EFE4D2] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={handleToggle}
            aria-label={hasError ? 'Music file error' : isPlaying ? 'Pause music' : 'Play music'}
            title={hasError ? 'Music file error' : isPlaying ? 'Pause music' : 'Play music'}
            disabled={tracks.length === 0}
            className="w-8 h-8 rounded-full bg-[#251C18] text-[#FAF5EE] flex items-center justify-center active:scale-90 transition-transform shadow hover:bg-[#3C2E29] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {isPlaying ? (
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button
            onClick={() => void audioEngine.skip('next')}
            aria-label="Next track"
            title="Next track"
            disabled={tracks.length === 0}
            className="w-8 h-8 rounded-full text-[#251C18] flex items-center justify-center hover:bg-[#EFE4D2] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Current track title */}
      <div className="max-w-4xl mx-auto mt-1.5 pt-1.5 border-t border-dashed border-[#DFD3C3] flex justify-end items-center px-0.5">
        <div className="inline-flex items-center gap-1.5 font-serif italic text-xs font-bold text-[#B93C34] tracking-wide">
          <span className="relative flex h-2 w-2 items-center justify-center">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B93C34] ${
                isPlaying ? 'opacity-75' : 'opacity-0'
              }`}
            />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#B93C34]" />
          </span>
          <span className="max-w-[42vw] truncate sm:max-w-[320px]" title={currentTrack?.title}>
            {currentTrack?.title ?? 'Belum ada lagu'}
          </span>
        </div>
      </div>
    </header>
  );
};
