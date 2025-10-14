'use client';

import React, { useState, useEffect } from 'react';
import { Chapter, ExerciseStage } from '@/types/learn';
import FlashcardStage from './FlashcardStage';
import LetterRecognitionQuiz from './LetterRecognitionQuiz';
import WordRecognitionQuiz from './WordRecognitionQuiz';
import WordTranslationQuiz from './WordTranslationQuiz';
import { useLearnProgress } from '@/contexts/LearnProgressContext';

interface StructuredBookLayoutProps {
  chapter: Chapter;
  onNextChapter: () => void;
  onPrevChapter: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function StructuredBookLayout({
  chapter,
  onNextChapter,
  onPrevChapter,
  hasNext,
  hasPrev
}: StructuredBookLayoutProps) {
  const { progress, updateExerciseStage, markStageComplete, markChapterComplete } = useLearnProgress();

  const hasStructuredExercises = chapter.structuredExercises !== undefined;

  // Track which chapter we're currently displaying to detect changes
  const [displayedChapterId, setDisplayedChapterId] = useState(chapter.id);

  // Initialize state - always start fresh for new chapters
  const [currentStage, setCurrentStage] = useState<ExerciseStage>('flashcards');
  const [viewMode, setViewMode] = useState<'learn' | 'practice'>('learn');

  // Get saved progress for current chapter
  const savedProgress = progress.exerciseProgress[chapter.id];

  // Reset state when chapter changes (only on chapter.id change, not on every progress update)
  useEffect(() => {
    if (chapter.id !== displayedChapterId) {
      // Chapter changed - load saved progress for the NEW chapter
      const chapterProgress = progress.exerciseProgress[chapter.id];
      const newStage = chapterProgress?.currentStage || 'flashcards';

      // Always start in 'learn' mode for new chapters, even if they were completed before
      // This prevents showing "Chapter Complete!" screen when navigating
      const newViewMode = 'learn';

      setCurrentStage(newStage);
      setViewMode(newViewMode);
      setDisplayedChapterId(chapter.id);
    }
  }, [chapter.id, displayedChapterId, progress.exerciseProgress]);

  // Save stage to progress whenever it changes
  useEffect(() => {
    if (hasStructuredExercises && displayedChapterId === chapter.id) {
      updateExerciseStage(chapter.id, currentStage);
    }
  }, [currentStage, chapter.id, displayedChapterId, hasStructuredExercises, updateExerciseStage]);

  const handleStartPractice = () => {
    setCurrentStage('flashcards');
    setViewMode('practice');
  };

  const handleFlashcardsComplete = () => {
    markStageComplete(chapter.id, 'flashcards');
    setCurrentStage('letter-recognition-quiz');
  };

  const handleLetterQuizComplete = () => {
    markStageComplete(chapter.id, 'letterQuiz');
    setCurrentStage('word-recognition-quiz');
  };

  const handleWordQuizComplete = () => {
    markStageComplete(chapter.id, 'wordQuiz');
    setCurrentStage('word-translation-quiz');
  };

  const handleTranslationQuizComplete = () => {
    markStageComplete(chapter.id, 'translationQuiz');
    setCurrentStage('complete');
  };

  const handleReturnToLearn = () => {
    setViewMode('learn');
  };

  return (
    <div className="structured-book-layout min-h-screen bg-gray-50">
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
          {hasStructuredExercises && (
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
          <div
            className={`book-page bg-white rounded-lg shadow-lg p-8 mb-6 lg:mb-0 ${
              viewMode === 'practice' ? 'hidden lg:block' : ''
            }`}
          >
            <h1 className="text-3xl font-bold mb-2 text-gray-900">
              Chapter {chapter.id}: {chapter.title}
            </h1>
            <p className="text-gray-700 mb-6">{chapter.description}</p>

            <div className="prose max-w-none">
              <div
                className="whitespace-pre-wrap mb-6 text-gray-800"
                dangerouslySetInnerHTML={{
                  __html: chapter.learnContent.introduction.replace(
                    /\*\*(.*?)\*\*/g,
                    '<strong class="font-bold text-blue-700">$1</strong>'
                  )
                }}
              />

              {chapter.learnContent.characters.length > 0 && (
                <div className="character-grid mt-8">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900">Characters</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {chapter.learnContent.characters.map((char, index) => (
                      <div
                        key={index}
                        className="character-card border-2 border-gray-200 rounded-lg p-4 text-center bg-gray-50"
                      >
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
          <div
            className={`book-page bg-white rounded-lg shadow-lg p-8 ${
              viewMode === 'learn' && hasStructuredExercises ? 'hidden lg:block' : ''
            } ${!hasStructuredExercises ? 'hidden' : ''}`}
          >
            {hasStructuredExercises && chapter.structuredExercises && (
              <>
                {/* Stage Header */}
                <div className="stage-header mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Interactive Exercises</h2>
                    <button
                      onClick={handleReturnToLearn}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium lg:hidden"
                    >
                      ← Back to Learn
                    </button>
                  </div>

                  {/* Progress Bookmark Indicator */}
                  {savedProgress && savedProgress.currentStage !== 'flashcards' && savedProgress.currentStage !== 'complete' && currentStage === savedProgress.currentStage && (
                    <div className="bookmark-indicator bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4 rounded">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-yellow-800 text-sm">
                          <span className="text-lg">🔖</span>
                          <span className="font-medium">Continuing from where you left off</span>
                        </div>
                        <button
                          onClick={() => {
                            setCurrentStage('flashcards');
                            setViewMode('practice');
                          }}
                          className="text-xs text-yellow-700 hover:text-yellow-900 underline font-medium"
                        >
                          Start over
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Stage Progress Indicator - Clickable for completed stages */}
                  <div className="stage-progress flex items-center justify-between text-sm mb-4 gap-2">
                    <button
                      onClick={() => {
                        setCurrentStage('flashcards');
                        setViewMode('practice');
                      }}
                      className={`stage-item px-2 py-1 rounded transition-colors ${
                        currentStage === 'flashcards' ? 'text-blue-600 font-bold bg-blue-50' :
                        savedProgress?.flashcardsReviewed ? 'text-green-600 hover:bg-green-50 cursor-pointer' :
                        'text-gray-400 cursor-default'
                      }`}
                    >
                      {currentStage === 'flashcards' && '▶ '}
                      {savedProgress?.flashcardsReviewed && currentStage !== 'flashcards' && '✓ '}
                      Flashcards
                    </button>
                    <button
                      onClick={() => {
                        if (savedProgress?.flashcardsReviewed) {
                          setCurrentStage('letter-recognition-quiz');
                          setViewMode('practice');
                        }
                      }}
                      disabled={!savedProgress?.flashcardsReviewed}
                      className={`stage-item px-2 py-1 rounded transition-colors ${
                        currentStage === 'letter-recognition-quiz' ? 'text-blue-600 font-bold bg-blue-50' :
                        savedProgress?.letterQuizProgress?.completed ? 'text-green-600 hover:bg-green-50 cursor-pointer' :
                        savedProgress?.flashcardsReviewed ? 'text-gray-600 hover:bg-gray-50 cursor-pointer' :
                        'text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {currentStage === 'letter-recognition-quiz' && '▶ '}
                      {savedProgress?.letterQuizProgress?.completed && currentStage !== 'letter-recognition-quiz' && '✓ '}
                      Letter Quiz
                    </button>
                    <button
                      onClick={() => {
                        if (savedProgress?.letterQuizProgress?.completed) {
                          setCurrentStage('word-recognition-quiz');
                          setViewMode('practice');
                        }
                      }}
                      disabled={!savedProgress?.letterQuizProgress?.completed}
                      className={`stage-item px-2 py-1 rounded transition-colors ${
                        currentStage === 'word-recognition-quiz' ? 'text-blue-600 font-bold bg-blue-50' :
                        savedProgress?.wordQuizProgress?.completed ? 'text-green-600 hover:bg-green-50 cursor-pointer' :
                        savedProgress?.letterQuizProgress?.completed ? 'text-gray-600 hover:bg-gray-50 cursor-pointer' :
                        'text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {currentStage === 'word-recognition-quiz' && '▶ '}
                      {savedProgress?.wordQuizProgress?.completed && currentStage !== 'word-recognition-quiz' && '✓ '}
                      Word Quiz
                    </button>
                    <button
                      onClick={() => {
                        if (savedProgress?.wordQuizProgress?.completed) {
                          setCurrentStage('word-translation-quiz');
                          setViewMode('practice');
                        }
                      }}
                      disabled={!savedProgress?.wordQuizProgress?.completed}
                      className={`stage-item px-2 py-1 rounded transition-colors ${
                        currentStage === 'word-translation-quiz' ? 'text-blue-600 font-bold bg-blue-50' :
                        savedProgress?.translationQuizProgress?.completed ? 'text-green-600 hover:bg-green-50 cursor-pointer' :
                        savedProgress?.wordQuizProgress?.completed ? 'text-gray-600 hover:bg-gray-50 cursor-pointer' :
                        'text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {currentStage === 'word-translation-quiz' && '▶ '}
                      {savedProgress?.translationQuizProgress?.completed && currentStage !== 'word-translation-quiz' && '✓ '}
                      Translation
                    </button>
                  </div>
                </div>

                {/* Render Current Stage */}
                {currentStage === 'flashcards' && (
                  <FlashcardStage
                    key={`flashcard-${chapter.id}`}
                    flashcards={chapter.structuredExercises.flashcards}
                    onComplete={handleFlashcardsComplete}
                  />
                )}

                {currentStage === 'letter-recognition-quiz' && (
                  <LetterRecognitionQuiz
                    key={`letter-quiz-${chapter.id}`}
                    questions={chapter.structuredExercises.letterRecognitionQuiz}
                    onComplete={handleLetterQuizComplete}
                  />
                )}

                {currentStage === 'word-recognition-quiz' && (
                  <WordRecognitionQuiz
                    key={`word-quiz-${chapter.id}`}
                    questions={chapter.structuredExercises.wordRecognitionQuiz}
                    onComplete={handleWordQuizComplete}
                  />
                )}

                {currentStage === 'word-translation-quiz' && (
                  <WordTranslationQuiz
                    key={`translation-quiz-${chapter.id}`}
                    questions={chapter.structuredExercises.wordTranslationQuiz}
                    onComplete={handleTranslationQuizComplete}
                  />
                )}

                {currentStage === 'complete' && (
                  <div className="completion-screen text-center p-12">
                    <div className="text-6xl mb-6">🎉</div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      Chapter Complete!
                    </h2>
                    <p className="text-gray-700 mb-8">
                      Congratulations! You've completed all exercises for {chapter.title}.
                    </p>
                    <div className="flex flex-col gap-4">
                      <button
                        onClick={() => setCurrentStage('flashcards')}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                      >
                        Review Exercises
                      </button>
                      {hasNext && (
                        <button
                          onClick={onNextChapter}
                          className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
                        >
                          Next Chapter →
                        </button>
                      )}
                    </div>
                  </div>
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
