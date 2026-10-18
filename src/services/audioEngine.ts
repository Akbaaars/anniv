export interface AudioTrack {
  title: string;
  artist?: string;
  src: string;
}

export interface AudioPlayerState {
  isPlaying: boolean;
  currentIndex: number;
  tracks: AudioTrack[];
  hasError: boolean;
}

class AudioEngine {
  private audio: HTMLAudioElement | null = null;
  private state: AudioPlayerState = {
    isPlaying: false,
    currentIndex: 0,
    tracks: [],
    hasError: false,
  };
  private listeners: ((state: AudioPlayerState) => void)[] = [];

  private getAudio() {
    if (!this.audio) {
      this.audio = new Audio();
      this.audio.addEventListener('play', () => this.update({ isPlaying: true, hasError: false }));
      this.audio.addEventListener('pause', () => this.update({ isPlaying: false }));
      this.audio.addEventListener('ended', () => this.playNext());
      this.audio.addEventListener('error', () => this.update({ isPlaying: false, hasError: true }));
    }
    return this.audio;
  }

  public async loadPlaylist() {
    try {
      const response = await fetch('/music/playlist.json');
      if (!response.ok) throw new Error('Playlist could not be loaded');

      const playlist: unknown = await response.json();
      if (!Array.isArray(playlist)) throw new Error('Invalid playlist');

      const tracks = playlist.filter(
        (track): track is AudioTrack =>
          typeof track?.title === 'string' &&
          typeof track?.src === 'string' &&
          (track.artist === undefined || typeof track.artist === 'string'),
      );

      this.state = { ...this.state, tracks, currentIndex: 0, hasError: false };
      this.notify();
    } catch {
      this.update({ hasError: true });
    }
  }

  public async toggle() {
    if (this.state.tracks.length === 0) return;
    const audio = this.getAudio();

    if (!audio.src) this.setTrackSource(this.state.currentIndex);
    if (this.state.isPlaying) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
    } catch {
      this.update({ isPlaying: false, hasError: true });
    }
  }

  public async skip(direction: 'previous' | 'next') {
    if (this.state.tracks.length === 0) return;

    const audio = this.getAudio();
    if (direction === 'previous' && audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }

    const wasPlaying = this.state.isPlaying;
    audio.pause();
    const offset = direction === 'next' ? 1 : -1;
    const nextIndex = (this.state.currentIndex + offset + this.state.tracks.length) % this.state.tracks.length;
    this.setTrackSource(nextIndex);
    this.update({ currentIndex: nextIndex, hasError: false });

    if (wasPlaying) {
      try {
        await this.getAudio().play();
      } catch {
        this.update({ isPlaying: false, hasError: true });
      }
    }
  }

  public subscribe(callback: (state: AudioPlayerState) => void): () => void {
    this.listeners.push(callback);
    callback(this.state);
    return () => {
      this.listeners = this.listeners.filter((listener) => listener !== callback);
    };
  }

  private async playNext() {
    await this.skip('next');
  }

  private setTrackSource(index: number) {
    const track = this.state.tracks[index];
    if (!track) return;
    const audio = this.getAudio();
    audio.src = track.src;
    audio.load();
  }

  private update(changes: Partial<AudioPlayerState>) {
    this.state = { ...this.state, ...changes };
    this.notify();
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }
}

export const audioEngine = new AudioEngine();