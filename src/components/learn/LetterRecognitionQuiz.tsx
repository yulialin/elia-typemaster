'use client';

import React, { useState, useMemo } from 'react';
import { MultipleChoiceQuestion } from '@/types/learn';

interface LetterRecognitionQuizProps {
  questions: MultipleChoiceQuestion[];
  onComplete: () => void;
}

// Utility function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function LetterRecognitionQuiz({ questions, onComplete }: LetterRecognitionQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = questions[currentIndex];

  // Randomize choices for current question (memoized per question)
  const shuffledChoices = useMemo(() => {
    return shuffleArray(currentQuestion.choices);
  }, [currentIndex, currentQuestion.choices]);

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (answer === currentQuestion.correctAnswer) {
      // Auto-advance after 1.5s
      setTimeout(() => {
        if (isLastQuestion) {
          onComplete();
        } else {
          setCurrentIndex(prev => prev + 1);
          setSelectedAnswer(null);
          setShowFeedback(false);
        }
      }, 1500);
    }
  };

  const handleTryAgain = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const isEliaToRoman = currentQuestion.type === 'elia-to-roman';

  return (
    <div className="letter-recognition-quiz max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">
          Part 2A: Letter Recognition Quiz
        </h2>
        <p className="text-gray-700 mb-4">
          Identify the correct letter for each character shown.
        </p>

        <div className="progress-bar mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <span>{Math.round(((currentIndex + (showFeedback && isCorrect ? 1 : 0)) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${((currentIndex + (showFeedback && isCorrect ? 1 : 0)) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="question-container bg-white rounded-lg border-2 border-gray-200 p-8 mb-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6 text-gray-900 text-center">
          {currentQuestion.questionText}
        </h3>

        {/* Display Character */}
        <div className={`character-display text-center my-8 p-12 rounded-xl ${
          isEliaToRoman ? 'bg-blue-50' : 'bg-gray-50'
        }`}>
          <div
            className={`text-8xl ${isEliaToRoman ? 'font-elia' : 'font-bold'} text-gray-900 flex items-center justify-center`}
            style={{ minHeight: '120px' }}
          >
            {currentQuestion.displayCharacter}
          </div>
        </div>
      </div>

      {/* Answer Options - RANDOMIZED */}
      <div className="options-grid grid grid-cols-2 gap-4 mb-6">
        {shuffledChoices.map((choice, index) => {
          const isSelected = selectedAnswer === choice;
          const showCorrect = showFeedback && choice === currentQuestion.correctAnswer;
          const showIncorrect = showFeedback && isSelected && !isCorrect;

          return (
            <button
              key={index}
              onClick={() => !showFeedback && handleAnswerSelect(choice)}
              disabled={showFeedback}
              className={`
                option-button p-8 text-4xl rounded-lg border-3 transition-all font-bold
                ${isEliaToRoman ? '' : 'font-elia'}
                ${showCorrect ? 'bg-green-500 text-white border-green-600 scale-105 shadow-lg' : ''}
                ${showIncorrect ? 'bg-red-500 text-white border-red-600' : ''}
                ${!showFeedback ? 'hover:bg-blue-50 hover:border-blue-400 border-gray-300 bg-white text-gray-900 hover:scale-105' : ''}
                ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
              style={{ minHeight: '120px' }}
            >
              <div className="flex items-center justify-center h-full">
                {choice}
                {showCorrect && <span className="ml-3 text-2xl">✓</span>}
                {showIncorrect && <span className="ml-3 text-2xl">✗</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback Message */}
      {showFeedback && (
        <div
          className={`feedback-message p-6 rounded-lg text-center transition-all ${
            isCorrect
              ? 'bg-green-100 border-2 border-green-300'
              : 'bg-red-100 border-2 border-red-300'
          }`}
        >
          <div className={`font-bold text-xl mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
            {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
          </div>
          {isCorrect && !isLastQuestion && (
            <div className="text-green-700 text-sm">Moving to next question...</div>
          )}
          {isCorrect && isLastQuestion && (
            <div className="text-green-700 text-sm">Completing quiz...</div>
          )}
          {!isCorrect && (
            <>
              <div className="text-red-700 mb-3">
                The correct answer is <span className="font-bold">{currentQuestion.correctAnswer}</span>
              </div>
              <button
                onClick={handleTryAgain}
                className="mt-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
              >
                Try Again
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
