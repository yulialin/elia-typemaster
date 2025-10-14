'use client';

import React from 'react';
import { chapters } from '@/data/learnChapters';
import { useLearnProgress } from '@/contexts/LearnProgressContext';

interface TableOfContentsProps {
  currentChapter: number;
  onChapterSelect: (chapterId: number) => void;
  onClose?: () => void;
}

export default function TableOfContents({ currentChapter, onChapterSelect, onClose }: TableOfContentsProps) {
  const { isChapterComplete } = useLearnProgress();

  return (
    <div className="table-of-contents bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Table of Contents</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Close"
          >
            ×
          </button>
        )}
      </div>

      <div className="space-y-2">
        {chapters.map((chapter) => {
          const isComplete = isChapterComplete(chapter.id);
          const isCurrent = chapter.id === currentChapter;

          return (
            <button
              key={chapter.id}
              onClick={() => {
                onChapterSelect(chapter.id);
                onClose?.();
              }}
              className={`
                w-full text-left p-4 rounded-lg border-2 transition-all
                ${isCurrent ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}
                hover:border-blue-400 hover:bg-blue-50
              `}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-semibold text-lg text-gray-900">
                    Chapter {chapter.id}: {chapter.title}
                  </div>
                  <div className="text-sm text-gray-700 mt-1">{chapter.description}</div>
                </div>
                {isComplete && (
                  <div className="ml-2 text-green-500 text-xl">✓</div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 text-sm text-gray-500 text-center">
        Navigate through chapters at your own pace
      </div>
    </div>
  );
}
