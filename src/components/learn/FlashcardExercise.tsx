'use client';

import React, { useState } from 'react';
import { Exercise } from '@/types/learn';

interface FlashcardExerciseProps {
  exercise: Exercise;
  onComplete: () => void;
}

export default function FlashcardExercise({ exercise, onComplete }: FlashcardExerciseProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showElia, setShowElia] = useState(false);

  if (!exercise.words || exercise.words.length === 0) {
    return <div>No words available</div>;
  }

  const currentWord = exercise.words[currentWordIndex];
  const isLastWord = currentWordIndex === exercise.words.length - 1;

  const handleNext = () => {
    if (isLastWord) {
      onComplete();
    } else {
      setCurrentWordIndex(prev => prev + 1);
      setShowElia(false);
    }
  };

  const handleFlip = () => {
    setShowElia(!showElia);
  };

  return (
    <div className="flashcard-container">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">{exercise.question}</h3>

      <div className="progress-indicator text-sm text-gray-700 mb-4">
        Word {currentWordIndex + 1} of {exercise.words.length}
      </div>

      <div
        className="flashcard cursor-pointer"
        onClick={handleFlip}
        style={{ perspective: '1000px', minHeight: '300px' }}
      >
        <div
          className={`flashcard-inner relative w-full h-full transition-transform duration-500 ${
            showElia ? 'rotate-y-180' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transform: showElia ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* Front - Roman */}
          <div
            className="flashcard-front absolute w-full h-full bg-white border-2 border-gray-300 rounded-lg p-8 flex items-center justify-center"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            <div className="text-center">
              <div className="text-5xl font-bold mb-4 text-gray-900">{currentWord}</div>
              <div className="text-sm text-gray-600">Tap to see ELIA</div>
            </div>
          </div>

          {/* Back - ELIA */}
          <div
            className="flashcard-back absolute w-full h-full bg-blue-50 border-2 border-blue-300 rounded-lg p-8 flex items-center justify-center"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <div className="text-center">
              <div className="text-5xl font-elia mb-4 text-gray-900">{currentWord.toUpperCase()}</div>
              <div className="text-sm text-gray-700">ELIA Frames</div>
            </div>
          </div>
        </div>
      </div>

      <div className="controls mt-6 flex gap-4">
        <button
          onClick={handleFlip}
          className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Flip Card
        </button>
        <button
          onClick={handleNext}
          className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          {isLastWord ? 'Complete' : 'Next Word'}
        </button>
      </div>
    </div>
  );
}
