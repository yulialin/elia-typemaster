'use client';

import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { PERFORMANCE_CRITERIA } from '@/data/eliaMapping';

interface UserSettingsProps {
  onClose: () => void;
}

export default function UserSettings({ onClose }: UserSettingsProps) {
  const { state, dispatch } = useApp();
  const userSettings = state.userProgress.settings;

  const [customAccuracy, setCustomAccuracy] = useState(
    userSettings.customAccuracyThreshold || PERFORMANCE_CRITERIA.DEFAULT_ACCURACY_THRESHOLD
  );

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_USER_SETTINGS',
      payload: { customAccuracyThreshold: customAccuracy },
    });
    onClose();
  };

  const handleReset = () => {
    setCustomAccuracy(PERFORMANCE_CRITERIA.DEFAULT_ACCURACY_THRESHOLD);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
      <div className="bg-white border border-zinc-200 p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-semibold text-zinc-900">Settings</h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-900 transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Accuracy goal */}
          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1">
              Personal accuracy goal
            </label>
            <p className="text-xs text-zinc-500 mb-3">
              Default minimum is {PERFORMANCE_CRITERIA.DEFAULT_ACCURACY_THRESHOLD}%. Raise it to challenge yourself.
            </p>
            <input
              type="range"
              min={PERFORMANCE_CRITERIA.DEFAULT_ACCURACY_THRESHOLD}
              max="100"
              step="1"
              value={customAccuracy}
              onChange={(e) => setCustomAccuracy(parseInt(e.target.value))}
              className="w-full h-px bg-zinc-200 appearance-none cursor-pointer accent-zinc-900"
            />
            <div className="flex justify-between text-xs text-zinc-400 mt-1.5">
              <span>{PERFORMANCE_CRITERIA.DEFAULT_ACCURACY_THRESHOLD}% (default)</span>
              <span className="font-mono font-medium text-zinc-900">{customAccuracy}%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Speed note */}
          <div className="border border-zinc-100 p-4">
            <h4 className="text-xs font-medium text-zinc-700 mb-1">Speed requirement</h4>
            <p className="text-xs text-zinc-500">
              Minimum {PERFORMANCE_CRITERIA.MIN_CPM_THRESHOLD} CPM applies to all quizzes and cannot be changed.
            </p>
          </div>

          {/* Stats */}
          <div className="border border-zinc-100 p-4">
            <h4 className="text-xs font-medium text-zinc-700 mb-3">Your progress</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-mono text-xl font-semibold text-zinc-900">
                  {state.userProgress.completedLevels.length}
                  <span className="text-zinc-300 font-normal">/15</span>
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">lessons completed</div>
              </div>
              <div>
                <div className="font-mono text-xl font-semibold text-zinc-900">
                  {state.userProgress.badges.length}
                  <span className="text-zinc-300 font-normal">/5</span>
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">badges earned</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-zinc-100">
          <button
            onClick={handleReset}
            className="text-xs text-zinc-400 hover:text-zinc-900 transition-colors"
          >
            Reset to default
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 border border-zinc-200 text-xs text-zinc-600 hover:border-zinc-400 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 border border-zinc-900 bg-zinc-900 text-white text-xs hover:bg-white hover:text-zinc-900 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
