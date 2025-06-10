'use client';

import React, { useEffect, useState } from 'react';

const YearlyProgressTracker = () => {
  const [progress, setProgress] = useState(0);
  const [daysElapsed, setDaysElapsed] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [weeksElapsed, setWeeksElapsed] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const now = new Date();
      const startOfYear = new Date(now.getFullYear(), 0, 1, 0, 0, 0);
      const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59);

      const totalYearMs = endOfYear.getTime() - startOfYear.getTime();
      const elapsedMs = now.getTime() - startOfYear.getTime();

      const yearProgress = Math.round((elapsedMs / totalYearMs) * 100);
      setProgress(Math.min(Math.max(yearProgress, 0), 100));

      // Calculate days and weeks
      const elapsed = Math.floor(elapsedMs / (24 * 60 * 60 * 1000)) + 1;
      const total = Math.floor(totalYearMs / (24 * 60 * 60 * 1000)) + 1;
      const weeks = Math.floor(elapsed / 7);

      setDaysElapsed(elapsed);
      setTotalDays(total);
      setWeeksElapsed(weeks);
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

  const currentYear = new Date().getFullYear();
  const isLeapYear =
    (currentYear % 4 === 0 && currentYear % 100 !== 0) ||
    currentYear % 400 === 0;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <div className="text-center mb-6">
          <div className="text-sm font-medium text-gray-600 mb-1">
            This Year
          </div>
          <div className="text-4xl font-bold text-gray-800 mb-1">
            {progress}%
          </div>
          <div className="text-xs text-gray-500 mb-1">{currentYear}</div>
          <div className="text-xs text-gray-400 mb-1">
            Day {daysElapsed} of {totalDays}
          </div>
          <div className="text-xs text-gray-400">
            Week {weeksElapsed} • {isLeapYear ? 'Leap Year' : 'Regular Year'}
          </div>
        </div>

        <div className="grid grid-cols-6 gap-3 w-fit mx-auto">{diamonds}</div>
      </div>
    </div>
  );
};

export default YearlyProgressTracker;
