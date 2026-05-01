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

  const passedQuizzes = state.userProgress.completedLevels.length;
  const attemptedLessons = Object.keys(state.userProgress.lessonScores).length;
  const progressPercentage = Math.round((passedQuizzes / totalLessons) * 100);

  return (
    <div className={`border border-zinc-200 p-5 ${className}`}>
      <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-4">Progress</h3>

      <div className="flex gap-8 mb-5">
        <div>
          <div className="font-mono text-2xl font-semibold text-zinc-900 leading-none">
            {passedQuizzes}
            <span className="text-zinc-300 font-normal">/{totalLessons}</span>
          </div>
          <div className="text-xs text-zinc-400 mt-1">quizzes passed</div>
        </div>
        <div>
          <div className="font-mono text-2xl font-semibold text-zinc-900 leading-none">
            {attemptedLessons}
            <span className="text-zinc-300 font-normal">/{totalLessons}</span>
          </div>
          <div className="text-xs text-zinc-400 mt-1">lessons attempted</div>
        </div>
      </div>

      <div className="relative h-px bg-zinc-100">
        <div
          className="absolute left-0 top-0 h-px bg-zinc-900 transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="text-xs font-mono text-zinc-400">{progressPercentage}%</span>
        <span className="text-xs text-zinc-300">complete</span>
      </div>
    </div>
  );
}
