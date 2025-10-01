export interface EliaCharacter {
  letter: string;
  eliaSymbol: string;
  fingerPosition: 'left-pinky' | 'left-ring' | 'left-middle' | 'left-index' | 'right-index' | 'right-middle' | 'right-ring' | 'right-pinky';
  level: number;
}

export interface Level {
  id: number;
  name: string;
  description: string;
  characters: string[];
  practiceModules: string[];
  quizText: string;
}

export interface UserProgress {
  currentLevel: number;
  completedLevels: number[];
  accuracy: { [key: string]: number };
  totalAttempts: { [key: string]: number };
  correctAttempts: { [key: string]: number };
  lessonScores: { [lessonId: number]: LessonScore };
  badges: string[];
  settings: UserSettings;
}

export interface LessonScore {
  accuracy: number;
  cpm: number;
  wpm: number;
  passed: boolean;
  attempts: number;
  bestScore?: {
    accuracy: number;
    cpm: number;
    wpm: number;
  };
}

export interface UserSettings {
  customAccuracyThreshold?: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  criteria: string;
  earned?: boolean;
}

export interface KeystrokeLog {
  timestamp: number;
  promptedCharacter: string;
  typedCharacter: string;
  correct: boolean;
  latency: number;
  level: number;
}

export interface ExerciseResult {
  accuracy: number;
  totalAttempts: number;
  correctAttempts: number;
  incorrectCharacters: string[];
  duration: number;
  cpm?: number;
  wpm?: number;
}