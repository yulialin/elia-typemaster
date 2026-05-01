'use client';

import React, { useState } from 'react';
import { Badge } from '@/types';
import { badges } from '@/data/eliaMapping';
import { useApp } from '@/contexts/AppContext';

interface BadgeDisplayProps {
  className?: string;
}

const badgeDescriptions: Record<string, string> = {
  completionist: 'Complete all 15 lessons',
  steady: '40+ CPM on all lessons',
  swift: '60+ CPM on all lessons',
  velocity: '100+ CPM on all lessons',
  virtuoso: '200+ CPM on all lessons',
};

const badgeSymbols: Record<string, { earned: string; unearned: string }> = {
  completionist: { earned: '✓', unearned: '○' },
  steady: { earned: 'I', unearned: 'I' },
  swift: { earned: 'II', unearned: 'II' },
  velocity: { earned: 'III', unearned: 'III' },
  virtuoso: { earned: 'M', unearned: 'M' },
};

export default function BadgeDisplay({ className = '' }: BadgeDisplayProps) {
  const { state, dispatch } = useApp();
  const userBadges = state.userProgress.badges;
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);

  const handleBadgeClick = (badge: Badge & { earned: boolean }) => {
    if (!badge.earned) return;
    dispatch({ type: 'REPLAY_BADGE_CELEBRATION', payload: { id: badge.id, title: badge.title } });
  };

  const badgesWithStatus: (Badge & { earned: boolean })[] = badges.map(badge => ({
    ...badge,
    earned: userBadges.includes(badge.id),
  }));

  return (
    <div className={`border border-zinc-200 p-5 h-full ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-widest">Badges</h3>
        <span className="text-xs font-mono text-zinc-300">{userBadges.length}/{badges.length}</span>
      </div>

      <div className="space-y-1.5">
        {badgesWithStatus.map((badge) => {
          const sym = badgeSymbols[badge.id];
          return (
            <div
              key={badge.id}
              className="relative"
              onMouseEnter={() => setHoveredBadge(badge.id)}
              onMouseLeave={() => setHoveredBadge(null)}
            >
              <div
                onClick={() => handleBadgeClick(badge)}
                className={`flex items-center gap-2.5 border px-3 py-2 text-xs transition-colors ${
                  badge.earned
                    ? 'border-zinc-900 text-zinc-900 cursor-pointer hover:bg-zinc-900 hover:text-white'
                    : 'border-zinc-100 text-zinc-300 cursor-default'
                }`}
              >
                <span className="font-mono w-5 text-center flex-shrink-0">
                  {sym?.earned ?? '○'}
                </span>
                <span>{badge.title}</span>
              </div>

              {hoveredBadge === badge.id && (
                <div className="absolute bottom-full left-0 mb-1 z-10 w-full">
                  <div className="bg-zinc-900 text-white text-xs p-2 leading-relaxed">
                    {badgeDescriptions[badge.id]}
                    {badge.earned && (
                      <span className="block text-zinc-400 mt-0.5">Click to replay</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
