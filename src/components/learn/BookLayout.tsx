'use client';

import React, { useState } from 'react';
import { Chapter } from '@/types/learn';
import MultipleChoiceExercise from './MultipleChoiceExercise';
import FlashcardExercise from './FlashcardExercise';
import { useLearnProgress } from '@/contexts/LearnProgressContext';

interface BookLayoutProps {
  chapter: Chapter;
  onNextChapter: () => void;
  onPrevChapter: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function BookLayout({ chapter, onNextChapter, onPrevChapter, hasNext, hasPrev }: BookLayoutProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'learn' | 'practice'>('learn');
  const { markExerciseComplete, markChapterComplete } = useLearnProgress();

  const currentExercise = chapter.exercises[currentExerciseIndex];
  const hasExercises = chapter.exercises.length > 0;

  const handleExerciseComplete = () => {
    markExerciseComplete(chapter.id, currentExercise.id);

    if (currentExerciseIndex < chapter.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    } else {
      // All exercises complete
      markChapterComplete(chapter.id);
      setViewMode('learn');
    }
  };

  const handleStartPractice = () => {
    setCurrentExerciseIndex(0);
    setViewMode('practice');
  };

  return (
    <div className="book-layout min-h-screen bg-gray-50">
      {/* Mobile: Tabs */}
      <div className="lg:hidden sticky top-0 z-10 bg-white border-b">
        <div className="flex">
          <button
            onClick={() => setViewMode('learn')}
            className={`flex-1 py-4 font-semibold ${
              viewMode === 'learn' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
            }`}
          >
            Learn
          </button>
          {hasExercises && (
            <button
              onClick={() => setViewMode('practice')}
              className={`flex-1 py-4 font-semibold ${
                viewMode === 'practice' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
            >
              Practice
            </button>
          )}
        </div>
      </div>

      {/* Desktop: Two-page layout, Mobile: Stacked */}
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Left Page - Learn Content */}
          <div className={`book-page bg-white rounded-lg shadow-lg p-8 mb-6 lg:mb-0 ${
            viewMode === 'practice' ? 'hidden lg:block' : ''
          }`}>
            <h1 className="text-3xl font-bold mb-2 text-gray-900">
              Chapter {chapter.id}: {chapter.title}
            </h1>
            <p className="text-gray-700 mb-6">{chapter.description}</p>

            <div className="prose max-w-none">
              <div
                className="whitespace-pre-wrap mb-6 text-gray-800"
                dangerouslySetInnerHTML={{
                  __html: chapter.learnContent.introduction
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-blue-700">$1</strong>')
                }}
              />

              {chapter.learnContent.characters.length > 0 && (
                <div className="character-grid mt-8">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900">Characters</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {chapter.learnContent.characters.map((char, index) => (
                      <div key={index} className="character-card border-2 border-gray-200 rounded-lg p-4 text-center bg-gray-50">
                        <div className="text-4xl font-elia mb-2 text-gray-900">{char.elia}</div>
                        <div className="text-2xl font-bold text-gray-900">{char.roman}</div>
                        {char.description && (
                          <div className="text-xs text-gray-600 mt-2">{char.description}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {hasExercises && chapter.id !== 1 && (
              <button
                onClick={handleStartPractice}
                className="mt-8 w-full py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Start Practice Exercises
              </button>
            )}

            {chapter.id === 1 && (
              <button
                onClick={() => {
                  // Mark Chapter 1 (Introduction) as complete when user starts learning
                  markChapterComplete(1);
                  onNextChapter();
                }}
                className="mt-8 w-full py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                Start Learning →
              </button>
            )}
          </div>

          {/* Right Page - Practice Content */}
          <div className={`book-page bg-white rounded-lg shadow-lg p-8 ${
            viewMode === 'learn' && hasExercises ? 'hidden lg:block' : ''
          } ${!hasExercises ? 'hidden' : ''}`}>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Practice Exercises</h2>

            {chapter.exercises.length > 0 && (
              <>
                <div className="progress-bar mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Exercise {currentExerciseIndex + 1} of {chapter.exercises.length}</span>
                    <span>{Math.round(((currentExerciseIndex) / chapter.exercises.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${((currentExerciseIndex) / chapter.exercises.length) * 100}%` }}
                    />
                  </div>
                </div>

                {currentExercise.type === 'multiple-choice' && (
                  <MultipleChoiceExercise
                    exercise={currentExercise}
                    onComplete={handleExerciseComplete}
                  />
                )}

                {currentExercise.type === 'flashcard' && (
                  <FlashcardExercise
                    exercise={currentExercise}
                    onComplete={handleExerciseComplete}
                  />
                )}
              </>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="navigation-controls flex justify-between mt-8">
          <button
            onClick={onPrevChapter}
            disabled={!hasPrev}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              hasPrev
                ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            ← Previous Chapter
          </button>

          <button
            onClick={onNextChapter}
            disabled={!hasNext}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              hasNext
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Next Chapter →
          </button>
        </div>
      </div>
    </div>
  );
}
