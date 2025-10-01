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
      payload: {
        customAccuracyThreshold: customAccuracy
      }
    });
    onClose();
  };

  const handleReset = () => {
    setCustomAccuracy(PERFORMANCE_CRITERIA.DEFAULT_ACCURACY_THRESHOLD);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Custom Accuracy Threshold */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Personal Accuracy Goal
            </label>
            <p className="text-sm text-gray-600 mb-3">
              Set a higher accuracy target for passing quizzes. The default minimum is {PERFORMANCE_CRITERIA.DEFAULT_ACCURACY_THRESHOLD}%,
              but you can challenge yourself with a higher standard.
            </p>

            <div className="space-y-2">
              <input
                type="range"
                min={PERFORMANCE_CRITERIA.DEFAULT_ACCURACY_THRESHOLD}
                max="100"
                step="1"
                value={customAccuracy}
                onChange={(e) => setCustomAccuracy(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>{PERFORMANCE_CRITERIA.DEFAULT_ACCURACY_THRESHOLD}% (Default)</span>
                <span className="font-semibold text-blue-600">{customAccuracy}%</span>
                <span>100% (Perfect)</span>
              </div>
            </div>

            {customAccuracy > PERFORMANCE_CRITERIA.DEFAULT_ACCURACY_THRESHOLD && (
              <p className="text-sm text-blue-600 mt-2">
                Great choice! You're setting a higher standard for yourself.
              </p>
            )}
          </div>

          {/* Speed Requirement Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-2">Speed Requirement</h4>
            <p className="text-sm text-gray-600">
              The minimum typing speed of {PERFORMANCE_CRITERIA.MIN_CPM_THRESHOLD} characters per minute (CPM)
              cannot be changed and applies to all quizzes.
            </p>
          </div>

          {/* Current Progress Summary */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-700 mb-2">Your Progress</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-600">Completed Lessons:</span>
                <div className="font-semibold">{state.userProgress.completedLevels.length}/15</div>
              </div>
              <div>
                <span className="text-blue-600">Badges Earned:</span>
                <div className="font-semibold">{state.userProgress.badges.length}/5</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            Reset to Default
          </button>
          <div className="space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}