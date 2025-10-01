'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { UserProgress, KeystrokeLog, ExerciseResult, LessonScore, UserSettings } from '@/types';
import { lessons } from '@/data/eliaMapping';
import { useAuth } from './AuthContext';
import { saveUserProgress, getUserProgress } from '@/lib/supabase';

interface AppState {
  userProgress: UserProgress;
  currentExercise: {
    level: number;
    promptedCharacter: string | null;
    startTime: number | null;
    results: ExerciseResult | null;
  };
  keystrokeLogs: KeystrokeLog[];
  showMindfulnessPrompt: boolean;
  isDataLoading: boolean;
}

type AppAction =
  | { type: 'SET_CURRENT_LEVEL'; payload: number }
  | { type: 'COMPLETE_LEVEL'; payload: number }
  | { type: 'START_EXERCISE'; payload: { level: number; character: string } }
  | { type: 'END_EXERCISE'; payload: ExerciseResult }
  | { type: 'LOG_KEYSTROKE'; payload: KeystrokeLog }
  | { type: 'UPDATE_ACCURACY'; payload: { character: string; correct: boolean } }
  | { type: 'SHOW_MINDFULNESS_PROMPT'; payload: boolean }
  | { type: 'COMPLETE_LESSON_QUIZ'; payload: { lessonId: number; score: LessonScore } }
  | { type: 'UPDATE_USER_SETTINGS'; payload: Partial<UserSettings> }
  | { type: 'AWARD_BADGE'; payload: string }
  | { type: 'RESET_PROGRESS' }
  | { type: 'LOAD_USER_DATA'; payload: UserProgress }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AppState = {
  userProgress: {
    currentLevel: 1,
    completedLevels: [],
    accuracy: {},
    totalAttempts: {},
    correctAttempts: {},
    lessonScores: {},
    badges: [],
    settings: {}
  },
  currentExercise: {
    level: 1,
    promptedCharacter: null,
    startTime: null,
    results: null
  },
  keystrokeLogs: [],
  showMindfulnessPrompt: true,
  isDataLoading: false
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_CURRENT_LEVEL':
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          currentLevel: action.payload
        }
      };

    case 'COMPLETE_LEVEL':
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          completedLevels: [...state.userProgress.completedLevels, action.payload]
        }
      };

    case 'START_EXERCISE':
      return {
        ...state,
        currentExercise: {
          level: action.payload.level,
          promptedCharacter: action.payload.character,
          startTime: Date.now(),
          results: null
        }
      };

    case 'END_EXERCISE':
      return {
        ...state,
        currentExercise: {
          ...state.currentExercise,
          results: action.payload
        }
      };

    case 'LOG_KEYSTROKE':
      return {
        ...state,
        keystrokeLogs: [...state.keystrokeLogs, action.payload]
      };

    case 'UPDATE_ACCURACY':
      const { character, correct } = action.payload;
      const currentTotal = state.userProgress.totalAttempts[character] || 0;
      const currentCorrect = state.userProgress.correctAttempts[character] || 0;

      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          totalAttempts: {
            ...state.userProgress.totalAttempts,
            [character]: currentTotal + 1
          },
          correctAttempts: {
            ...state.userProgress.correctAttempts,
            [character]: correct ? currentCorrect + 1 : currentCorrect
          },
          accuracy: {
            ...state.userProgress.accuracy,
            [character]: Math.round(((correct ? currentCorrect + 1 : currentCorrect) / (currentTotal + 1)) * 100)
          }
        }
      };

    case 'SHOW_MINDFULNESS_PROMPT':
      return {
        ...state,
        showMindfulnessPrompt: action.payload
      };

    case 'COMPLETE_LESSON_QUIZ':
      const { lessonId, score } = action.payload;
      const currentBestScore = state.userProgress.lessonScores[lessonId]?.bestScore;
      const isNewBest = !currentBestScore ||
        score.accuracy > currentBestScore.accuracy ||
        (score.accuracy === currentBestScore.accuracy && score.wpm > currentBestScore.wpm);

      const newCompletedLevels = score.passed && !state.userProgress.completedLevels.includes(lessonId)
        ? [...state.userProgress.completedLevels, lessonId]
        : state.userProgress.completedLevels;

      const newLessonScores = {
        ...state.userProgress.lessonScores,
        [lessonId]: {
          ...score,
          attempts: (state.userProgress.lessonScores[lessonId]?.attempts || 0) + 1,
          bestScore: isNewBest ? { accuracy: score.accuracy, cpm: score.cpm, wpm: score.wpm } : currentBestScore
        }
      };

      // Check for new badges
      const newBadges = [...state.userProgress.badges];
      const totalLessons = lessons.length;

      // Completionist badge
      if (newCompletedLevels.length === totalLessons && !newBadges.includes('completionist')) {
        newBadges.push('completionist');
      }

      // Speed badges - check if user has achieved the WPM on ALL lessons
      const checkSpeedBadge = (wpmThreshold: number, badgeId: string) => {
        if (newBadges.includes(badgeId)) return;

        const allLessonsAtSpeed = newCompletedLevels.every(lessonId => {
          const lessonScore = newLessonScores[lessonId];
          return lessonScore?.bestScore?.wpm >= wpmThreshold;
        });

        if (allLessonsAtSpeed && newCompletedLevels.length === totalLessons) {
          newBadges.push(badgeId);
        }
      };

      checkSpeedBadge(10, 'steady');
      checkSpeedBadge(20, 'swift');
      checkSpeedBadge(40, 'velocity');
      checkSpeedBadge(60, 'virtuoso');

      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          lessonScores: newLessonScores,
          completedLevels: newCompletedLevels,
          badges: newBadges
        }
      };

    case 'UPDATE_USER_SETTINGS':
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          settings: {
            ...state.userProgress.settings,
            ...action.payload
          }
        }
      };

    case 'AWARD_BADGE':
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          badges: state.userProgress.badges.includes(action.payload)
            ? state.userProgress.badges
            : [...state.userProgress.badges, action.payload]
        }
      };

    case 'RESET_PROGRESS':
      return initialState;

    case 'LOAD_USER_DATA':
      return {
        ...state,
        userProgress: action.payload,
        isDataLoading: false
      };

    case 'SET_LOADING':
      return {
        ...state,
        isDataLoading: action.payload
      };

    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { user, loading: authLoading } = useAuth();

  // Load user data when authenticated
  useEffect(() => {
    const loadUserData = async () => {
      if (user && !authLoading) {
        dispatch({ type: 'SET_LOADING', payload: true });

        try {
          const { data: progressData, error } = await getUserProgress(user.id);

          if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
            dispatch({ type: 'SET_LOADING', payload: false });
            return;
          }

          if (progressData) {

            // Map database format to app format
            const mappedProgress: UserProgress = {
              currentLevel: progressData.current_level,
              completedLevels: progressData.completed_levels,
              accuracy: progressData.accuracy,
              totalAttempts: progressData.total_attempts,
              correctAttempts: progressData.correct_attempts,
              lessonScores: progressData.lesson_scores,
              badges: progressData.badges,
              settings: progressData.settings
            };

            dispatch({ type: 'LOAD_USER_DATA', payload: mappedProgress });
          } else {
            // New user - use initial state
            dispatch({ type: 'SET_LOADING', payload: false });
          }
        } catch (error) {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } else if (!user && !authLoading) {
        // Not authenticated - reset to initial state
        dispatch({ type: 'RESET_PROGRESS' });
      }
    };

    loadUserData();
  }, [user, authLoading]);

  // Save data to database whenever userProgress changes (debounced)
  useEffect(() => {
    const saveData = async () => {
      if (user && !state.isDataLoading) {
        try {
          const result = await saveUserProgress(user.id, state.userProgress);
        } catch (error) {
        }
      }
    };

    // Debounce saves to avoid too many database calls
    const timeoutId = setTimeout(saveData, 1000);
    return () => clearTimeout(timeoutId);
  }, [state.userProgress, user, state.isDataLoading]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}