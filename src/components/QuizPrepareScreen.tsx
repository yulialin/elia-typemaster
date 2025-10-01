'use client';

import React, { useState, useEffect } from 'react';

interface QuizPrepareScreenProps {
  lessonName: string;
  onStartQuiz: () => void;
  onCancel: () => void;
}

export default function QuizPrepareScreen({
  lessonName,
  onStartQuiz,
  onCancel
}: QuizPrepareScreenProps) {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);

  const startCountdown = () => {
    setIsReady(true);
    setCountdown(3);
  };

  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onStartQuiz();
    }
  }, [countdown, onStartQuiz]);

  // Global keydown listener for "press any key"
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (!isReady) {
        e.preventDefault();
        startCountdown();
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isReady]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (!isReady) {
      e.preventDefault();
      startCountdown();
    }
  };

  const handleClick = () => {
    if (!isReady) {
      startCountdown();
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4"
      tabIndex={0}
      onKeyDown={handleKeyPress}
      onClick={handleClick}
    >
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full text-center">
        {!isReady ? (
          <>
            {/* Prepare Instructions */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Quiz: {lessonName}
              </h1>
              <div className="text-lg text-gray-600 mb-6">
                <p className="mb-2">Position your fingers on the home row.</p>
                <p className="mb-2">Take three deep breaths to focus.</p>
                <p className="font-semibold text-indigo-600">
                  Click or press any key to begin.
                </p>
              </div>
            </div>

            {/* Hand Position Graphic */}
            <div className="mb-8">
              <div className="bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6 mx-auto max-w-lg shadow-inner">
                <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">
                  Home Row Position
                </h3>

                {/* Keyboard Layout */}
                <div className="mb-6">
                  <div className="flex justify-center space-x-2 mb-4">
                    {/* Left Hand Keys */}
                    <div className="relative bg-blue-500 text-white rounded-lg p-3 min-w-[40px] text-center shadow-md border-b-4 border-blue-600">
                      <div className="font-bold text-lg">A</div>
                      <div className="text-xs mt-1 opacity-90">Pinky</div>
                    </div>
                    <div className="relative bg-blue-500 text-white rounded-lg p-3 min-w-[40px] text-center shadow-md border-b-4 border-blue-600">
                      <div className="font-bold text-lg">S</div>
                      <div className="text-xs mt-1 opacity-90">Ring</div>
                    </div>
                    <div className="relative bg-blue-500 text-white rounded-lg p-3 min-w-[40px] text-center shadow-md border-b-4 border-blue-600">
                      <div className="font-bold text-lg">D</div>
                      <div className="text-xs mt-1 opacity-90">Middle</div>
                    </div>
                    <div className="relative bg-blue-600 text-white rounded-lg p-3 min-w-[40px] text-center shadow-md border-b-4 border-blue-700">
                      <div className="font-bold text-lg">F</div>
                      <div className="text-xs mt-1 opacity-90">Index</div>
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                    </div>

                    {/* Spacer */}
                    <div className="w-8"></div>

                    {/* Right Hand Keys */}
                    <div className="relative bg-green-600 text-white rounded-lg p-3 min-w-[40px] text-center shadow-md border-b-4 border-green-700">
                      <div className="font-bold text-lg">J</div>
                      <div className="text-xs mt-1 opacity-90">Index</div>
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="relative bg-green-500 text-white rounded-lg p-3 min-w-[40px] text-center shadow-md border-b-4 border-green-600">
                      <div className="font-bold text-lg">K</div>
                      <div className="text-xs mt-1 opacity-90">Middle</div>
                    </div>
                    <div className="relative bg-green-500 text-white rounded-lg p-3 min-w-[40px] text-center shadow-md border-b-4 border-green-600">
                      <div className="font-bold text-lg">L</div>
                      <div className="text-xs mt-1 opacity-90">Ring</div>
                    </div>
                    <div className="relative bg-green-500 text-white rounded-lg p-3 min-w-[40px] text-center shadow-md border-b-4 border-green-600">
                      <div className="font-bold text-lg">;</div>
                      <div className="text-xs mt-1 opacity-90">Pinky</div>
                    </div>
                  </div>
                </div>

                {/* Hand Labels */}
                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="font-medium">Left Hand</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="font-medium">Right Hand</span>
                  </div>
                </div>

                {/* Instructions */}
                <div className="text-center">
                  <p className="text-sm text-gray-700 mb-2 font-medium">
                    Position your fingers on the home row keys
                  </p>
                  <p className="text-xs text-gray-600">
                    White dots on F and J indicate finger placement bumps
                  </p>
                </div>
              </div>
            </div>

            {/* Breathing Exercise */}
            <div className="mb-8">
              <div className="flex justify-center items-center space-x-2 text-gray-600">
                <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Take a moment to breathe and focus</span>
                <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={onCancel}
                className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={startCountdown}
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
              >
                I&apos;m Ready
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Countdown */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">
                Quiz starts in...
              </h2>

              {countdown !== null && countdown > 0 ? (
                <div className="text-8xl font-bold text-indigo-600 animate-pulse">
                  {countdown}
                </div>
              ) : (
                <div className="text-4xl font-bold text-green-600">
                  Go!
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}