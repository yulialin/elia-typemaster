'use client';

import React, { useState } from 'react';
import { Badge } from '@/types';
import { badges } from '@/data/eliaMapping';
import { useApp } from '@/contexts/AppContext';

interface BadgeDisplayProps {
  className?: string;
}

const badgeIcons = {
  completionist: { earned: '🏆', unearned: '🎯' },
  steady: { earned: '🥉', unearned: '⚡' },
  swift: { earned: '🥈', unearned: '💨' },
  velocity: { earned: '🥇', unearned: '🚀' },
  virtuoso: { earned: '👑', unearned: '⭐' }
};

export default function BadgeDisplay({ className = '' }: BadgeDisplayProps) {
  const { state } = useApp();
  const userBadges = state.userProgress.badges;
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);

  const badgesWithStatus: (Badge & { earned: boolean })[] = badges.map(badge => ({
    ...badge,
    earned: userBadges.includes(badge.id)
  }));

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Achievements</h3>
        <div className="text-sm text-gray-600">
          {userBadges.length}/{badges.length}
        </div>
      </div>

      {/* Compact badge grid */}
      <div className="flex flex-wrap gap-3 justify-center mb-4">
        {badgesWithStatus.map((badge) => {
          const icon = badgeIcons[badge.id as keyof typeof badgeIcons];
          return (
            <div
              key={badge.id}
              className="relative"
              onMouseEnter={() => setHoveredBadge(badge.id)}
              onMouseLeave={() => setHoveredBadge(null)}
            >
              <div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-2xl
                  transition-all duration-200 cursor-pointer transform hover:scale-110
                  ${badge.earned
                    ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-lg'
                    : 'bg-gradient-to-br from-gray-200 to-gray-300 grayscale'
                  }
                `}
              >
                {badge.earned ? icon.earned : icon.unearned}
              </div>

              {/* Tooltip */}
              {hoveredBadge === badge.id && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
                  <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
                    <div className="font-semibold">{badge.title}</div>
                    <div className="text-gray-300 mt-1">
                      {badge.id === 'completionist' && 'Complete all 15 lessons'}
                      {badge.id === 'steady' && '10+ WPM on all lessons'}
                      {badge.id === 'swift' && '20+ WPM on all lessons'}
                      {badge.id === 'velocity' && '40+ WPM on all lessons'}
                      {badge.id === 'virtuoso' && '60+ WPM on all lessons'}
                    </div>
                    {!badge.earned && (
                      <div className="text-yellow-300 text-xs mt-1">
                        Keep practicing!
                      </div>
                    )}
                    {/* Tooltip arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(userBadges.length / badges.length) * 100}%` }}
        />
      </div>

      {/* Encouraging message */}
      <div className="text-center mt-3">
        {userBadges.length === 0 && (
          <p className="text-sm text-gray-600">Start your typing journey! 🎯</p>
        )}
        {userBadges.length > 0 && userBadges.length < badges.length && (
          <p className="text-sm text-gray-600">Great progress! Keep it up! 🌟</p>
        )}
        {userBadges.length === badges.length && (
          <p className="text-sm text-yellow-600 font-semibold">Amazing! All badges earned! 👑</p>
        )}
      </div>
    </div>
  );
}