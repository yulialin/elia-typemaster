'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { chapters, getChapter } from '@/data/learnChapters';
import BookLayout from '@/components/learn/BookLayout';
import StructuredBookLayout from '@/components/learn/StructuredBookLayout';
import TableOfContents from '@/components/learn/TableOfContents';
import { LearnProgressProvider, useLearnProgress } from '@/contexts/LearnProgressContext';
import Logo from '@/components/Logo';

function LearnPageContent() {
  const { progress } = useLearnProgress();
  const [currentChapterId, setCurrentChapterId] = useState(progress.lastAccessedChapter || 1);
  const [showTOC, setShowTOC] = useState(false);
  const [pageTransition, setPageTransition] = useState<'none' | 'next' | 'prev'>('none');
  const [mounted, setMounted] = useState(false);

  // Prevent hydration errors by only rendering progress after mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentChapter = getChapter(currentChapterId);
  const hasNext = currentChapterId < chapters.length;
  const hasPrev = currentChapterId > 1;

  if (!currentChapter) {
    return <div>Chapter not found</div>;
  }

  const handleNextChapter = () => {
    if (hasNext) {
      setPageTransition('next');
      setTimeout(() => {
        setCurrentChapterId(prev => prev + 1);
        setPageTransition('none');
        window.scrollTo(0, 0);
      }, 300);
    }
  };

  const handlePrevChapter = () => {
    if (hasPrev) {
      setPageTransition('prev');
      setTimeout(() => {
        setCurrentChapterId(prev => prev - 1);
        setPageTransition('none');
        window.scrollTo(0, 0);
      }, 300);
    }
  };

  const handleChapterSelect = (chapterId: number) => {
    setPageTransition('next');
    setTimeout(() => {
      setCurrentChapterId(chapterId);
      setPageTransition('none');
      window.scrollTo(0, 0);
    }, 300);
  };

  return (
    <div className="learn-page relative">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
              ← Home
            </Link>
            <div className="flex items-center gap-3">
              <Logo size="small" className="opacity-80" />
              <h1 className="text-xl font-bold text-gray-900">ELIA Learn</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Progress Ring - Compact version in header */}
            {mounted && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
                <div className="relative w-8 h-8">
                  <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#e5e7eb"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#3b82f6"
                      strokeWidth="12"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${(progress.completedChapters.length / chapters.length) * 251} 251`}
                      className="transition-all duration-500 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-[10px] font-bold text-gray-800">
                      {progress.completedChapters.length}/{chapters.length}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-700 hidden sm:inline">Progress</span>
              </div>
            )}
            <button
              onClick={() => setShowTOC(!showTOC)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              📖 Contents
            </button>
          </div>
        </div>
      </header>

      {/* Table of Contents Modal */}
      {showTOC && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={() => setShowTOC(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <TableOfContents
              currentChapter={currentChapterId}
              onChapterSelect={handleChapterSelect}
              onClose={() => setShowTOC(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content with Page Transition */}
      <div
        className={`page-content transition-opacity duration-300 ${
          pageTransition !== 'none' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Use StructuredBookLayout for chapters with structured exercises */}
        {currentChapter.structuredExercises ? (
          <StructuredBookLayout
            chapter={currentChapter}
            onNextChapter={handleNextChapter}
            onPrevChapter={handlePrevChapter}
            hasNext={hasNext}
            hasPrev={hasPrev}
          />
        ) : (
          <BookLayout
            chapter={currentChapter}
            onNextChapter={handleNextChapter}
            onPrevChapter={handlePrevChapter}
            hasNext={hasNext}
            hasPrev={hasPrev}
          />
        )}
      </div>
    </div>
  );
}

export default function LearnPage() {
  return (
    <LearnProgressProvider>
      <LearnPageContent />
    </LearnProgressProvider>
  );
}
