'use client';

import React, { useState } from 'react';
import { Exercise } from '@/types/learn';

interface MultipleChoiceExerciseProps {
  exercise: Exercise;
  onComplete: () => void;
}

export default function MultipleChoiceExercise({ exercise, onComplete }: MultipleChoiceExerciseProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (answer === exercise.correctAnswer) {
      setTimeout(() => {
        onComplete();
        setShowFeedback(false);
        setSelectedAnswer(null);
      }, 1500);
    }
  };

  const handleTryAgain = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const isCorrect = selectedAnswer === exercise.correctAnswer;

  return (
    <div className="exercise-container">
      <div className="exercise-question">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">{exercise.question}</h3>

        {exercise.eliaCharacter && (
          <div className="elia-display text-6xl font-elia text-center my-6 p-8 bg-gray-100 rounded-lg text-gray-900">
            {exercise.eliaCharacter}
          </div>
        )}

        {exercise.romanCharacter && (
          <div className="roman-display text-6xl text-center my-6 p-8 bg-gray-100 rounded-lg font-bold text-gray-900">
            {exercise.romanCharacter}
          </div>
        )}
      </div>

      <div className="options-grid grid grid-cols-2 gap-4 mt-6">
        {exercise.options?.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const showCorrect = showFeedback && option === exercise.correctAnswer;
          const showIncorrect = showFeedback && isSelected && !isCorrect;

          return (
            <button
              key={index}
              onClick={() => !showFeedback && handleAnswerSelect(option)}
              disabled={showFeedback}
              className={`
                option-button p-6 text-2xl rounded-lg border-2 transition-all
                ${exercise.romanCharacter ? 'font-elia' : 'font-bold'}
                ${showCorrect ? 'bg-green-500 text-white border-green-600' : ''}
                ${showIncorrect ? 'bg-red-500 text-white border-red-600' : ''}
                ${!showFeedback ? 'hover:bg-blue-50 border-gray-300 bg-white text-gray-900' : ''}
                ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {option}
              {showCorrect && <span className="ml-2">✓</span>}
              {showIncorrect && <span className="ml-2">✗</span>}
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div className={`feedback-message mt-4 p-4 rounded-lg text-center ${
          isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          <div className="font-semibold mb-2">
            {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
          </div>
          {!isCorrect && (
            <button
              onClick={handleTryAgain}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Try Again
            </button>
          )}
        </div>
      )}
    </div>
  );
}
