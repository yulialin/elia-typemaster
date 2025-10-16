import { createClient } from '@supabase/supabase-js'
import { UserProgress as AppUserProgress } from '@/types'
import { UserProgress as LearnProgress } from '@/types/learn'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Only create client if proper environment variables are set
const isSupabaseConfigured =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_url_here' &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'your_supabase_anon_key_here'

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Database Types
export interface UserProfile {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export interface UserProgress {
  id: string
  user_id: string
  current_level: number
  completed_levels: number[]
  lesson_scores: Record<string, LessonScoreDB>
  badges: string[]
  settings: UserSettingsDB
  accuracy: Record<string, number>
  total_attempts: Record<string, number>
  correct_attempts: Record<string, number>
  // ELIA Learn progress (stored as JSONB in database)
  learn_progress?: LearnProgress
  created_at: string
  updated_at: string
}

export interface LessonScoreDB {
  accuracy: number
  cpm: number
  wpm: number
  passed: boolean
  attempts: number
  best_score?: {
    accuracy: number
    cpm: number
    wpm: number
  }
}

export interface UserSettingsDB {
  custom_accuracy_threshold?: number
}

// Auth functions
export const signUp = async (email: string, password: string) => {
  if (!supabase) {
    return { data: null, error: { message: 'Authentication not configured. Please set up Supabase.' } }
  }
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  if (!supabase) {
    return { data: null, error: { message: 'Authentication not configured. Please set up Supabase.' } }
  }
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  if (!supabase) {
    return { error: { message: 'Authentication not configured. Please set up Supabase.' } }
  }
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  if (!supabase) {
    return null
  }
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Progress functions
export const saveUserProgress = async (userId: string, progress: AppUserProgress, learnProgress?: LearnProgress) => {
  if (!supabase) {
    console.log('⚠️ [Supabase] Supabase not configured');
    return { data: null, error: null }
  }

  console.log('🗄️ [Supabase] Saving to database:', {
    userId,
    learn_progress: learnProgress,
    completedChapters: learnProgress?.completedChapters
  });

  const { data, error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: userId,
      current_level: progress.currentLevel,
      completed_levels: progress.completedLevels,
      lesson_scores: progress.lessonScores,
      badges: progress.badges,
      settings: progress.settings,
      accuracy: progress.accuracy,
      total_attempts: progress.totalAttempts,
      correct_attempts: progress.correctAttempts,
      learn_progress: learnProgress,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id'
    })

  if (error) {
    console.error('❌ [Supabase] Save error:', error);
  } else {
    console.log('✅ [Supabase] Save successful');
  }

  return { data, error }
}

export const getUserProgress = async (userId: string) => {
  if (!supabase) {
    return { data: null, error: { code: 'PGRST116' } } // No rows returned
  }

  // First try to get existing progress
  let { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .single()

  // If no progress exists (PGRST116 = no rows), create it
  if (error && error.code === 'PGRST116') {
    const { data: newData, error: createError } = await supabase
      .from('user_progress')
      .insert({
        user_id: userId,
        current_level: 1,
        completed_levels: [],
        lesson_scores: {},
        badges: [],
        settings: {},
        accuracy: {},
        total_attempts: {},
        correct_attempts: {}
      })
      .select()
      .single()

    if (createError) {
      return { data: null, error: createError }
    }

    data = newData
    error = null
  }

  return { data, error }
}