'use client';

import React, { useState } from 'react';
import { FlashcardData } from '@/types/learn';

interface FlashcardStageProps {
  flashcards: FlashcardData[];
  onComplete: () => void;
}

export default function FlashcardStage({ flashcards, onComplete }: FlashcardStageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showElia, setShowElia] = useState(false);
  const [viewedCards, setViewedCards] = useState<Set<string>>(new Set());

  const currentCard = flashcards[currentIndex];
  const allCardsViewed = viewedCards.size === flashcards.length;

  const handleFlip = () => {
    setShowElia(!showElia);
    // Mark card as viewed
    if (!viewedCards.has(currentCard.id)) {
      setViewedCards(new Set([...viewedCards, currentCard.id]));
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowElia(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setShowElia(false);
    }
  };

  return (
    <div className="flashcard-stage-container max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Part 1: Character Review</h2>
        <p className="text-gray-700 mb-4">
          Review each character by clicking the flashcard to flip it. Make sure to view all cards before continuing.
        </p>

        <div className="progress-info flex justify-between items-center mb-4">
          <span className="text-sm text-gray-600">
            Card {currentIndex + 1} of {flashcards.length}
          </span>
          <span className="text-sm font-semibold text-blue-600">
            {viewedCards.size} / {flashcards.length} viewed
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(viewedCards.size / flashcards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div
        className="flashcard-wrapper cursor-pointer mb-6"
        onClick={handleFlip}
        style={{ perspective: '1000px' }}
      >
        <div
          className="flashcard-inner relative w-full transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: showElia ? 'rotateY(180deg)' : 'rotateY(0deg)',
            minHeight: '320px'
          }}
        >
          {/* Front - ELIA Character */}
          <div
            className="flashcard-front absolute w-full h-full bg-white border-4 border-blue-300 rounded-2xl p-12 flex flex-col items-center justify-center shadow-xl"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            <div className="text-center">
              <div className="text-8xl font-elia mb-4 text-gray-900 flex items-center justify-center" style={{ minHeight: '120px' }}>
                {currentCard.eliaCharacter}
              </div>
              <div className="text-sm text-gray-600 mt-4">
                Click to see Roman letter
              </div>
            </div>
          </div>

          {/* Back - Roman Character */}
          <div
            className="flashcard-back absolute w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 border-4 border-blue-400 rounded-2xl p-12 flex flex-col items-center justify-center shadow-xl"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <div className="text-center">
              <div className="text-8xl font-bold mb-4 text-blue-900 flex items-center justify-center" style={{ minHeight: '120px' }}>
                {currentCard.romanCharacter}
              </div>
              {currentCard.description && (
                <div className="text-sm text-blue-700 mt-4 font-medium">
                  {currentCard.description}
                </div>
              )}
              <div className="text-sm text-blue-600 mt-2">
                Roman Alphabet
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="controls-grid grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          disabled={currentIndex === 0}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            currentIndex === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
          }`}
        >
          ← Previous
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          disabled={currentIndex === flashcards.length - 1}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            currentIndex === flashcards.length - 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Next →
        </button>
      </div>

      {/* Continue Button */}
      {allCardsViewed && (
        <div className="mt-8 p-6 bg-green-50 border-2 border-green-300 rounded-lg">
          <div className="text-center mb-4">
            <div className="text-green-600 font-bold text-lg mb-2">
              ✓ All cards reviewed!
            </div>
            <p className="text-gray-700 mb-4">
              Great job! You've reviewed all the characters. Ready to test your knowledge?
            </p>
          </div>
          <button
            onClick={onComplete}
            className="w-full px-6 py-4 bg-green-500 text-white rounded-lg font-bold text-lg hover:bg-green-600 transition-colors shadow-lg"
          >
            Continue to Quiz Stage →
          </button>
        </div>
      )}

      {!allCardsViewed && (
        <div className="text-center text-sm text-gray-600 mt-4">
          View all {flashcards.length} cards to unlock the quiz stage
        </div>
      )}
    </div>
  );
}
