'use client';

import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Target,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const WidgetCard = ({
  title,
  description,
  href,
  icon: Icon,
  gradient,
  progress = 0,
}) => {
  return (
    <Link href={href} className="group block">
      <div
        className={`relative overflow-hidden rounded-3xl p-8 h-80 w-72 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${gradient}`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white/20"></div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-white/10"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <Icon className="w-8 h-8 text-white" />
              <div className="text-white/60 text-sm font-medium">
                {progress}%
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors">
              {title}
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              {description}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all duration-1000"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
      </div>
    </Link>
  );
};

const ModernHomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const widgets = [
    {
      title: 'Daily Progress',
      description:
        "Track your daily journey with real-time updates every minute. See how much of today you've conquered.",
      href: '/daily',
      icon: Clock,
      gradient: 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700',
      progress: 65,
    },
    {
      title: 'Monthly Progress',
      description:
        'Monitor your monthly achievements and milestones. Perfect for tracking monthly goals and habits.',
      href: '/monthly',
      icon: Calendar,
      gradient: 'bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700',
      progress: 42,
    },
    {
      title: 'Yearly Progress',
      description:
        'Visualize your annual journey. See how much of the year has passed and plan ahead effectively.',
      href: '/yearly',
      icon: TrendingUp,
      gradient:
        'bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-700',
      progress: 48,
    },
    {
      title: 'Deadline Tracker',
      description:
        'Set custom deadlines and track progress toward your most important goals and projects.',
      href: '/deadline',
      icon: Target,
      gradient: 'bg-gradient-to-br from-rose-500 via-pink-600 to-red-700',
      progress: 78,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % widgets.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + widgets.length) % widgets.length);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(nextSlide, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '4s' }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1
            className="text-7xl md:text-8xl font-black text-white mb-6 tracking-tight"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Widgetyy
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Beautiful progress trackers for your daily, monthly, yearly goals
            and custom deadlines.
            <span className="text-blue-400 font-medium">
              {' '}
              Stay motivated, stay focused.
            </span>
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative max-w-6xl mx-auto">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {widgets.map((widget, index) => (
              <div key={index} className="w-full flex-none flex justify-center">
                <WidgetCard {...widget} />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-12 space-x-3">
            {widgets.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-white scale-125'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center space-x-2 text-gray-400 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Live updates every minute</span>
          </div>
        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        ></div>
      </div>
    </div>
  );
};

export default ModernHomePage;
