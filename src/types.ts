export type ScreenView = 'scrapbook' | 'letter';

export interface LoveNote {
  id: string;
  authorName?: string;
  mood?: string;
  message: string;
  likes: number;
  timestamp: string;
  isPinned?: boolean;
}

export interface PolaroidChapter {
  id: string;
  chapterNumber: string;
  dayLabel: string;
  date: string;
  title: string;
  description: string;
  image: string;
  emoji: string;
  rotateDeg: number;
}
