'use client';

import React, { useEffect, useState } from 'react';

interface BadgeCelebrationProps {
  badgeId: string;
  badgeTitle: string;
  onComplete: () => void;
}

const badgeIcons = {
  completionist: '🎓',
  steady: '🥉',
  swift: '🥈',
  velocity: '🥇',
  virtuoso: '👑'
};

export default function BadgeCelebration({ badgeId, badgeTitle, onComplete }: BadgeCelebrationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [confettiPieces, setConfettiPieces] = useState<Array<{ id: number; x: number; delay: number; color: string }>>([]);

  useEffect(() => {
    // Reset visibility when new badge comes in
    setIsVisible(true);

    // Generate confetti pieces
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      color: ['#fbbf24', '#f59e0b', '#fb923c', '#f472b6', '#a78bfa', '#60a5fa'][Math.floor(Math.random() * 6)]
    }));
    setConfettiPieces(pieces);

    // Auto-hide after 3.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for fade-out animation
    }, 3500);

    return () => clearTimeout(timer);
  }, [badgeId, badgeTitle, onComplete]); // Re-run when badge changes

  const icon = badgeIcons[badgeId as keyof typeof badgeIcons] || '🎉';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ pointerEvents: 'none' }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />

      {/* Confetti animation */}
      <div className="absolute inset-0 overflow-hidden">
        {confettiPieces.map((piece) => (
          <div
            key={piece.id}
            className="absolute animate-confetti"
            style={{
              left: `${piece.x}%`,
              top: '-10px',
              animationDelay: `${piece.delay}s`,
              width: '10px',
              height: '10px',
              backgroundColor: piece.color,
              transform: 'rotate(45deg)'
            }}
          />
        ))}
      </div>

      {/* Badge display */}
      <div className="relative z-10 text-center animate-badge-pop">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4">
          {/* Badge icon with glow effect */}
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-60 animate-pulse" />
            <div className="relative text-8xl animate-bounce-slow">
              {icon}
            </div>
          </div>

          {/* Badge title */}
          <h2 className="text-3xl font-bold text-gray-800 mb-2 animate-fade-in">
            Badge Unlocked!
          </h2>
          <p className="text-xl font-semibold text-yellow-600 mb-4 animate-fade-in-delay">
            {badgeTitle}
          </p>

          {/* Sparkle effects */}
          <div className="flex justify-center space-x-2 text-2xl animate-fade-in-delay-2">
            <span className="animate-ping-slow">✨</span>
            <span className="animate-ping-slow" style={{ animationDelay: '0.2s' }}>⭐</span>
            <span className="animate-ping-slow" style={{ animationDelay: '0.4s' }}>✨</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes badge-pop {
          0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.1) rotate(10deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes ping-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.5;
          }
        }

        .animate-confetti {
          animation: confetti 3s ease-out forwards;
        }

        .animate-badge-pop {
          animation: badge-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out 0.3s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.5s ease-out 0.5s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 0.5s ease-out 0.7s forwards;
          opacity: 0;
        }

        .animate-ping-slow {
          animation: ping-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
