'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { UserProgress, ExerciseStage, ExerciseProgress } from '@/types/learn';
import { useApp } from '@/contexts/AppContext';

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

export function LearnProgressProvider({ children }: { children: ReactNode }) {
  const { learnProgress, updateLearnProgress } = useApp();

  console.log('🔵 [LearnProgressProvider] Current progress:', {
    completedChapters: learnProgress.completedChapters,
    exerciseProgress: Object.keys(learnProgress.exerciseProgress)
  });

  const markChapterComplete = (chapterId: number) => {
    console.log('✏️ [LearnProgressProvider] Marking chapter complete:', chapterId);
    const updatedProgress = {
      ...learnProgress,
      completedChapters: learnProgress.completedChapters.includes(chapterId)
        ? learnProgress.completedChapters
        : [...learnProgress.completedChapters, chapterId]
    };
    console.log('📤 [LearnProgressProvider] Updated progress:', updatedProgress);
    updateLearnProgress(updatedProgress);
  };

  const markExerciseComplete = (chapterId: number, exerciseId: string) => {
    const chapterExercises = learnProgress.completedExercises[chapterId] || [];
    if (chapterExercises.includes(exerciseId)) {
      return;
    }

    const updatedProgress = {
      ...learnProgress,
      completedExercises: {
        ...learnProgress.completedExercises,
        [chapterId]: [...chapterExercises, exerciseId]
      }
    };
    updateLearnProgress(updatedProgress);
  };

  const setLastAccessedChapter = (chapterId: number) => {
    const updatedProgress = {
      ...learnProgress,
      lastAccessedChapter: chapterId
    };
    updateLearnProgress(updatedProgress);
  };

  const isChapterComplete = (chapterId: number): boolean => {
    return learnProgress.completedChapters.includes(chapterId);
  };

  const isExerciseComplete = (chapterId: number, exerciseId: string): boolean => {
    const chapterExercises = learnProgress.completedExercises[chapterId] || [];
    return chapterExercises.includes(exerciseId);
  };

  const getExerciseProgress = (chapterId: number): ExerciseProgress | undefined => {
    return learnProgress.exerciseProgress[chapterId];
  };

  const updateExerciseStage = (chapterId: number, stage: ExerciseStage) => {
    const currentProgress = learnProgress.exerciseProgress[chapterId];
    if (currentProgress?.currentStage === stage) {
      return;
    }

    const updatedProgress = {
      ...learnProgress,
      exerciseProgress: {
        ...learnProgress.exerciseProgress,
        [chapterId]: {
          ...currentProgress,
          currentStage: stage,
          chapterId
        } as ExerciseProgress
      }
    };
    updateLearnProgress(updatedProgress);
  };

  const markFlashcardViewed = (chapterId: number, flashcardId: string) => {
    const existingProgress = learnProgress.exerciseProgress[chapterId] || {
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
    if (viewedIds.includes(flashcardId)) {
      return;
    }

    const updatedProgress = {
      ...learnProgress,
      exerciseProgress: {
        ...learnProgress.exerciseProgress,
        [chapterId]: {
          ...existingProgress,
          flashcardsViewedIds: [...viewedIds, flashcardId]
        }
      }
    };
    updateLearnProgress(updatedProgress);
  };

  const markStageComplete = (
    chapterId: number,
    stage: 'flashcards' | 'letterQuiz' | 'wordQuiz' | 'translationQuiz'
  ) => {
    const existingProgress = learnProgress.exerciseProgress[chapterId] || {
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

        // Mark chapter as complete
        const updatedCompletedChapters = learnProgress.completedChapters.includes(chapterId)
          ? learnProgress.completedChapters
          : [...learnProgress.completedChapters, chapterId];

        const updatedProgress = {
          ...learnProgress,
          completedChapters: updatedCompletedChapters,
          exerciseProgress: {
            ...learnProgress.exerciseProgress,
            [chapterId]: updated
          }
        };
        updateLearnProgress(updatedProgress);
        return;
    }

    const updatedProgress = {
      ...learnProgress,
      exerciseProgress: {
        ...learnProgress.exerciseProgress,
        [chapterId]: updated
      }
    };
    updateLearnProgress(updatedProgress);
  };

  return (
    <LearnProgressContext.Provider
      value={{
        progress: learnProgress,
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
