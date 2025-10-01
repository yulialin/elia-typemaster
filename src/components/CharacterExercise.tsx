'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '@/contexts/AppContext';
import { getEliaSymbol, getCharactersByLevel } from '@/data/eliaMapping';
import { shuffleArray } from '@/lib/utils';

interface CharacterExerciseProps {
  level: number;
  onComplete: (accuracy: number) => void;
  onBack: () => void;
}

export default function CharacterExercise({ level, onComplete, onBack }: CharacterExerciseProps) {
  const { state, dispatch } = useApp();
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [exerciseCharacters, setExerciseCharacters] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'correct' | 'incorrect'>('correct');
  const [correctCount, setCorrectCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  // Initialize exercise characters
  useEffect(() => {
    const levelCharacters = getCharactersByLevel(level);
    const exerciseSet = [...levelCharacters, ...levelCharacters, ...levelCharacters]; // 3x repetition
    setExerciseCharacters(shuffleArray(exerciseSet));
    setStartTime(Date.now());
  }, [level]);

  const currentCharacter = exerciseCharacters[currentCharacterIndex];
  const currentEliaSymbol = currentCharacter ? getEliaSymbol(currentCharacter) : '';

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!currentCharacter || showFeedback) return;

    const typedKey = event.key.toUpperCase();
    const isCorrect = typedKey === currentCharacter;
    const responseTime = startTime ? Date.now() - startTime : 0;

    // Log keystroke
    dispatch({
      type: 'LOG_KEYSTROKE',
      payload: {
        timestamp: Date.now(),
        promptedCharacter: currentCharacter,
        typedCharacter: typedKey,
        correct: isCorrect,
        latency: responseTime,
        level
      }
    });

    // Update accuracy tracking
    dispatch({
      type: 'UPDATE_ACCURACY',
      payload: {
        character: currentCharacter,
        correct: isCorrect
      }
    });

    // Update local counts
    setTotalCount(prev => prev + 1);
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }

    // Show feedback
    setFeedbackType(isCorrect ? 'correct' : 'incorrect');
    setShowFeedback(true);

    // Move to next character or complete exercise
    setTimeout(() => {
      setShowFeedback(false);
      if (currentCharacterIndex + 1 >= exerciseCharacters.length) {
        // Exercise complete
        const finalAccuracy = Math.round(((correctCount + (isCorrect ? 1 : 0)) / (totalCount + 1)) * 100);
        onComplete(finalAccuracy);
      } else {
        setCurrentCharacterIndex(prev => prev + 1);
        setStartTime(Date.now());
      }
    }, 800);
  }, [currentCharacter, showFeedback, currentCharacterIndex, exerciseCharacters.length, correctCount, totalCount, startTime, level, dispatch, onComplete]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  if (!currentCharacter) {
    return <div className="text-center p-8">Loading exercise...</div>;
  }

  const progress = ((currentCharacterIndex + 1) / exerciseCharacters.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      {/* Header with Back Button */}
      <div className="absolute top-4 left-4">
        <button
          onClick={onBack}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <span>←</span>
          <span>Back to Levels</span>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md mb-8">
        <div className="bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2 text-center">
          Character {currentCharacterIndex + 1} of {exerciseCharacters.length}
        </p>
      </div>

      {/* ELIA Character Display */}
      <div className={`relative transition-all duration-300 ${showFeedback ? 'scale-110' : 'scale-100'}`}>
        <div
          className={`text-8xl elia-font p-8 rounded-lg border-4 transition-all duration-300 ${
            showFeedback
              ? feedbackType === 'correct'
                ? 'bg-green-100 border-green-500 text-green-800'
                : 'bg-red-100 border-red-500 text-red-800'
              : 'bg-white border-gray-300 text-gray-800'
          }`}
        >
          {currentEliaSymbol}
        </div>

        {showFeedback && (
          <div className={`absolute inset-0 flex items-center justify-center text-2xl font-bold ${
            feedbackType === 'correct' ? 'text-green-600' : 'text-red-600'
          }`}>
            {feedbackType === 'correct' ? '✓' : '✗'}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-8 text-center">
        <p className="text-lg text-gray-700">
          Type the corresponding letter for this ELIA character
        </p>
      </div>

      {/* Statistics */}
      <div className="mt-8 flex space-x-8 text-sm text-gray-600">
        <div>Accuracy: {totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0}%</div>
        <div>Correct: {correctCount}</div>
        <div>Total: {totalCount}</div>
      </div>
    </div>
  );
}