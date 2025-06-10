'use client';

import React, { useEffect, useState } from 'react';

const DeadlineProgressTracker = () => {
  const [progress, setProgress] = useState(0);
  const [customDeadline, setCustomDeadline] = useState('2025-12-31');
  const [deadlineTitle, setDeadlineTitle] = useState('New Year 2026');
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const now = new Date();
      const deadlineDate = new Date(customDeadline + 'T23:59:59');

      if (deadlineDate <= now) {
        setProgress(100);
        setIsExpired(true);
        setDaysRemaining(0);
        return;
      }

      setIsExpired(false);

      // Calculate start date (1 year before deadline or start of current year, whichever is later)
      const oneYearBefore = new Date(
        deadlineDate.getTime() - 365 * 24 * 60 * 60 * 1000
      );
      const startOfYear = new Date(now.getFullYear(), 0, 1, 0, 0, 0);
      const startDate =
        oneYearBefore > startOfYear ? oneYearBefore : startOfYear;

      const totalMs = deadlineDate.getTime() - startDate.getTime();
      const elapsedMs = now.getTime() - startDate.getTime();

      if (elapsedMs < 0) {
        setProgress(0);
        setDaysRemaining(
          Math.ceil(
            (deadlineDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)
          )
        );
        setTotalDays(
          Math.ceil(
            (deadlineDate.getTime() - startDate.getTime()) /
              (24 * 60 * 60 * 1000)
          )
        );
        return;
      }

      const deadlineProgress = Math.round((elapsedMs / totalMs) * 100);
      setProgress(Math.min(Math.max(deadlineProgress, 0), 100));

      // Calculate remaining days
      const remaining = Math.ceil(
        (deadlineDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)
      );
      const total = Math.ceil(totalMs / (24 * 60 * 60 * 1000));

      setDaysRemaining(remaining);
      setTotalDays(total);
    };

    updateProgress();
    const interval = setInterval(updateProgress, 60000);

    return () => clearInterval(interval);
  }, [customDeadline]);

  // Create 24 diamonds (4 rows × 6 columns)
  const totalDiamonds = 24;
  const filledDiamonds = Math.round((progress / 100) * totalDiamonds);

  const diamonds = Array.from({ length: totalDiamonds }, (_, index) => {
    const isFilled = index < filledDiamonds;
    return (
      <div
        key={index}
        className={`w-3 h-3 transform rotate-45 ${
          isFilled ? (isExpired ? 'bg-red-600' : 'bg-gray-800') : 'bg-gray-200'
        }`}
      />
    );
  });

  const handleDeadlineChange = (e) => {
    setCustomDeadline(e.target.value);
  };

  const handleTitleChange = (e) => {
    setDeadlineTitle(e.target.value);
  };

  const deadlineDate = new Date(customDeadline);
  const formattedDeadline = deadlineDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md">
        {/* Settings Panel */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Deadline Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={deadlineTitle}
                onChange={handleTitleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Enter deadline name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={customDeadline}
                onChange={handleDeadlineChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Progress Widget */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-6">
            <div className="text-sm font-medium text-gray-600 mb-1">
              {deadlineTitle}
            </div>
            <div
              className={`text-4xl font-bold mb-1 ${
                isExpired ? 'text-red-600' : 'text-gray-800'
              }`}
            >
              {progress}%
            </div>
            <div className="text-xs text-gray-500 mb-1">
              {formattedDeadline}
            </div>
            <div
              className={`text-xs ${
                isExpired ? 'text-red-500' : 'text-gray-400'
              }`}
            >
              {isExpired
                ? 'Deadline has passed'
                : `${daysRemaining} day${
                    daysRemaining !== 1 ? 's' : ''
                  } remaining`}
            </div>
          </div>

          <div className="grid grid-cols-6 gap-3 w-fit mx-auto">{diamonds}</div>
        </div>
      </div>
    </div>
  );
};

export default DeadlineProgressTracker;
