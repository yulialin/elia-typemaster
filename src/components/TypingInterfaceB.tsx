'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '@/contexts/AppContext';
import { getLessonData, PERFORMANCE_CRITERIA } from '@/data/eliaMapping';
import { calculateWPM } from '@/lib/utils';
import QuizPrepareScreen from './QuizPrepareScreen';
import Logo from './Logo';

type ExerciseMode = 'practice' | 'quiz' | 'prepare';

interface TypingInterfaceBProps {
  lessonId: number;
  onComplete: (accuracy: number, wpm?: number, cpm?: number, isQuiz?: boolean) => void;
  onBack: () => void;
  startInQuizMode?: boolean;
}

export default function TypingInterfaceB({ lessonId, onComplete, onBack, startInQuizMode = false }: TypingInterfaceBProps) {
  const { state, dispatch } = useApp();
  const [mode, setMode] = useState<ExerciseMode>(startInQuizMode ? 'prepare' : 'practice');
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const lessonData = getLessonData(lessonId);

  // Get current text based on mode
  const getCurrentText = () => {
    if (!lessonData) return '';

    if (mode === 'practice') {
      return lessonData.practiceModules[currentModuleIndex] || '';
    } else if (mode === 'quiz') {
      return lessonData.quizText;
    }
    return '';
  };

  const currentText = getCurrentText();
  const isQuizMode = mode === 'quiz';
  const userSettings = state.userProgress.settings;
  const accuracyThreshold = userSettings.customAccuracyThreshold || PERFORMANCE_CRITERIA.DEFAULT_ACCURACY_THRESHOLD;

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (isComplete || !currentText || mode === 'prepare') return;

    // Start timer on first keystroke
    if (!startTime) {
      setStartTime(Date.now());
    }

    const key = event.key;

    // Handle special keys
    if (key === 'Backspace') {
      if (typedText.length > 0) {
        setTypedText(prev => prev.slice(0, -1));
        setCurrentIndex(prev => Math.max(0, prev - 1));
      }
      return;
    }

    // Only accept valid characters and space
    if (key.length === 1) {
      const expectedChar = currentText[currentIndex];
      // Make comparison case-insensitive for letters, exact for spaces and punctuation
      const isCorrect = key.toLowerCase() === expectedChar.toLowerCase();

      if (!isCorrect) {
        setErrors(prev => prev + 1);
      }

      // Log keystroke
      dispatch({
        type: 'LOG_KEYSTROKE',
        payload: {
          timestamp: Date.now(),
          promptedCharacter: expectedChar,
          typedCharacter: key,
          correct: isCorrect,
          latency: startTime ? Date.now() - startTime : 0,
          level: lessonId
        }
      });

      const newTypedText = typedText + key;
      setTypedText(newTypedText);
      setCurrentIndex(prev => prev + 1);

      // Check if exercise is complete
      if (newTypedText.length === currentText.length) {
        setIsComplete(true);
        const finalAccuracy = Math.round(((currentText.length - errors) / currentText.length) * 100);
        let cpm: number | undefined;
        let wpm: number | undefined;

        if (startTime) {
          const timeMinutes = (Date.now() - startTime) / 60000;
          // CPM = Characters typed per minute (actual characters typed)
          cpm = Math.round(newTypedText.length / timeMinutes);
          // WPM = Words per minute (characters divided by 5, the standard)
          wpm = calculateWPM(newTypedText.length, timeMinutes);
        }

        if (isQuizMode) {
          // This is a quiz completion
          const passed = finalAccuracy >= accuracyThreshold &&
                        (cpm || 0) >= PERFORMANCE_CRITERIA.MIN_CPM_THRESHOLD;

          const score = {
            accuracy: finalAccuracy,
            cpm: cpm || 0,
            wpm: wpm || 0,
            passed,
            attempts: 1
          };

          dispatch({
            type: 'COMPLETE_LESSON_QUIZ',
            payload: { lessonId, score }
          });
        }

        onComplete(finalAccuracy, wpm, cpm, isQuizMode);
      }
    }
  }, [currentText, typedText, currentIndex, isComplete, startTime, errors, lessonId, dispatch, onComplete, mode, isQuizMode, accuracyThreshold]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // VERSION B: Full-text display mode
  const renderTextFullDisplay = () => {
    return (
      <div className="text-center">
        <div className="inline-flex flex-wrap gap-2 justify-center max-w-4xl">
          {currentText.split('').map((char, index) => {
            let className = 'text-4xl elia-font inline-block w-16 h-16 flex items-center justify-center rounded-lg border-2 ';

            if (index < typedText.length) {
              // Already typed - use case-insensitive comparison
              const typedChar = typedText[index];
              const isCorrectDisplay = typedChar.toLowerCase() === char.toLowerCase();
              className += isCorrectDisplay
                ? 'bg-green-200 text-green-800 border-green-400'
                : 'bg-red-200 text-red-800 border-red-400';
            } else if (index === currentIndex && !isComplete) {
              // Current character - highlighted with underline
              className += 'bg-blue-200 text-blue-800 border-blue-500 border-4 animate-pulse';
            } else {
              // Not yet typed
              className += 'text-gray-600 border-gray-300 bg-gray-50';
            }

            return (
              <div key={index} className={className}>
                {char === ' ' ? '␣' : char}
              </div>
            );
          })}
        </div>
        <div className="mt-4 text-sm text-gray-500">
          Character {currentIndex + 1} of {currentText.length}
        </div>
      </div>
    );
  };

  const handleNextModule = () => {
    if (!lessonData || currentModuleIndex >= lessonData.practiceModules.length - 1) return;

    setCurrentModuleIndex(prev => prev + 1);
    resetExercise();
  };

  const handlePreviousModule = () => {
    if (currentModuleIndex <= 0) return;

    setCurrentModuleIndex(prev => prev - 1);
    resetExercise();
  };

  const resetExercise = () => {
    setTypedText('');
    setCurrentIndex(0);
    setErrors(0);
    setStartTime(null);
    setIsComplete(false);
  };

  const startQuiz = () => {
    setMode('prepare');
  };

  const handleQuizStart = () => {
    setMode('quiz');
    resetExercise();
  };

  const handleQuizCancel = () => {
    setMode('practice');
  };

  if (!lessonData) {
    return <div className="text-center p-8">Lesson not found</div>;
  }

  // Show prepare screen before quiz
  if (mode === 'prepare') {
    return (
      <QuizPrepareScreen
        lessonName={`${lessonData.id}: ${lessonData.name}`}
        onStartQuiz={handleQuizStart}
        onCancel={handleQuizCancel}
      />
    );
  }

  const currentAccuracy = typedText.length > 0 ?
    Math.round(((typedText.length - errors) / typedText.length) * 100) : 100;

  const currentCPM = startTime ?
    Math.round(typedText.length / ((Date.now() - startTime) / 60000)) : 0;

  // Calculate recommendation
  const getRecommendation = () => {
    if (!isComplete) return null;

    if (isQuizMode) {
      const passedAccuracy = currentAccuracy >= accuracyThreshold;
      const passedSpeed = currentCPM >= PERFORMANCE_CRITERIA.MIN_CPM_THRESHOLD;

      if (passedAccuracy && passedSpeed) {
        return { type: 'success', message: 'Recommend: Next Lesson' };
      } else {
        return { type: 'retry', message: 'Recommend: Practice Again' };
      }
    }
    return null;
  };

  const recommendation = getRecommendation();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <button
              onClick={onBack}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <span>←</span>
              <span>Back to Lessons</span>
            </button>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Logo size="small" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              Lesson {lessonData.id}: {lessonData.name}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {isQuizMode ? '⏱️ Timed Quiz' : '🏃 Practice Mode (Untimed)'} • <span className="text-blue-600 font-semibold">Version B: Full Text Display</span>
            </p>
          </div>
          <div className="w-32"></div>
        </div>

        {/* Mode Selection */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {isQuizMode ? 'Quiz Mode' : 'Practice Mode'}
              </h3>
              <p className="text-sm text-gray-600">
                {isQuizMode
                  ? `Pass with ${accuracyThreshold}% accuracy and ${PERFORMANCE_CRITERIA.MIN_CPM_THRESHOLD} CPM`
                  : "Optional practice - build confidence before taking the quiz"}
              </p>
            </div>
            {!isQuizMode && (
              <button
                onClick={startQuiz}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                Take Quiz
              </button>
            )}
          </div>
        </div>

        {/* Practice Module Navigation (Practice Mode Only) */}
        {!isQuizMode && (
          <div className="mb-6 flex justify-between items-center">
            <button
              onClick={handlePreviousModule}
              disabled={currentModuleIndex === 0}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg"
            >
              Previous Module
            </button>
            <span className="text-gray-600">
              Module {currentModuleIndex + 1} of {lessonData.practiceModules.length}
            </span>
            <button
              onClick={handleNextModule}
              disabled={currentModuleIndex >= lessonData.practiceModules.length - 1}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg"
            >
              Next Module
            </button>
          </div>
        )}

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {isQuizMode && startTime && (
            <div className="bg-white p-4 rounded-lg text-center shadow-sm">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round((Date.now() - startTime) / 1000)}s
              </div>
              <div className="text-gray-600">Time</div>
            </div>
          )}
          <div className="bg-white p-4 rounded-lg text-center shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{currentAccuracy}%</div>
            <div className="text-gray-600">Accuracy</div>
          </div>
          {isQuizMode && (
            <div className="bg-white p-4 rounded-lg text-center shadow-sm">
              <div className="text-2xl font-bold text-green-600">{currentCPM}</div>
              <div className="text-gray-600">CPM</div>
            </div>
          )}
          <div className="bg-white p-4 rounded-lg text-center shadow-sm">
            <div className="text-2xl font-bold text-red-600">{errors}</div>
            <div className="text-gray-600">Errors</div>
          </div>
        </div>

        {/* Recommendation */}
        {recommendation && (
          <div className={`mb-6 p-4 rounded-lg ${
            recommendation.type === 'success'
              ? 'bg-green-50 border border-green-200'
              : 'bg-orange-50 border border-orange-200'
          }`}>
            <p className={`text-center font-medium ${
              recommendation.type === 'success' ? 'text-green-800' : 'text-orange-800'
            }`}>
              {recommendation.message}
            </p>
          </div>
        )}

        {/* Typing Area - Full Text Display */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            {isQuizMode ? 'Quiz Text:' : `Practice Module ${currentModuleIndex + 1}:`}
          </h3>
          <div className="p-8 bg-gray-50 rounded-lg border-2 border-gray-200 leading-relaxed min-h-32 flex items-center justify-center">
            {renderTextFullDisplay()}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800">
            <strong>Instructions (Version B - Full Text):</strong> Type the text exactly as shown above.
            All characters are visible from the start. The current character is highlighted in blue with a pulsing border.
            Correct characters turn green, incorrect ones turn red.
            {!isQuizMode && " This is practice mode - focus on accuracy without time pressure!"}
            {isQuizMode && ` Quiz mode: Aim for ${accuracyThreshold}% accuracy and ${PERFORMANCE_CRITERIA.MIN_CPM_THRESHOLD} CPM to pass.`}
          </p>
        </div>

        {/* Reset Button */}
        <div className="text-center">
          <button
            onClick={resetExercise}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
          >
            Reset Current {isQuizMode ? 'Quiz' : 'Module'}
          </button>
        </div>
      </div>
    </div>
  );
}
