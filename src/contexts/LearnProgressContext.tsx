'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { UserProgress, ExerciseStage, ExerciseProgress } from '@/types/learn';

interface LearnProgressContextType {
  progress: UserProgress;
  markChapterComplete: (chapterId: number) => void;
  markExerciseComplete: (chapterId: number, exerciseId: string) => void;
  setLastAccessedChapter: (chapterId: number) => void;
  isChapterComplete: (chapterId: number) => boolean;
  isExerciseComplete: (chapterId: number, exerciseId: string) => boolean;
  // New multi-stage methods
  getExerciseProgress: (chapterId: number) => ExerciseProgress | undefined;
  updateExerciseStage: (chapterId: number, stage: ExerciseStage) => void;
  markFlashcardViewed: (chapterId: number, flashcardId: string) => void;
  markStageComplete: (chapterId: number, stage: 'flashcards' | 'letterQuiz' | 'wordQuiz' | 'translationQuiz') => void;
}

const LearnProgressContext = createContext<LearnProgressContextType | undefined>(undefined);

const STORAGE_KEY = 'elia-learn-progress';

function getInitialProgress(): UserProgress {
  if (typeof window === 'undefined') {
    return {
      completedChapters: [],
      completedExercises: {},
      exerciseProgress: {},
      lastAccessedChapter: 1
    };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Ensure exerciseProgress exists (backwards compatibility)
      if (!parsed.exerciseProgress) {
        parsed.exerciseProgress = {};
      }

      // Migration: Fix completedChapters array by checking exerciseProgress
      // If a chapter's translationQuiz is completed, it should be in completedChapters
      const completedChapters = new Set(parsed.completedChapters || []);
      Object.keys(parsed.exerciseProgress || {}).forEach(chapterIdStr => {
        const chapterId = parseInt(chapterIdStr);
        const chapterProgress = parsed.exerciseProgress[chapterIdStr];
        if (chapterProgress?.translationQuizProgress?.completed || chapterProgress?.currentStage === 'complete') {
          completedChapters.add(chapterId);
        }
      });
      parsed.completedChapters = Array.from(completedChapters).sort((a, b) => a - b);

      // Debug logging
      console.log('Migration completed:', {
        oldCompleted: parsed.completedChapters,
        exerciseProgressKeys: Object.keys(parsed.exerciseProgress || {}),
        exerciseProgressDetails: Object.entries(parsed.exerciseProgress || {}).map(([id, prog]) => ({
          chapterId: id,
          stage: prog.currentStage,
          translationCompleted: prog.translationQuizProgress?.completed
        }))
      });

      return parsed;
    }
  } catch (error) {
    console.error('Error loading progress:', error);
  }

  return {
    completedChapters: [],
    completedExercises: {},
    exerciseProgress: {},
    lastAccessedChapter: 1
  };
}

