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
  hasNextLesson
}: LessonSummaryProps) {
  const { state } = useApp();
  const userSettings = state.userProgress.settings;
  const accuracyThreshold = userSettings.customAccuracyThreshold || PERFORMANCE_CRITERIA.DEFAULT_ACCURACY_THRESHOLD;

  // Determine if quiz was passed
  const passedAccuracy = accuracy >= accuracyThreshold;
  const passedSpeed = (cpm || 0) >= PERFORMANCE_CRITERIA.MIN_CPM_THRESHOLD;
  const quizPassed = isQuiz && passedAccuracy && passedSpeed;

  // Get lesson score data
  const lessonScore = state.userProgress.lessonScores[lessonId];
  const isNewBest = lessonScore?.bestScore && (
    accuracy > lessonScore.bestScore.accuracy ||
    (accuracy === lessonScore.bestScore.accuracy && (wpm || 0) > lessonScore.bestScore.wpm)
  );

  // Generate recommendation
  const getRecommendation = () => {
    if (!isQuiz) {
      return { type: 'practice', message: 'Ready for the quiz?' };
    }

    if (quizPassed) {
      return { type: 'success', message: 'Recommend: Next Lesson' };
    } else {
      const issues = [];
      if (!passedAccuracy) issues.push(`accuracy below ${accuracyThreshold}%`);
      if (!passedSpeed) issues.push(`speed below ${PERFORMANCE_CRITERIA.MIN_CPM_THRESHOLD} CPM`);

      return {
        type: 'retry',
        message: 'Recommend: Practice Again',
        issues: issues
      };
    }
  };

  const recommendation = getRecommendation();
  const lessonData = lessons.find(l => l.id === lessonId);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-8">
      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <button
          onClick={onBack}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <span>←</span>
          <span>Back to Lessons</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full text-center">
        {/* Completion Header */}
        <div className="mb-6">
          <Logo size="small" className="mb-4 justify-center" />
          <div className="text-6xl mb-4">
            {isQuiz ? (quizPassed ? '🎉' : '⏰') : '✅'}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {isQuiz ? 'Quiz' : 'Practice'} Complete!
          </h2>
          <p className="text-gray-600">
            Lesson {lessonId}: {lessonData?.name}
          </p>
          {isNewBest && (
            <p className="text-blue-600 font-medium mt-2">🏆 New Personal Best!</p>
          )}
        </div>

        {/* Performance Metrics */}
        <div className="mb-6 grid grid-cols-1 gap-4">
          <div className={`p-4 rounded-lg ${
            passedAccuracy ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'
          }`}>
            <div className={`text-3xl font-bold mb-1 ${
              passedAccuracy ? 'text-green-600' : 'text-orange-600'
            }`}>
              {accuracy}%
            </div>
            <div className={`font-medium ${
              passedAccuracy ? 'text-green-700' : 'text-orange-700'
            }`}>
              Accuracy {isQuiz && `(need ${accuracyThreshold}%)`}
            </div>
          </div>

          {isQuiz && cpm && (
            <div className={`p-4 rounded-lg ${
              passedSpeed ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'
            }`}>
              <div className={`text-3xl font-bold mb-1 ${
                passedSpeed ? 'text-green-600' : 'text-orange-600'
              }`}>
                {cpm}
              </div>
              <div className={`font-medium ${
                passedSpeed ? 'text-green-700' : 'text-orange-700'
              }`}>
                Characters Per Minute (need {PERFORMANCE_CRITERIA.MIN_CPM_THRESHOLD})
              </div>
            </div>
          )}

          {wpm !== undefined && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {wpm}
              </div>
              <div className="text-blue-700 font-medium">Words Per Minute</div>
            </div>
          )}
        </div>

        {/* Quiz Status */}
        {isQuiz && (
          <div className={`mb-6 p-4 rounded-lg ${
            quizPassed
              ? 'bg-green-50 border border-green-200'
              : 'bg-orange-50 border border-orange-200'
          }`}>
            <div className={`text-lg font-bold ${
              quizPassed ? 'text-green-800' : 'text-orange-800'
            }`}>
              {quizPassed ? '✅ Quiz Passed!' : '⏰ Quiz Not Passed'}
            </div>
            {!quizPassed && recommendation.issues && (
              <p className="text-sm text-orange-700 mt-2">
                Needs improvement: {recommendation.issues.join(' and ')}
              </p>
            )}
          </div>
        )}

        {/* Recommendation */}
        <div className={`mb-6 p-4 rounded-lg ${
          recommendation.type === 'success'
            ? 'bg-green-50 border border-green-200'
            : recommendation.type === 'retry'
            ? 'bg-orange-50 border border-orange-200'
            : 'bg-blue-50 border border-blue-200'
        }`}>
          {recommendation.type === 'practice' ? (
            <div className="text-center">
              <p className="text-blue-800 font-medium mb-3">{recommendation.message}</p>
              <button
                onClick={onTakeQuiz || onPracticeAgain}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Take Quiz Now! 🎯
              </button>
            </div>
          ) : (
            <p className={`font-medium text-center ${
              recommendation.type === 'success'
                ? 'text-green-800'
                : recommendation.type === 'retry'
                ? 'text-orange-800'
                : 'text-blue-800'
            }`}>
              {recommendation.message}
            </p>
          )}
        </div>

        {/* Personal Best */}
        {lessonScore?.bestScore && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-lg font-semibold text-blue-800 mb-3 text-center">🏆 Your Best Score</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{lessonScore.bestScore.accuracy}%</div>
                <div className="text-sm text-blue-700">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{lessonScore.bestScore.wpm || Math.round(lessonScore.bestScore.cpm / 5)}</div>
                <div className="text-sm text-blue-700">WPM</div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="space-y-3">
          {/* Show Next Lesson button if quiz passed or if user wants to ignore recommendation */}
          {hasNextLesson && (
            <button
              onClick={onNextLesson}
              className={`w-full font-bold py-3 px-6 rounded-lg transition-colors ${
                recommendation.type === 'success'
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {recommendation.type === 'success' ? '✅ Next Lesson (Recommended)' : 'Next Lesson (Your Choice)'}
            </button>
          )}

          <button
            onClick={onPracticeAgain}
            className={`w-full font-bold py-3 px-6 rounded-lg transition-colors ${
              recommendation.type === 'retry'
                ? 'bg-orange-600 hover:bg-orange-700 text-white'
                : hasNextLesson
                ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {recommendation.type === 'retry' ? '🔄 Practice Again (Recommended)' : 'Practice Again'}
          </button>
        </div>

        {/* User Control Message */}
        <div className="mt-6 text-sm text-gray-600">
          <p>
            {isQuiz
              ? "You decide whether to follow the recommendation or move on!"
              : "Ready when you are - no pressure!"
            }
          </p>
        </div>
      </div>
    </div>
  );
}