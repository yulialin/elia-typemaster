'use client';

import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { lessons } from '@/data/eliaMapping';

interface ProgressTrackerProps {
  className?: string;
}

export default function ProgressTracker({ className = '' }: ProgressTrackerProps) {
  const { state } = useApp();
  const totalLessons = lessons.length;

  // Calculate different metrics
  const passedQuizzes = state.userProgress.completedLevels.length;
  const attemptedLessons = Object.keys(state.userProgress.lessonScores).length;
  const progressPercentage = Math.round((passedQuizzes / totalLessons) * 100);

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="text-xl font-bold text-gray-800 mb-4">Overall Progress</h3>

      {/* Main Progress Ring/Bar */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#10b981"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${progressPercentage * 2.51} 251`}
              className="transition-all duration-500 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{progressPercentage}%</div>
              <div className="text-xs text-gray-600">Complete</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Statistics */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Quizzes Passed:</span>
          <span className="font-semibold text-gray-800">
            {passedQuizzes} / {totalLessons}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Lessons Attempted:</span>
          <span className="font-semibold text-gray-800">
            {attemptedLessons} / {totalLessons}
          </span>
        </div>


        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Motivational Message */}
        <div className="text-center mt-4">
          {progressPercentage === 100 ? (
            <p className="text-green-600 font-semibold">
              🎉 Congratulations! You've completed all lessons!
            </p>
          ) : progressPercentage >= 75 ? (
            <p className="text-blue-600 font-semibold">
              Almost there! Keep up the great work!
            </p>
          ) : progressPercentage >= 50 ? (
            <p className="text-purple-600 font-semibold">
              You're halfway there! Great progress!
            </p>
          ) : progressPercentage >= 25 ? (
            <p className="text-orange-600 font-semibold">
              Good start! Keep practicing!
            </p>
          ) : (
            <p className="text-gray-600">
              Begin your ELIA typing journey!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}