export function LearnProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(getInitialProgress);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    }
  }, [progress]);

  const markChapterComplete = (chapterId: number) => {
    setProgress(prev => ({
      ...prev,
      completedChapters: prev.completedChapters.includes(chapterId)
        ? prev.completedChapters
        : [...prev.completedChapters, chapterId]
    }));
  };

  const markExerciseComplete = (chapterId: number, exerciseId: string) => {
    setProgress(prev => {
      const chapterExercises = prev.completedExercises[chapterId] || [];
      if (chapterExercises.includes(exerciseId)) {
        return prev;
      }

      return {
        ...prev,
        completedExercises: {
          ...prev.completedExercises,
          [chapterId]: [...chapterExercises, exerciseId]
        }
      };
    });
  };

  const setLastAccessedChapter = (chapterId: number) => {
    setProgress(prev => ({
      ...prev,
      lastAccessedChapter: chapterId
    }));
  };

  const isChapterComplete = (chapterId: number): boolean => {
    return progress.completedChapters.includes(chapterId);
  };

  const isExerciseComplete = (chapterId: number, exerciseId: string): boolean => {
    const chapterExercises = progress.completedExercises[chapterId] || [];
    return chapterExercises.includes(exerciseId);
  };

  // New multi-stage methods - memoized to prevent infinite loops
  const getExerciseProgress = useCallback((chapterId: number): ExerciseProgress | undefined => {
    return progress.exerciseProgress[chapterId];
  }, [progress.exerciseProgress]);

  const updateExerciseStage = useCallback((chapterId: number, stage: ExerciseStage) => {
    setProgress(prev => {
      // Only update if the stage actually changed
      const currentProgress = prev.exerciseProgress[chapterId];
      if (currentProgress?.currentStage === stage) {
        return prev;
      }

      return {
        ...prev,
        exerciseProgress: {
          ...prev.exerciseProgress,
          [chapterId]: {
            ...currentProgress,
            currentStage: stage,
            chapterId
          } as ExerciseProgress
        }
      };
    });
  }, []);

  const markFlashcardViewed = (chapterId: number, flashcardId: string) => {
    setProgress(prev => {
      const existingProgress = prev.exerciseProgress[chapterId] || {
        chapterId,
        currentStage: 'flashcards' as ExerciseStage,
        flashcardsReviewed: false,
        flashcardsViewedIds: [],
        letterQuizProgress: { questionsCompleted: 0, totalQuestions: 0, completed: false },
        wordQuizProgress: { questionsCompleted: 0, totalQuestions: 0, completed: false },
        translationQuizProgress: { wordsCompleted: 0, totalWords: 0, completed: false },
        completedAt: null
      };

      const viewedIds = existingProgress.flashcardsViewedIds || [];
      if (!viewedIds.includes(flashcardId)) {
        viewedIds.push(flashcardId);
      }

      return {
        ...prev,
        exerciseProgress: {
          ...prev.exerciseProgress,
          [chapterId]: {
            ...existingProgress,
            flashcardsViewedIds: viewedIds
          }
        }
      };
    });
  };

  const markStageComplete = (
    chapterId: number,
    stage: 'flashcards' | 'letterQuiz' | 'wordQuiz' | 'translationQuiz'
  ) => {
    setProgress(prev => {
      const existingProgress = prev.exerciseProgress[chapterId] || {
        chapterId,
        currentStage: 'flashcards' as ExerciseStage,
        flashcardsReviewed: false,
        flashcardsViewedIds: [],
        letterQuizProgress: { questionsCompleted: 0, totalQuestions: 0, completed: false },
        wordQuizProgress: { questionsCompleted: 0, totalQuestions: 0, completed: false },
        translationQuizProgress: { wordsCompleted: 0, totalWords: 0, completed: false },
        completedAt: null
      };

      const updated = { ...existingProgress };

      switch (stage) {
        case 'flashcards':
          updated.flashcardsReviewed = true;
          updated.currentStage = 'letter-recognition-quiz';
          break;
        case 'letterQuiz':
          updated.letterQuizProgress = { ...updated.letterQuizProgress, completed: true };
          updated.currentStage = 'word-recognition-quiz';
          break;
        case 'wordQuiz':
          updated.wordQuizProgress = { ...updated.wordQuizProgress, completed: true };
          updated.currentStage = 'word-translation-quiz';
          break;
        case 'translationQuiz':
          updated.translationQuizProgress = { ...updated.translationQuizProgress, completed: true };
          updated.currentStage = 'complete';
          updated.completedAt = new Date();
          // Mark chapter as complete - always add to completedChapters
          const updatedCompletedChapters = prev.completedChapters.includes(chapterId)
            ? prev.completedChapters
            : [...prev.completedChapters, chapterId];

          return {
            ...prev,
            completedChapters: updatedCompletedChapters,
            exerciseProgress: {
              ...prev.exerciseProgress,
              [chapterId]: updated
            }
          };
      }

      return {
        ...prev,
        exerciseProgress: {
          ...prev.exerciseProgress,
          [chapterId]: updated
        }
      };
    });
  };

  return (
    <LearnProgressContext.Provider
      value={{
        progress,
        markChapterComplete,
        markExerciseComplete,
        setLastAccessedChapter,
        isChapterComplete,
        isExerciseComplete,
        getExerciseProgress,
        updateExerciseStage,
        markFlashcardViewed,
        markStageComplete
      }}
    >
      {children}
    </LearnProgressContext.Provider>
  );
}

export function useLearnProgress() {
  const context = useContext(LearnProgressContext);
  if (context === undefined) {
    throw new Error('useLearnProgress must be used within a LearnProgressProvider');
  }
  return context;
}
