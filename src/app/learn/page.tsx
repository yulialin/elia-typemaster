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
      <header className="sticky top-0 z-20 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors">
              ← Home
            </Link>
            <div className="flex items-center gap-3 border-l border-zinc-200 pl-4">
              <Logo size="small" className="opacity-80" />
              <h1 className="text-sm font-semibold text-zinc-900">ELIA Learn</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {mounted && (
              <span className="text-xs font-mono text-zinc-400">
                {progress.completedChapters.length}/{chapters.length}
              </span>
            )}

            <a
              href="/ELIA learning manual.pdf"
              download
              className="border border-zinc-300 text-zinc-600 px-3 py-1.5 text-xs hover:border-zinc-900 hover:text-zinc-900 transition-colors flex items-center gap-1.5"
              title="Download printable practice manual"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="hidden sm:inline">Manual</span>
            </a>

            <button
              onClick={() => setShowTOC(!showTOC)}
              className="border border-zinc-300 text-zinc-600 px-3 py-1.5 text-xs hover:border-zinc-900 hover:text-zinc-900 transition-colors"
            >
              Contents
            </button>
          </div>
        </div>
      </header>

      {/* Table of Contents Modal */}
      {showTOC && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-40 flex items-center justify-center p-4"
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

      {/* Main Content */}
      <div
        className={`page-content transition-opacity duration-300 ${
          pageTransition !== 'none' ? 'opacity-0' : 'opacity-100'
        }`}
      >
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
