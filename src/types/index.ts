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
  practiceWords: string[];
}

export interface UserProgress {
  currentLevel: number;
  completedLevels: number[];
  accuracy: { [key: string]: number };
  totalAttempts: { [key: string]: number };
  correctAttempts: { [key: string]: number };
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
}