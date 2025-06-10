'use client';

import React, { useEffect, useState } from 'react';

const DailyProgressTracker = () => {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateProgress = () => {
      const now = new Date();
      const startOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0
      );
      const endOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59
      );

      const totalDayMs = endOfDay.getTime() - startOfDay.getTime();
      const elapsedMs = now.getTime() - startOfDay.getTime();

      const dayProgress = Math.round((elapsedMs / totalDayMs) * 100);
      setProgress(Math.min(Math.max(dayProgress, 0), 100));

      // Update current time display
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
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

  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const dateString = today.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <div className="text-center mb-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Today</div>
          <div className="text-4xl font-bold text-gray-800 mb-1">
            {progress}%
          </div>
          <div className="text-xs text-gray-500 mb-1">{dayName}</div>
          <div className="text-xs text-gray-500 mb-1">{dateString}</div>
          <div className="text-xs text-gray-400">{currentTime}</div>
        </div>

        <div className="grid grid-cols-6 gap-3 w-fit mx-auto">{diamonds}</div>
      </div>
    </div>
  );
};

export default DailyProgressTracker;
