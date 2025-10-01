'use client';

import React, { useState } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { AppProvider } from '@/contexts/AppContext';
import LevelSelector from '@/components/LevelSelector';
import TypingInterface from '@/components/TypingInterface';
import LessonSummary from '@/components/LessonSummary';
import { lessons } from '@/data/eliaMapping';

type AppMode = 'menu' | 'lesson' | 'summary';

export default function Home() {
  const [appMode, setAppMode] = useState<AppMode>('menu');
  const [currentLessonId, setCurrentLessonId] = useState(1);
  const [lessonAccuracy, setLessonAccuracy] = useState(0);
  const [lessonWPM, setLessonWPM] = useState<number | undefined>();
  const [lessonCPM, setLessonCPM] = useState<number | undefined>();
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [startInQuizMode, setStartInQuizMode] = useState(false);

  const handleSelectLesson = (lessonId: number) => {
    setCurrentLessonId(lessonId);
    setStartInQuizMode(false);
    setAppMode('lesson');
  };

  const handleCompleteLesson = (accuracy: number, wpm?: number, cpm?: number, isQuiz?: boolean) => {
    setLessonAccuracy(accuracy);
    setLessonWPM(wpm);
    setLessonCPM(cpm);
    setIsQuizMode(isQuiz || false);
    setAppMode('summary');
  };

  const handlePracticeAgain = () => {
    setStartInQuizMode(false);
    setAppMode('lesson');
  };

  const handleTakeQuiz = () => {
    setStartInQuizMode(true);
    setAppMode('lesson');
  };

  const handleNextLesson = () => {
    if (currentLessonId < lessons.length) {
      setCurrentLessonId(prev => prev + 1);
      setStartInQuizMode(false);
      setAppMode('lesson');
    }
  };

  const handleBackToMenu = () => {
    setAppMode('menu');
  };

  const hasNextLesson = currentLessonId < lessons.length;

  return (
    <AuthProvider>
      <AppProvider>
        <div className="min-h-screen">
          {appMode === 'menu' && (
            <LevelSelector onSelectLesson={handleSelectLesson} />
          )}

          {appMode === 'lesson' && (
            <TypingInterface
              lessonId={currentLessonId}
              onComplete={handleCompleteLesson}
              onBack={handleBackToMenu}
              startInQuizMode={startInQuizMode}
            />
          )}

          {appMode === 'summary' && (
            <LessonSummary
              accuracy={lessonAccuracy}
              wpm={lessonWPM}
              cpm={lessonCPM}
              lessonId={currentLessonId}
              isQuiz={isQuizMode}
              onPracticeAgain={handlePracticeAgain}
              onTakeQuiz={handleTakeQuiz}
              onNextLesson={handleNextLesson}
              onBack={handleBackToMenu}
              hasNextLesson={hasNextLesson}
            />
          )}
        </div>
      </AppProvider>
    </AuthProvider>
  );
}
