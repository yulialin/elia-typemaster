'use client';

import React, { useState, useRef, useEffect } from 'react';
import { TranslationQuestion } from '@/types/learn';

interface WordTranslationQuizProps {
  questions: TranslationQuestion[];
  onComplete: () => void;
}

export default function WordTranslationQuiz({ questions, onComplete }: WordTranslationQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  // Auto-focus input on mount and question change
  useEffect(() => {
    inputRef.current?.focus();
  }, [currentIndex]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const trimmedInput = userInput.trim().toLowerCase();
    const correctAnswer = currentQuestion.correctAnswer.toLowerCase();
    const correct = trimmedInput === correctAnswer;

    setIsCorrect(correct);
    setShowFeedback(true);
    setAttempts(prev => prev + 1);

    if (correct) {
      // Auto-advance after 1.5s
      setTimeout(() => {
        if (isLastQuestion) {
          onComplete();
        } else {
          setCurrentIndex(prev => prev + 1);
          setUserInput('');
          setShowFeedback(false);
          setAttempts(0);
          setShowHint(false);
        }
      }, 1500);
    } else {
      // Show hint after 2 failed attempts
      if (attempts >= 1 && currentQuestion.hints && currentQuestion.hints.length > 0) {
        setShowHint(true);
      }
    }
  };

  const handleTryAgain = () => {
    setShowFeedback(false);
    inputRef.current?.focus();
  };

  const handleShowAnswer = () => {
    setUserInput(currentQuestion.correctAnswer);
    setIsCorrect(true);
    setShowFeedback(true);
    setTimeout(() => {
      if (isLastQuestion) {
        onComplete();
      } else {
        setCurrentIndex(prev => prev + 1);
        setUserInput('');
        setShowFeedback(false);
        setAttempts(0);
        setShowHint(false);
      }
    }, 2000);
  };

  return (
    <div className="word-translation-quiz max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">
          Part 2C: Word Translation Quiz
        </h2>
        <p className="text-gray-700 mb-4">
          Type the English translation of each ELIA word shown.
        </p>

        <div className="progress-bar mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Word {currentIndex + 1} of {questions.length}</span>
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
          Type the English translation of this word:
        </h3>

        {/* Display ELIA Word */}
        <div className="elia-word-display bg-gradient-to-br from-purple-50 to-purple-100 text-center my-8 p-8 rounded-xl border-2 border-purple-200">
          <div
            className="font-elia text-purple-900 mb-2 flex items-center justify-center px-2"
            style={{
              fontSize: currentQuestion.eliaWord.length <= 3 ? 'clamp(2.5rem, 7vw, 4.5rem)' :
                        currentQuestion.eliaWord.length === 4 ? 'clamp(2rem, 6vw, 3.5rem)' :
                        'clamp(1.5rem, 5vw, 2.5rem)',
              minHeight: '80px',
              whiteSpace: 'nowrap',
              lineHeight: '1.2'
            }}
          >
            {currentQuestion.eliaWord}
          </div>
          <div className="text-sm text-purple-600 font-medium">ELIA Frames</div>
        </div>

        {/* Hint Display */}
        {showHint && currentQuestion.hints && (
          <div className="hint-box bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-4 text-center">
            <div className="text-yellow-800 font-semibold mb-1">💡 Hint</div>
            <div className="text-yellow-700">
              Starts with: <span className="font-bold text-lg">{currentQuestion.hints[0]}</span>
            </div>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mt-6">
          <label htmlFor="translation-input" className="block text-sm font-medium text-gray-700 mb-2">
            Your answer:
          </label>
          <input
            ref={inputRef}
            id="translation-input"
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={showFeedback && isCorrect}
            className={`w-full px-4 py-4 text-xl border-2 rounded-lg transition-colors
              ${showFeedback && isCorrect ? 'border-green-500 bg-green-50' : ''}
              ${showFeedback && !isCorrect ? 'border-red-500 bg-red-50' : ''}
              ${!showFeedback ? 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' : ''}
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            placeholder="Type your answer here..."
            autoComplete="off"
            spellCheck="false"
          />
          {!showFeedback && (
            <button
              type="submit"
              disabled={!userInput.trim()}
              className={`w-full mt-4 px-6 py-4 rounded-lg font-bold text-lg transition-colors
                ${userInput.trim()
                  ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              Submit Answer
            </button>
          )}
        </form>
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
            <div className="text-green-700 text-sm">Moving to next word...</div>
          )}
          {isCorrect && isLastQuestion && (
            <div className="text-green-700 text-sm font-semibold">
              🎉 Quiz Complete! Well done!
            </div>
          )}
          {!isCorrect && (
            <>
              <div className="text-red-700 mb-4">
                Your answer: <span className="font-bold">{userInput}</span>
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleTryAgain}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                >
                  Try Again
                </button>
                {attempts >= 2 && (
                  <button
                    onClick={handleShowAnswer}
                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                  >
                    Show Answer
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}

      <div className="text-center text-sm text-gray-500 mt-6">
        Answers are case-insensitive
      </div>
    </div>
  );
}
