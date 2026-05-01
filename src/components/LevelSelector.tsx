'use client';

import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { lessons } from '@/data/eliaMapping';
import ProgressTracker from './ProgressTracker';
import BadgeDisplay from './BadgeDisplay';
import UserSettings from './UserSettings';
import UserProfile from './UserProfile';
import Logo from './Logo';
import { useAuth } from '@/contexts/AuthContext';

interface LevelSelectorProps {
  onSelectLesson: (lessonId: number) => void;
}

function GearIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

export default function LevelSelector({ onSelectLesson }: LevelSelectorProps) {
  const { state } = useApp();
  const { userProgress, isDataLoading } = state;
  const { user } = useAuth();
  const [showSettings, setShowSettings] = React.useState(false);

  const isLessonCompleted = (lessonId: number) =>
    userProgress.completedLevels.includes(lessonId);

  const getLessonScore = (lessonId: number) =>
    userProgress.lessonScores[lessonId];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-start justify-between border-b border-zinc-200 pb-6 mb-8">
          <div>
            <Logo size="medium" />
            <p className="text-sm text-zinc-500 mt-2">
              Touch-typing practice for the ELIA Frames™ alphabet
            </p>
            {user && (
              <p className="text-xs text-zinc-400 mt-1">Progress saved automatically</p>
            )}
            {!user && (
              <p className="text-xs text-zinc-400 mt-1">Sign in to save progress across devices</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <UserProfile />
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors"
              title="Settings"
            >
              <GearIcon />
            </button>
          </div>
        </div>

        {/* Loading */}
        {isDataLoading && user && (
          <p className="text-sm text-zinc-400 mb-6">Loading progress...</p>
        )}

        {/* Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          <div className="lg:col-span-3">
            <ProgressTracker />
          </div>
          <div className="lg:col-span-1">
            <BadgeDisplay />
          </div>
        </div>

        {/* ELIA Learn */}
        <div className="mb-8">
          <a
            href="/learn"
            className="block border border-zinc-200 hover:border-zinc-900 p-5 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-zinc-900 mb-1">ELIA Learn</h2>
                <p className="text-xs text-zinc-500">
                  New to ELIA? Start with the interactive guide to learn the alphabet step by step.
                </p>
              </div>
              <span className="text-zinc-300 group-hover:text-zinc-900 transition-colors ml-6 text-lg">→</span>
            </div>
          </a>
        </div>

        {/* Lessons */}
        <div className="mb-10">
          <h2 className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-4">
            Typing Lessons
          </h2>
          <div className="divide-y divide-zinc-100">
            {lessons.map((lesson) => {
              const score = getLessonScore(lesson.id);
              const lessonCompleted = isLessonCompleted(lesson.id);

              return (
                <div key={lesson.id} className="py-4 flex items-start justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="font-mono text-xs text-zinc-300 flex-shrink-0 w-5">
                        {String(lesson.id).padStart(2, '0')}
                      </span>
                      <h3 className="text-sm font-medium text-zinc-900">
                        {lesson.name}
                        {lessonCompleted && (
                          <span className="ml-2 text-xs font-normal text-zinc-400">✓</span>
                        )}
                      </h3>
                    </div>
                    <p className="text-xs text-zinc-500 mb-2 ml-8">{lesson.description}</p>
                    <div className="flex flex-wrap gap-1 ml-8">
                      {lesson.characters.map((char) => (
                        <span
                          key={char}
                          className="border border-zinc-200 text-zinc-600 px-1.5 py-0.5 text-xs elia-font"
                        >
                          {char}
                        </span>
                      ))}
                    </div>
                    {score?.bestScore && (
                      <p className="text-xs text-zinc-400 font-mono mt-1.5 ml-8">
                        Best: {score.bestScore.accuracy}% · {score.bestScore.cpm} CPM
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => onSelectLesson(lesson.id)}
                    className="flex-shrink-0 border border-zinc-300 text-zinc-700 px-4 py-1.5 text-xs hover:border-zinc-900 hover:text-zinc-900 transition-colors mt-0.5"
                  >
                    {lessonCompleted ? 'Practice' : 'Start'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer note */}
        <p className="text-xs text-zinc-400 border-t border-zinc-100 pt-6 text-center">
          Practice any lesson in any order. Take the timed quiz when you&apos;re ready.
        </p>

      </div>

      {showSettings && (
        <UserSettings onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}
