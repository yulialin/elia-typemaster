'use client';

import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { levels } from '@/data/eliaMapping';

interface LevelSelectorProps {
  onSelectLevel: (level: number) => void;
  onSelectPractice: (level: number) => void;
}

export default function LevelSelector({ onSelectLevel, onSelectPractice }: LevelSelectorProps) {
  const { state } = useApp();
  const { userProgress } = state;

  const isLevelUnlocked = (levelId: number) => {
    if (levelId === 1) return true;
    return userProgress.completedLevels.includes(levelId - 1);
  };

  const isLevelCompleted = (levelId: number) => {
    return userProgress.completedLevels.includes(levelId);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            ELIA TypeMaster
          </h1>
          <p className="text-lg text-gray-600">
            Learn to type the ELIA Frames™ alphabet with interactive lessons
          </p>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Progress</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {userProgress.currentLevel}
              </div>
              <div className="text-gray-600">Current Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {userProgress.completedLevels.length}
              </div>
              <div className="text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Object.keys(userProgress.accuracy).length}
              </div>
              <div className="text-gray-600">Characters Learned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {userProgress.totalAttempts ?
                  Object.values(userProgress.totalAttempts).reduce((a, b) => a + b, 0) : 0}
              </div>
              <div className="text-gray-600">Total Attempts</div>
            </div>
          </div>
        </div>

        {/* Learning Path */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Module 1: Learning Path
          </h2>
          <div className="grid gap-4">
            {levels.map((level) => (
              <div
                key={level.id}
                className={`bg-white rounded-lg p-6 shadow-sm border-2 transition-all ${
                  isLevelCompleted(level.id)
                    ? 'border-green-500 bg-green-50'
                    : isLevelUnlocked(level.id)
                    ? 'border-blue-500 hover:shadow-md'
                    : 'border-gray-200 opacity-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${
                        isLevelCompleted(level.id)
                          ? 'bg-green-500 text-white'
                          : isLevelUnlocked(level.id)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {isLevelCompleted(level.id) ? '✓' : level.id}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Level {level.id}: {level.name}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-2">{level.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {level.characters.map((char) => (
                        <span
                          key={char}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-mono"
                        >
                          {char}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 ml-4">
                    <button
                      onClick={() => onSelectLevel(level.id)}
                      disabled={!isLevelUnlocked(level.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        isLevelUnlocked(level.id)
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {isLevelCompleted(level.id) ? 'Review' : 'Start'}
                    </button>
                    {isLevelCompleted(level.id) && (
                      <button
                        onClick={() => onSelectPractice(level.id)}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                      >
                        Practice
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Practice Arena Access */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Module 2: Practice Arena
          </h2>
          <p className="text-gray-600 mb-4">
            Build your speed and reinforce learning with word and sentence practice.
          </p>
          {userProgress.completedLevels.length > 0 ? (
            <div className="flex space-x-4">
              {userProgress.completedLevels.map((levelId) => (
                <button
                  key={levelId}
                  onClick={() => onSelectPractice(levelId)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Practice Level {levelId}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">
              Complete at least one level in the Learning Path to unlock the Practice Arena.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}