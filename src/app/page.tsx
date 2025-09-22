'use client';

import React, { useState } from 'react';
import { AppProvider } from '@/contexts/AppContext';
import LevelSelector from '@/components/LevelSelector';
import CharacterExercise from '@/components/CharacterExercise';
import ExerciseSummary from '@/components/ExerciseSummary';
import PracticeArena from '@/components/PracticeArena';
import MindfulnessPrompt from '@/components/MindfulnessPrompt';

type AppMode = 'menu' | 'exercise' | 'summary' | 'practice' | 'mindfulness';

export default function Home() {
  const [appMode, setAppMode] = useState<AppMode>('menu');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [exerciseAccuracy, setExerciseAccuracy] = useState(0);
  const [incorrectCharacters, setIncorrectCharacters] = useState<string[]>([]);

  const handleSelectLevel = (level: number) => {
    setCurrentLevel(level);
    setAppMode('mindfulness');
  };

  const handleSelectPractice = (level: number) => {
    setCurrentLevel(level);
    setAppMode('practice');
  };

  const handleBeginExercise = () => {
    setAppMode('exercise');
  };

  const handleCompleteExercise = (accuracy: number) => {
    setExerciseAccuracy(accuracy);
    setAppMode('summary');
  };

  const handleContinue = () => {
    if (exerciseAccuracy >= 95) {
      setCurrentLevel(prev => prev + 1);
    }
    setAppMode('menu');
  };

  const handleRetry = () => {
    setAppMode('mindfulness');
  };

  const handleBackToMenu = () => {
    setAppMode('menu');
  };

  return (
    <AppProvider>
      <div className="min-h-screen">
        {appMode === 'menu' && (
          <LevelSelector
            onSelectLevel={handleSelectLevel}
            onSelectPractice={handleSelectPractice}
          />
        )}

        {appMode === 'mindfulness' && (
          <MindfulnessPrompt onBegin={handleBeginExercise} onBack={handleBackToMenu} />
        )}

        {appMode === 'exercise' && (
          <CharacterExercise
            level={currentLevel}
            onComplete={handleCompleteExercise}
            onBack={handleBackToMenu}
          />
        )}

        {appMode === 'summary' && (
          <ExerciseSummary
            accuracy={exerciseAccuracy}
            level={currentLevel}
            incorrectCharacters={incorrectCharacters}
            onContinue={handleContinue}
            onRetry={handleRetry}
            onBack={handleBackToMenu}
          />
        )}

        {appMode === 'practice' && (
          <PracticeArena
            level={currentLevel}
            onBack={handleBackToMenu}
          />
        )}
      </div>
    </AppProvider>
  );
}
