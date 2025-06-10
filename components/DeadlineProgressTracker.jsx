'use client';

import React, { useEffect, useState } from 'react';

const DeadlineProgressTracker = () => {
  const [progress, setProgress] = useState(0);
  const [customDeadline, setCustomDeadline] = useState('2025-12-31');
  const [deadlineTitle, setDeadlineTitle] = useState('New Year 2026');
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    type: 'year', // 'day', 'month', or 'year'
  });
  const [isExpired, setIsExpired] = useState(false);
  const [templateType, setTemplateType] = useState('year');

  useEffect(() => {
    const updateProgress = () => {
      const now = new Date();
      const deadlineDate = new Date(customDeadline + 'T23:59:59');
      const msRemaining = deadlineDate.getTime() - now.getTime();

      if (msRemaining <= 0) {
        setProgress(100);
        setIsExpired(true);
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, type: 'day' });
        setTemplateType('day');
        return;
      }

      setIsExpired(false);

      const daysRemaining = msRemaining / (24 * 60 * 60 * 1000);
      const hoursRemaining = msRemaining / (60 * 60 * 1000);
      const minutesRemaining = msRemaining / (60 * 1000);

      let currentTemplateType;
      let startDate;
      let totalMs;
      let elapsedMs;

      if (daysRemaining <= 1) {
        // Less than 1 day - use daily template
        currentTemplateType = 'day';
        startDate = new Date(
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
        const deadlineInDay = deadlineDate > endOfDay ? endOfDay : deadlineDate;

        totalMs = deadlineInDay.getTime() - startDate.getTime();
        elapsedMs = now.getTime() - startDate.getTime();

        setTimeRemaining({
          days: 0,
          hours: Math.floor(hoursRemaining),
          minutes: Math.floor(minutesRemaining % 60),
          type: 'day',
        });
      } else if (daysRemaining <= 31) {
        // Less than 1 month - use monthly template
        currentTemplateType = 'month';
        startDate = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
        const endOfMonth = new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          0,
          23,
          59,
          59
        );
        const deadlineInMonth =
          deadlineDate > endOfMonth ? endOfMonth : deadlineDate;

        totalMs = deadlineInMonth.getTime() - startDate.getTime();
        elapsedMs = now.getTime() - startDate.getTime();

        setTimeRemaining({
          days: Math.floor(daysRemaining),
          hours: Math.floor(hoursRemaining % 24),
          minutes: Math.floor(minutesRemaining % 60),
          type: 'month',
        });
      } else {
        // More than 1 month - use yearly template
        currentTemplateType = 'year';
        const oneYearBefore = new Date(
          deadlineDate.getTime() - 365 * 24 * 60 * 60 * 1000
        );
        const startOfYear = new Date(now.getFullYear(), 0, 1, 0, 0, 0);
        startDate = oneYearBefore > startOfYear ? oneYearBefore : startOfYear;

        totalMs = deadlineDate.getTime() - startDate.getTime();
        elapsedMs = now.getTime() - startDate.getTime();

        setTimeRemaining({
          days: Math.floor(daysRemaining),
          hours: 0,
          minutes: 0,
          type: 'year',
        });
      }

      setTemplateType(currentTemplateType);

      if (elapsedMs < 0) {
        setProgress(0);
        return;
      }

      const calculatedProgress = Math.round((elapsedMs / totalMs) * 100);
      setProgress(Math.min(Math.max(calculatedProgress, 0), 100));
    };

    updateProgress();
    const interval = setInterval(updateProgress, 60000);

    return () => clearInterval(interval);
  }, [customDeadline]);

  // Diamond configuration based on template type
  const getDiamondConfig = () => {
    switch (templateType) {
      case 'day':
        return { total: 24, cols: 6, size: 'w-4 h-4', gap: 'gap-5' };
      case 'month':
        return { total: 30, cols: 5, size: 'w-4 h-4', gap: 'gap-5' };
      case 'year':
        return { total: 182, cols: 26, size: 'w-3 h-3', gap: 'gap-5' };
      default:
        return { total: 24, cols: 6, size: 'w-4 h-4', gap: 'gap-5' };
    }
  };

  const diamondConfig = getDiamondConfig();
  const filledDiamonds = Math.round((progress / 100) * diamondConfig.total);

  const diamonds = Array.from({ length: diamondConfig.total }, (_, index) => {
    const isFilled = index < filledDiamonds;
    return (
      <div
        key={index}
        className={`${diamondConfig.size} flex items-center justify-center`}
      >
        <img
          src={isFilled ? '/assets/fill.svg' : '/assets/empty.svg'}
          alt={isFilled ? 'filled' : 'empty'}
          className={`w-full h-full ${
            isExpired ? 'filter hue-rotate-0 saturate-150 brightness-75' : ''
          }`}
        />
      </div>
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

  const getCurrentDayDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getDaysRemaining = () => {
    if (isExpired) return 'Deadline has passed';

    const { days, hours, minutes, type } = timeRemaining;

    if (type === 'day') {
      if (hours > 0) {
        return `${hours}h ${minutes}m remaining`;
      }
      return `${minutes}m remaining`;
    } else if (type === 'month') {
      if (days > 0) {
        return `${days} day${days !== 1 ? 's' : ''} remaining`;
      }
      return `${hours}h ${minutes}m remaining`;
    } else {
      return `${days} day${days !== 1 ? 's' : ''} remaining`;
    }
  };

  const getTemplateName = () => {
    switch (templateType) {
      case 'day':
        return 'Daily Template';
      case 'month':
        return 'Monthly Template';
      case 'year':
        return 'Yearly Template';
      default:
        return 'Template';
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div
        className={`w-full ${
          templateType === 'year' ? 'max-w-6xl' : 'max-w-md'
        }`}
      >
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
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm font-medium text-gray-600">
                {deadlineTitle}
              </div>
              <div
                className={`text-4xl font-bold ${
                  isExpired ? 'text-red-600' : 'text-gray-800'
                }`}
              >
                {progress}%
              </div>
            </div>
          </div>

          <div
            className={`grid grid-cols-${diamondConfig.cols} ${diamondConfig.gap} w-fit mx-auto mb-6`}
          >
            {diamonds}
          </div>

          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">{getCurrentDayDate()}</div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <div
                className={`text-xs ${
                  isExpired ? 'text-red-500' : 'text-gray-400'
                }`}
              >
                {getDaysRemaining()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeadlineProgressTracker;
