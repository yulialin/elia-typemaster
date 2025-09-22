'use client';

import React from 'react';

interface MindfulnessPromptProps {
  onBegin: () => void;
  onBack: () => void;
}

export default function MindfulnessPrompt({ onBegin, onBack }: MindfulnessPromptProps) {
  const handleKeyPress = (event: KeyboardEvent) => {
    onBegin();
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <button
          onClick={onBack}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <span>←</span>
          <span>Back to Levels</span>
        </button>
      </div>

      <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
        {/* Hand Placement Illustration */}
        <div className="mb-6">
          <div className="relative mx-auto w-64 h-32 bg-gray-100 rounded-lg border-2 border-gray-300">
            {/* Keyboard representation */}
            <div className="absolute top-2 left-4 right-4">
              {/* Top row */}
              <div className="flex justify-center space-x-1 mb-1">
                {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key) => (
                  <div key={key} className="w-6 h-6 bg-gray-200 rounded text-xs flex items-center justify-center">
                    {key}
                  </div>
                ))}
              </div>
              {/* Home row - highlighted */}
              <div className="flex justify-center space-x-1 mb-1">
                {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((key) => (
                  <div
                    key={key}
                    className={`w-6 h-6 rounded text-xs flex items-center justify-center ${
                      ['A', 'S', 'D', 'F', 'J', 'K', 'L'].includes(key)
                        ? 'bg-blue-200 text-blue-800 font-semibold border border-blue-400'
                        : 'bg-gray-200'
                    }`}
                  >
                    {key}
                  </div>
                ))}
              </div>
              {/* Bottom row */}
              <div className="flex justify-center space-x-1">
                {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((key) => (
                  <div key={key} className="w-6 h-6 bg-gray-200 rounded text-xs flex items-center justify-center">
                    {key}
                  </div>
                ))}
              </div>
            </div>

            {/* Finger position indicators */}
            <div className="absolute bottom-1 left-4 right-4 flex justify-center space-x-1">
              <div className="w-6 h-2 bg-pink-300 rounded-t"></div>
              <div className="w-6 h-2 bg-yellow-300 rounded-t"></div>
              <div className="w-6 h-2 bg-green-300 rounded-t"></div>
              <div className="w-6 h-2 bg-blue-300 rounded-t"></div>
              <div className="w-2"></div>
              <div className="w-6 h-2 bg-blue-300 rounded-t"></div>
              <div className="w-6 h-2 bg-green-300 rounded-t"></div>
              <div className="w-6 h-2 bg-yellow-300 rounded-t"></div>
              <div className="w-6 h-2 bg-pink-300 rounded-t"></div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Prepare for Your Session
        </h2>

        <div className="space-y-4 text-gray-700">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              1
            </div>
            <p className="text-left">Position your fingers on the home row keys (ASDF and JKL;)</p>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              2
            </div>
            <p className="text-left">Sit up straight with your feet flat on the floor</p>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              3
            </div>
            <p className="text-left">Take three deep breaths to focus your mind</p>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800 font-medium">
            Click anywhere or press any key to begin
          </p>
        </div>
      </div>
    </div>
  );
}