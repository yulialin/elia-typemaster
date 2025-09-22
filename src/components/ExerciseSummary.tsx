'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';

interface ExerciseSummaryProps {
  accuracy: number;
  level: number;
  incorrectCharacters: string[];
  onContinue: () => void;
  onRetry: () => void;
  onBack: () => void;
}

export default function ExerciseSummary({
  accuracy,
  level,
  incorrectCharacters,
  onContinue,
  onRetry,
  onBack
}: ExerciseSummaryProps) {
  const { dispatch } = useApp();
  const [showReward, setShowReward] = useState(false);
  const isPerfect = accuracy === 100;
  const canProgress = accuracy >= 95;

  useEffect(() => {
    if (isPerfect) {
      setShowReward(true);
      // Auto-hide reward after 3 seconds
      const timer = setTimeout(() => setShowReward(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isPerfect]);

  const catVideos = [
    "🐱 A cat gracefully jumps onto a keyboard!",
    "😸 Fluffy kitten chases its tail in circles!",
    "🐈 Cat successfully 'helps' with typing by walking across keys!",
    "😺 Sleepy cat curls up next to a warm laptop!",
    "🐱‍💻 Tech-savvy cat appears to debug code!"
  ];

  const randomCatVideo = catVideos[Math.floor(Math.random() * catVideos.length)];

  const handleContinue = () => {
    if (canProgress) {
      dispatch({ type: 'COMPLETE_LEVEL', payload: level });
    }
    onContinue();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-8">
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

      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        {/* Reward Animation for Perfect Score */}
        {showReward && (
          <div className="mb-6 p-4 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-lg border-2 border-yellow-400">
            <div className="text-2xl mb-2">🎉 Perfect Score! 🎉</div>
            <div className="text-lg text-gray-700 font-medium">
              {randomCatVideo}
            </div>
            <div className="mt-2 text-4xl animate-bounce">
              🐾
            </div>
          </div>
        )}

        {/* Accuracy Display */}
        <div className="mb-6">
          <div
            className={`text-6xl font-bold mb-2 ${
              accuracy >= 95
                ? 'text-green-600'
                : accuracy >= 80
                ? 'text-yellow-600'
                : 'text-red-600'
            }`}
          >
            {accuracy}%
          </div>
          <p className="text-lg text-gray-700">Accuracy</p>
        </div>

        {/* Performance Message */}
        <div className="mb-6">
          {accuracy === 100 && (
            <div className="p-4 bg-green-100 border border-green-400 rounded-lg">
              <h3 className="text-green-800 font-bold text-lg mb-2">
                Outstanding! 🌟
              </h3>
              <p className="text-green-700">
                Perfect accuracy! You&apos;re building excellent muscle memory.
              </p>
            </div>
          )}

          {accuracy >= 95 && accuracy < 100 && (
            <div className="p-4 bg-green-100 border border-green-400 rounded-lg">
              <h3 className="text-green-800 font-bold text-lg mb-2">
                Excellent Work! ✨
              </h3>
              <p className="text-green-700">
                Great accuracy! You can progress to the next level.
              </p>
            </div>
          )}

          {accuracy >= 80 && accuracy < 95 && (
            <div className="p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
              <h3 className="text-yellow-800 font-bold text-lg mb-2">
                Good Progress! 💪
              </h3>
              <p className="text-yellow-700">
                You&apos;re improving! Try again to reach 95% accuracy for the next level.
              </p>
            </div>
          )}

          {accuracy < 80 && (
            <div className="p-4 bg-blue-100 border border-blue-400 rounded-lg">
              <h3 className="text-blue-800 font-bold text-lg mb-2">
                Keep Practicing! 📚
              </h3>
              <p className="text-blue-700">
                Learning takes time. Focus on accuracy over speed!
              </p>
            </div>
          )}
        </div>

        {/* Characters Needing Practice */}
        {incorrectCharacters.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="text-red-800 font-semibold mb-2">
              Characters to Practice:
            </h4>
            <div className="flex flex-wrap justify-center space-x-2">
              {incorrectCharacters.map((char, index) => (
                <span
                  key={index}
                  className="bg-red-200 text-red-800 px-2 py-1 rounded font-mono font-bold"
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {canProgress && (
            <button
              onClick={handleContinue}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Continue to Next Level
            </button>
          )}

          <button
            onClick={onRetry}
            className={`w-full font-bold py-3 px-6 rounded-lg transition-colors ${
              canProgress
                ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {canProgress ? 'Practice This Level Again' : 'Try Again'}
          </button>
        </div>

        {/* Requirement Note */}
        {!canProgress && (
          <p className="mt-4 text-sm text-gray-600">
            Need 95% accuracy to unlock the next level
          </p>
        )}
      </div>
    </div>
  );
}