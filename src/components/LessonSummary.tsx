'use client';

import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { PERFORMANCE_CRITERIA, lessons } from '@/data/eliaMapping';
import Logo from './Logo';

interface LessonSummaryProps {
  accuracy: number;
  wpm?: number;
  cpm?: number;
  lessonId: number;
  isQuiz?: boolean;
  onPracticeAgain: () => void;
  onTakeQuiz?: () => void;
  onNextLesson: () => void;
  onBack: () => void;
  hasNextLesson: boolean;
}

export default function LessonSummary({
  accuracy,
  wpm,
  cpm,
  lessonId,
  isQuiz = false,
  onPracticeAgain,
  onTakeQuiz,
  onNextLesson,
  onBack,
  hasNextLesson,
}: LessonSummaryProps) {
  const { state } = useApp();
  const userSettings = state.userProgress.settings;
  const accuracyThreshold = userSettings.customAccuracyThreshold || PERFORMANCE_CRITERIA.DEFAULT_ACCURACY_THRESHOLD;

  const passedAccuracy = accuracy >= accuracyThreshold;
  const passedSpeed = (cpm || 0) >= PERFORMANCE_CRITERIA.MIN_CPM_THRESHOLD;
  const quizPassed = isQuiz && passedAccuracy && passedSpeed;

  const lessonScore = state.userProgress.lessonScores[lessonId];
  const isNewBest = lessonScore?.bestScore && (
    accuracy > lessonScore.bestScore.accuracy ||
    (accuracy === lessonScore.bestScore.accuracy && (wpm || 0) > lessonScore.bestScore.wpm)
  );

  const getRecommendation = () => {
    if (!isQuiz) return { type: 'practice', message: 'Ready for the quiz?' };
    if (quizPassed) return { type: 'success', message: 'Recommend: Next Lesson' };

    const issues = [];
    if (!passedAccuracy) issues.push(`accuracy below ${accuracyThreshold}%`);
    if (!passedSpeed) issues.push(`speed below ${PERFORMANCE_CRITERIA.MIN_CPM_THRESHOLD} CPM`);
    return { type: 'retry', message: 'Recommend: Practice Again', issues };
  };

  const recommendation = getRecommendation();
  const lessonData = lessons.find(l => l.id === lessonId);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-8">
      <button
        onClick={onBack}
        className="absolute top-6 left-6 text-xs text-zinc-400 hover:text-zinc-900 transition-colors"
      >
        ← Back to Lessons
      </button>

      <div className="border border-zinc-200 p-8 max-w-md w-full">
        {/* Header */}
        <div className="mb-6">
          <Logo size="small" className="mb-4" />
          <h2 className="text-base font-semibold text-zinc-900">
            {isQuiz ? 'Quiz' : 'Practice'} Complete
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Lesson {lessonId}: {lessonData?.name}
          </p>
          {isNewBest && (
            <p className="text-xs font-medium text-zinc-900 mt-1">New personal best</p>
          )}
        </div>

        {/* Metrics */}
        <div className="border-t border-zinc-100 pt-5 mb-5 space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-zinc-500">
              Accuracy{isQuiz ? ` (min ${accuracyThreshold}%)` : ''}
            </span>
            <span className={`font-mono text-xl font-semibold ${passedAccuracy ? 'text-zinc-900' : 'text-zinc-400'}`}>
              {accuracy}%
            </span>
          </div>

          {isQuiz && cpm && (
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-zinc-500">
                CPM (min {PERFORMANCE_CRITERIA.MIN_CPM_THRESHOLD})
              </span>
              <span className={`font-mono text-xl font-semibold ${passedSpeed ? 'text-zinc-900' : 'text-zinc-400'}`}>
                {cpm}
              </span>
            </div>
          )}

          {wpm !== undefined && (
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-zinc-500">WPM</span>
              <span className="font-mono text-xl font-semibold text-zinc-900">{wpm}</span>
            </div>
          )}
        </div>

        {/* Quiz result */}
        {isQuiz && (
          <div className="border-t border-zinc-100 pt-4 mb-4">
            <p className="text-xs font-medium text-zinc-900">
              {quizPassed ? 'Quiz passed' : 'Quiz not passed'}
            </p>
            {!quizPassed && recommendation.issues && (
              <p className="text-xs text-zinc-400 mt-0.5">
                {(recommendation.issues as string[]).join(', ')}
              </p>
            )}
          </div>
        )}

        {/* Personal best */}
        {lessonScore?.bestScore && (
          <div className="border-t border-zinc-100 pt-4 mb-4">
            <p className="text-xs text-zinc-400 mb-1.5">Personal best</p>
            <div className="flex gap-5">
              <div>
                <span className="font-mono text-sm font-semibold text-zinc-900">
                  {lessonScore.bestScore.accuracy}%
                </span>
                <span className="text-xs text-zinc-400 ml-1">accuracy</span>
              </div>
              <div>
                <span className="font-mono text-sm font-semibold text-zinc-900">
                  {lessonScore.bestScore.cpm}
                </span>
                <span className="text-xs text-zinc-400 ml-1">CPM</span>
              </div>
            </div>
          </div>
        )}

        {/* Recommendation note */}
        <p className="text-xs text-zinc-400 mb-4">{recommendation.message}</p>

        {/* Actions */}
        <div className="space-y-2">
          {recommendation.type === 'practice' && (
            <button
              onClick={onTakeQuiz || onPracticeAgain}
              className="w-full border border-zinc-900 text-zinc-900 py-2 text-xs font-medium hover:bg-zinc-900 hover:text-white transition-colors"
            >
              Take Quiz
            </button>
          )}

          {hasNextLesson && (
            <button
              onClick={onNextLesson}
              className={`w-full border py-2 text-xs font-medium transition-colors ${
                recommendation.type === 'success'
                  ? 'border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white'
                  : 'border-zinc-300 text-zinc-600 hover:border-zinc-600 hover:text-zinc-900'
              }`}
            >
              Next Lesson
            </button>
          )}

          <button
            onClick={onPracticeAgain}
            className={`w-full border py-2 text-xs font-medium transition-colors ${
              recommendation.type === 'retry'
                ? 'border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white'
                : 'border-zinc-200 text-zinc-500 hover:border-zinc-400 hover:text-zinc-700'
            }`}
          >
            Practice Again
          </button>
        </div>

        <p className="text-xs text-zinc-300 text-center mt-5">
          You decide when to move on.
        </p>
      </div>
    </div>
  );
}
