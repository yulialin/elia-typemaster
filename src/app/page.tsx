'use client';

import React, { useState } from 'react';
import LevelSelector from '@/components/LevelSelector';
import TypingInterface from '@/components/TypingInterface';
import TypingInterfaceB from '@/components/TypingInterfaceB';
import LessonSummary from '@/components/LessonSummary';
import { lessons } from '@/data/eliaMapping';

type AppMode = 'menu' | 'lesson' | 'summary';
type InterfaceVersion = 'A' | 'B';

export default function Home() {
  const [appMode, setAppMode] = useState<AppMode>('menu');
  const [currentLessonId, setCurrentLessonId] = useState(1);
  const [lessonAccuracy, setLessonAccuracy] = useState(0);
  const [lessonWPM, setLessonWPM] = useState<number | undefined>();
  const [lessonCPM, setLessonCPM] = useState<number | undefined>();
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [startInQuizMode, setStartInQuizMode] = useState(false);
  const [interfaceVersion, setInterfaceVersion] = useState<InterfaceVersion>('A');

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

  const toggleVersion = () => {
    setInterfaceVersion(prev => prev === 'A' ? 'B' : 'A');
  };

  return (
    <div className="min-h-screen">
      {appMode === 'menu' && (
        <LevelSelector onSelectLesson={handleSelectLesson} />
      )}

      {appMode === 'lesson' && (
        <>
          {/* Version Toggle Button */}
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={toggleVersion}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-colors"
              title={`Switch to Version ${interfaceVersion === 'A' ? 'B' : 'A'}`}
            >
              <span className="text-sm font-semibold">Version {interfaceVersion}</span>
              <span className="text-xs opacity-80">Switch to {interfaceVersion === 'A' ? 'B' : 'A'}</span>
            </button>
          </div>

          {/* Render appropriate interface version */}
          {interfaceVersion === 'A' ? (
            <TypingInterface
              lessonId={currentLessonId}
              onComplete={handleCompleteLesson}
              onBack={handleBackToMenu}
              startInQuizMode={startInQuizMode}
            />
          ) : (
            <TypingInterfaceB
              lessonId={currentLessonId}
              onComplete={handleCompleteLesson}
              onBack={handleBackToMenu}
              startInQuizMode={startInQuizMode}
            />
          )}
        </>
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
  );
}
