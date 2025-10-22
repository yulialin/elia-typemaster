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

export default function LevelSelector({ onSelectLesson }: LevelSelectorProps) {
  const { state } = useApp();
  const { userProgress, isDataLoading } = state;
  const { user } = useAuth();
  const [showSettings, setShowSettings] = React.useState(false);

  const isLessonCompleted = (lessonId: number) => {
    return userProgress.completedLevels.includes(lessonId);
  };

  const getLessonScore = (lessonId: number) => {
    return userProgress.lessonScores[lessonId];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 relative">
          {/* Top bar with logo and user controls */}
          <div className="flex justify-between items-start mb-6">
            <Logo size="large" />
            <div className="flex items-center space-x-3">
              <UserProfile />
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
                title="Settings"
              >
                ⚙️
              </button>
            </div>
          </div>

          {/* Main title section */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              ELIA TypeMaster
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Interactive Touch-Typing for ELIA Frames™ alphabet
            </p>
            {user && (
              <p className="text-sm text-blue-600 mb-2">
                Welcome back! Your progress is automatically saved.
              </p>
            )}
            {!user && (
              <p className="text-sm text-orange-600 mb-2">
                Sign in to save your progress across devices
              </p>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isDataLoading && user && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span>Loading your progress...</span>
            </div>
          </div>
        )}

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3 order-1">
            <ProgressTracker />
          </div>
          <div className="lg:col-span-1 order-2">
            <BadgeDisplay />
          </div>
        </div>

        {/* ELIA Learn Card */}
        <div className="mb-8">
          <a
            href="/learn"
            className="block bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between text-white">
              <div>
                <h2 className="text-3xl font-bold mb-2">📚 ELIA Learn</h2>
                <p className="text-lg opacity-90">
                  New to ELIA? Start here! Interactive guide to learning the ELIA alphabet.
                </p>
                <p className="text-sm mt-2 opacity-80">
                  Learn characters step-by-step with exercises and instant feedback
                </p>
              </div>
              <div className="text-6xl">→</div>
            </div>
          </a>
        </div>

        {/* Lessons */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Typing Lessons
          </h2>
          <div className="grid gap-4">
            {lessons.map((lesson) => {
              const score = getLessonScore(lesson.id);
              const lessonCompleted = isLessonCompleted(lesson.id);

              return (
                <div
                  key={lesson.id}
                  className={`bg-white rounded-lg p-6 shadow-sm border-2 transition-all hover:shadow-md ${
                    lessonCompleted
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200'
                  }`}
                >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${
                        lessonCompleted
                          ? 'bg-green-500 text-white'
                          : 'bg-blue-500 text-white'
                      }`}>
                        {lessonCompleted ? '✓' : lesson.id}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Lesson {lesson.id}: {lesson.name}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-2">{lesson.description}</p>

                    {/* Characters */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {lesson.characters.map((char) => (
                        <span
                          key={char}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm elia-font"
                        >
                          {char}
                        </span>
                      ))}
                    </div>

                    {/* Best Score Display */}
                    {score?.bestScore && (
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Best Score:</span>
                        <span className="ml-2">{score.bestScore.accuracy}% accuracy</span>
                        <span className="ml-2">•</span>
                        <span className="ml-2">{score.bestScore.cpm} CPM</span>
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => onSelectLesson(lesson.id)}
                      className="px-6 py-2 rounded-lg font-medium transition-colors bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {lessonCompleted ? 'Practice Again' : 'Start Lesson'}
                    </button>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>

        {/* User Control Message */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Freedom & Flexibility</h3>
          <p className="text-blue-700">
            Choose any lesson in any order. Practice untimed modules to build confidence,
            then take the timed quiz when you&apos;re ready. You decide when to move on!
          </p>
        </div>

        {/* Settings Modal */}
        {showSettings && (
          <UserSettings onClose={() => setShowSettings(false)} />
        )}

      </div>
    </div>
  );
}