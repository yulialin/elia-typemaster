'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { AppProvider, useApp } from '@/contexts/AppContext';
import { ReactNode } from 'react';
import BadgeCelebration from './BadgeCelebration';

function BadgeCelebrationWrapper() {
  const { state, dispatch } = useApp();

  // Show the first badge in the queue
  const currentBadge = state.newlyUnlockedBadges[0];

  if (!currentBadge) return null;

  return (
    <BadgeCelebration
      key={`${currentBadge.id}-${Date.now()}`} // Unique key ensures full remount
      badgeId={currentBadge.id}
      badgeTitle={currentBadge.title}
      onComplete={() => dispatch({ type: 'CLEAR_BADGE_CELEBRATION' })}
    />
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AppProvider>
        {children}
        <BadgeCelebrationWrapper />
      </AppProvider>
    </AuthProvider>
  );
}
