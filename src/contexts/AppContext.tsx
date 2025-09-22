'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { UserProgress, KeystrokeLog, ExerciseResult } from '@/types';

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
}

type AppAction =
  | { type: 'SET_CURRENT_LEVEL'; payload: number }
  | { type: 'COMPLETE_LEVEL'; payload: number }
  | { type: 'START_EXERCISE'; payload: { level: number; character: string } }
  | { type: 'END_EXERCISE'; payload: ExerciseResult }
  | { type: 'LOG_KEYSTROKE'; payload: KeystrokeLog }
  | { type: 'UPDATE_ACCURACY'; payload: { character: string; correct: boolean } }
  | { type: 'SHOW_MINDFULNESS_PROMPT'; payload: boolean }
  | { type: 'RESET_PROGRESS' };

const initialState: AppState = {
  userProgress: {
    currentLevel: 1,
    completedLevels: [],
    accuracy: {},
    totalAttempts: {},
    correctAttempts: {}
  },
  currentExercise: {
    level: 1,
    promptedCharacter: null,
    startTime: null,
    results: null
  },
  keystrokeLogs: [],
  showMindfulnessPrompt: true
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

    case 'RESET_PROGRESS':
      return initialState;

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