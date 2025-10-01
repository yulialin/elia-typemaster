'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '@/contexts/AppContext';
import { getEliaSymbol, getLessonData } from '@/data/eliaMapping';
import { calculateWPM } from '@/lib/utils';

interface PracticeArenaProps {
  level: number;
  onBack: () => void;
}

export default function PracticeArena({ level, onBack }: PracticeArenaProps) {
  const { dispatch } = useApp();
  const [practiceText, setPracticeText] = useState('');
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  // Initialize practice text
  useEffect(() => {
    const levelData = getLessonData(level);
    if (levelData && levelData.practiceModules.length > 0) {
      const randomText = levelData.practiceModules[Math.floor(Math.random() * levelData.practiceModules.length)];
      setPracticeText(randomText.toLowerCase());
    }
  }, [level]);

  // Convert practice text to ELIA symbols
  const eliaText = practiceText.split('').map(char =>
    char === ' ' ? ' ' : getEliaSymbol(char)
  ).join('');

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (isComplete) return;

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
      const expectedChar = practiceText[currentIndex];
      const isCorrect = key.toLowerCase() === expectedChar;

      if (!isCorrect) {
        setErrors(prev => prev + 1);
      }

      const newTypedText = typedText + key.toLowerCase();
      setTypedText(newTypedText);
      setCurrentIndex(prev => prev + 1);

      // Log keystroke
      dispatch({
        type: 'LOG_KEYSTROKE',
        payload: {
          timestamp: Date.now(),
          promptedCharacter: expectedChar,
          typedCharacter: key.toLowerCase(),
          correct: isCorrect,
          latency: startTime ? Date.now() - startTime : 0,
          level
        }
      });

      // Check if exercise is complete
      if (newTypedText.length === practiceText.length) {
        setIsComplete(true);
        if (startTime) {
          const timeMinutes = (Date.now() - startTime) / 60000;
          const calculatedWpm = calculateWPM(practiceText.length, timeMinutes);
          const calculatedAccuracy = Math.round(((practiceText.length - errors) / practiceText.length) * 100);
          setWpm(calculatedWpm);
          setAccuracy(calculatedAccuracy);
        }
      }
    }
  }, [practiceText, typedText, currentIndex, isComplete, startTime, errors, level, dispatch]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const handleNewText = () => {
    const levelData = getLessonData(level);
    if (levelData && levelData.practiceModules.length > 0) {
      const randomText = levelData.practiceModules[Math.floor(Math.random() * levelData.practiceModules.length)];
      setPracticeText(randomText.toLowerCase());
      setTypedText('');
      setCurrentIndex(0);
      setErrors(0);
      setStartTime(null);
      setIsComplete(false);
      setWpm(0);
      setAccuracy(100);
    }
  };

  if (!practiceText) {
    return <div className="text-center p-8">Loading practice text...</div>;
  }

  const renderText = () => {
    return practiceText.split('').map((char, index) => {
      let className = 'text-2xl font-mono ';

      if (index < typedText.length) {
        // Already typed
        className += typedText[index] === char ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800';
      } else if (index === currentIndex && !isComplete) {
        // Current character
        className += 'bg-blue-200 text-blue-800 border-b-2 border-blue-500';
      } else {
        // Not yet typed
        className += 'text-gray-600';
      }

      return (
        <span key={index} className={className}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  };

  const renderEliaText = () => {
    return eliaText.split('').map((char, index) => {
      let className = 'text-2xl elia-font ';

      if (index < typedText.length) {
        // Already typed
        className += typedText[index] === practiceText[index] ? 'text-green-600' : 'text-red-600';
      } else if (index === currentIndex && !isComplete) {
        // Current character
        className += 'text-blue-600 font-bold';
      } else {
        // Not yet typed
        className += 'text-gray-800';
      }

      return (
        <span key={index} className={className}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Practice Arena</h1>
          <button
            onClick={onBack}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            Back to Levels
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">
              {startTime ? Math.round((Date.now() - startTime) / 1000) : 0}s
            </div>
            <div className="text-gray-600">Time</div>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{wpm}</div>
            <div className="text-gray-600">WPM</div>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(((currentIndex - errors) / Math.max(currentIndex, 1)) * 100)}%
            </div>
            <div className="text-gray-600">Accuracy</div>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-red-600">{errors}</div>
            <div className="text-gray-600">Errors</div>
          </div>
        </div>

        {/* ELIA Text Display */}
        <div className="bg-white rounded-lg p-6 mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">ELIA Text:</h3>
          <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200 leading-relaxed">
            {renderEliaText()}
          </div>
        </div>

        {/* Roman Text Display */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Type This:</h3>
          <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200 leading-relaxed">
            {renderText()}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <p className="text-blue-800">
            <strong>Instructions:</strong> Look at the ELIA characters above and type the corresponding
            Roman letters. Focus on accuracy first, then speed will come naturally!
          </p>
        </div>

        {/* Completion Message */}
        {isComplete && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Exercise Complete!</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-3xl font-bold text-green-600">{wpm}</div>
                <div className="text-green-700">Words Per Minute</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">{accuracy}%</div>
                <div className="text-green-700">Accuracy</div>
              </div>
            </div>
            <button
              onClick={handleNewText}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg"
            >
              Try Another Text
            </button>
          </div>
        )}
      </div>
    </div>
  );
}