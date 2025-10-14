// Types for ELIA Learn app

// Exercise stage types
export type ExerciseStage =
  | 'flashcards'
  | 'letter-recognition-quiz'
  | 'word-recognition-quiz'
  | 'word-translation-quiz'
  | 'complete';

// Flashcard data for Part 1: Flashcard Review Stage
export interface FlashcardData {
  id: string;
  eliaCharacter: string;
  romanCharacter: string;
  description?: string;
}

// Multiple choice question for Part 2A & 2B
export interface MultipleChoiceQuestion {
  id: string;
  type: 'elia-to-roman' | 'roman-to-elia' | 'word-recognition';
  questionText: string;
  displayCharacter?: string; // For letter quizzes (ELIA or Roman)
  displayWord?: string; // For word recognition (English word)
  choices: string[]; // Four options
  correctAnswer: string; // The correct choice
}

// Translation question for Part 2C
export interface TranslationQuestion {
  id: string;
  eliaWord: string; // Word displayed in ELIA
  correctAnswer: string; // English word (lowercase for comparison)
  hints?: string[]; // Optional hints to show after failed attempts
}

// Complete chapter exercise structure
export interface ChapterExercise {
  chapterId: number;
  flashcards: FlashcardData[];
  letterRecognitionQuiz: MultipleChoiceQuestion[];
  wordRecognitionQuiz: MultipleChoiceQuestion[];
  wordTranslationQuiz: TranslationQuestion[];
}

// Legacy Exercise type (deprecated, keeping for backwards compatibility)
export interface Exercise {
  id: string;
  type: 'multiple-choice' | 'fill-in-blank' | 'flashcard' | 'grid';
  question?: string;
  eliaCharacter?: string;
  romanCharacter?: string;
  options?: string[];
  correctAnswer: string;
  text?: string;
  words?: string[];
}

// Chapter definition
export interface Chapter {
  id: number;
  title: string;
  description: string;
  learnContent: {
    introduction: string;
    characters: Array<{
      roman: string;
      elia: string;
      description?: string;
    }>;
  };
  // New structured exercise format
  structuredExercises?: ChapterExercise;
  // Legacy exercise format (deprecated)
  exercises: Exercise[];
}

// Progress tracking for multi-stage exercises
export interface ExerciseProgress {
  chapterId: number;
  currentStage: ExerciseStage;
  flashcardsReviewed: boolean;
  flashcardsViewedIds: string[];
  letterQuizProgress: {
    questionsCompleted: number;
    totalQuestions: number;
    completed: boolean;
  };
  wordQuizProgress: {
    questionsCompleted: number;
    totalQuestions: number;
    completed: boolean;
  };
  translationQuizProgress: {
    wordsCompleted: number;
    totalWords: number;
    completed: boolean;
  };
  completedAt: Date | null;
}

// User progress tracking
export interface UserProgress {
  completedChapters: number[];
  completedExercises: { [chapterId: number]: string[] };
  exerciseProgress: { [chapterId: number]: ExerciseProgress };
  lastAccessedChapter: number;
}
