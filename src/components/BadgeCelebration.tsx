'use client';

import React, { useEffect, useState } from 'react';

interface BadgeCelebrationProps {
  badgeId: string;
  badgeTitle: string;
  onComplete: () => void;
}

const badgeSymbols: Record<string, string> = {
  completionist: '✓',
  steady: 'I',
  swift: 'II',
  velocity: 'III',
  virtuoso: 'M',
};

export default function BadgeCelebration({ badgeId, badgeTitle, onComplete }: BadgeCelebrationProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 400);
    }, 3000);
    return () => clearTimeout(timer);
  }, [badgeId, badgeTitle, onComplete]);

  const symbol = badgeSymbols[badgeId] ?? '✓';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-400 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ pointerEvents: 'none' }}
    >
      <div className="absolute inset-0 bg-white bg-opacity-80" />
      <div className="relative z-10 border border-zinc-900 bg-white p-10 text-center max-w-xs mx-4">
        <div className="font-mono text-4xl font-semibold text-zinc-900 mb-4">{symbol}</div>
        <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1">Badge unlocked</p>
        <p className="text-base font-semibold text-zinc-900">{badgeTitle}</p>
      </div>
    </div>
  );
}
