'use client';

import React, { useEffect, useState } from 'react';

const MonthlyProgressTracker = () => {
  const [progress, setProgress] = useState(0);
  const [daysElapsed, setDaysElapsed] = useState(0);
  const [totalDays, setTotalDays] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const now = new Date();
      const startOfMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        1,
        0,
        0,
        0
      );
      const endOfMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59
      );

      const totalMonthMs = endOfMonth.getTime() - startOfMonth.getTime();
      const elapsedMs = now.getTime() - startOfMonth.getTime();

      const monthProgress = Math.round((elapsedMs / totalMonthMs) * 100);
      setProgress(Math.min(Math.max(monthProgress, 0), 100));

      // Calculate days
      const elapsed = Math.floor(elapsedMs / (24 * 60 * 60 * 1000)) + 1; // +1 to include current day
      const total = Math.floor(totalMonthMs / (24 * 60 * 60 * 1000)) + 1;
      setDaysElapsed(elapsed);
      setTotalDays(total);
    };

    updateProgress();
    const interval = setInterval(updateProgress, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Create 24 diamonds (4 rows × 6 columns)
  const totalDiamonds = 24;
  const filledDiamonds = Math.round((progress / 100) * totalDiamonds);

  const diamonds = Array.from({ length: totalDiamonds }, (_, index) => {
    const isFilled = index < filledDiamonds;
    return (
      <div
        key={index}
        className={`w-3 h-3 transform rotate-45 ${
          isFilled ? 'bg-gray-800' : 'bg-gray-200'
        }`}
      />
    );
  });

  const now = new Date();
  const monthName = now.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <div className="text-center mb-6">
          <div className="text-sm font-medium text-gray-600 mb-1">
            This Month
          </div>
          <div className="text-4xl font-bold text-gray-800 mb-1">
            {progress}%
          </div>
          <div className="text-xs text-gray-500 mb-1">{monthName}</div>
          <div className="text-xs text-gray-400">
            Day {daysElapsed} of {totalDays}
          </div>
        </div>

        <div className="grid grid-cols-6 gap-3 w-fit mx-auto">{diamonds}</div>
      </div>
    </div>
  );
};

export default MonthlyProgressTracker;
