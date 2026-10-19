import { LoveNote } from '../types.ts';
import { requireSupabase } from './supabase.ts';

interface SupabaseLoveNote {
  id: string;
  author_name: string;
  mood: string;
  message: string;
  likes: number;
  created_at: string;
  is_pinned: boolean;
}

function toLoveNote(row: SupabaseLoveNote): LoveNote {
  return {
    id: row.id,
    authorName: row.author_name,
    mood: row.mood,
    message: row.message,
    likes: row.likes,
    timestamp: new Date(row.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
    isPinned: row.is_pinned,
  };
}

export async function getLoveNotes(): Promise<LoveNote[]> {
  const { data, error } = await requireSupabase()
    .from('love_notes')
    .select('id, author_name, mood, message, likes, created_at, is_pinned')
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) throw error;
  return ((data ?? []) as unknown as SupabaseLoveNote[]).map(toLoveNote);
}

export async function saveLoveNote(newNote: Omit<LoveNote, 'id' | 'likes' | 'timestamp'>): Promise<LoveNote> {
  const { data, error } = await requireSupabase()
    .from('love_notes')
    .insert({
      author_name: newNote.authorName || 'Untukmu ♥',
      mood: newNote.mood || '❤️ Sayang Banget',
      message: newNote.message,
    })
    .select('id, author_name, mood, message, likes, created_at, is_pinned')
    .single();

  if (error) throw error;
  return toLoveNote(data as unknown as SupabaseLoveNote);
}

export async function incrementNoteLike(noteId: string): Promise<number> {
  const { data, error } = await requireSupabase().rpc('increment_note_like', { note_id: noteId });
  if (error) throw error;
  if (typeof data !== 'number') throw new Error('Pesan tidak ditemukan.');
  return data;
}

export async function getHeartCount(): Promise<number> {
  const { data, error } = await requireSupabase().from('heart_counters').select('count').eq('id', 1).single();
  if (error) throw error;
  return data.count;
}

export async function incrementHeartCount(): Promise<number> {
  const { data, error } = await requireSupabase().rpc('increment_heart_count');
  if (error) throw error;
  if (typeof data !== 'number') throw new Error('Jumlah hati tidak dapat diperbarui.');
  return data;
}
