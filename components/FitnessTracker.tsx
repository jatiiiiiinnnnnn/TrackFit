"use client"
import { useState, useEffect } from 'react';
import { Activity, TrendingUp, Zap, Award,  Moon, Sun, Bell, Gift, Heart, Droplets } from 'lucide-react';

// Types for state and props (unchanged)
interface Progress {
  steps: number;
  calories: number;
  distance: number;
  activeMinutes: number;
  water: number;
  sleep: number;
  heartRate: number;
}

interface Goals {
  steps: number;
  calories: number;
  distance: number;
  activeMinutes: number;
  water: number;
  sleep: number;
  heartRate: { min: number; max: number };
}

interface Challenge {
  id: number;
  name: string;
  description: string;
  progress: number;
  completed: boolean;
  reward: string;
}

interface UserStats {
  level: number;
  points: number;
  streak: number;
  achievements: number;
  rank: string;
}

interface Friend {
  name: string;
  avatar: string; // Changed to represent image URL or placeholder
  steps: number;
  level: number;
}

interface WeekData {
  day: string;
  steps: number;
  calories: number;
}

interface ThemeColors {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  primaryGradient: string;
  primary: string;
  primaryHover: string;
  primaryLight: string;
  primaryText: string;
  secondary: string;
  energy: string;
  energyLight: string;
  energyText: string;
  success: string;
  successLight: string;
  successText: string;
}

interface CircularProgressProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  children: React.ReactNode;
}

interface BarChartProps {
  data: WeekData[];
  dataKey: 'steps' | 'calories';
  maxValue: number;
  barColor: string;
}

interface HeartRateMonitorProps {
  rate: number;
}

interface WaterTrackerProps {
  current: number;
  goal: number;
}

interface ToastProps {
  show: boolean;
  title: string;
  message: string;
  type?: 'success' | 'info' | 'reward';
  onClose: () => void;
}

export default function FitnessTracker() {
  // Theme and state management
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [currentDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'challenges' | 'social'>('today');
  const [showReward, setShowReward] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [showChallengeComplete, setShowChallengeComplete] = useState<boolean>(false);

  // Progress tracking data
  const [progress, setProgress] = useState<Progress>({
    steps: 7542,
    calories: 1850,
    distance: 5.4,
    activeMinutes: 47,
    water: 4,
    sleep: 7.2,
    heartRate: 68,
  });

  // Goals
  const goals: Goals = {
    steps: 10000,
    calories: 2500,
    distance: 8,
    activeMinutes: 60,
    water: 8,
    sleep: 8,
    heartRate: { min: 60, max: 100 },
  };

  // Interactive challenges
  const [challenges, setChallenges] = useState<Challenge[]>([
    { id: 1, name: "Morning Rush", description: "3,000 steps before 9AM", progress: 100, completed: true, reward: "150 points" },
    { id: 2, name: "Lunch Walk", description: "Walk 15 min during lunch break", progress: 80, completed: false, reward: "100 points" },
    { id: 3, name: "Hydration Hero", description: "Drink 8 glasses of water", progress: 50, completed: false, reward: "75 points" },
  ]);

  // User stats
  const [userStats, setUserStats] = useState<UserStats>({
    level: 12,
    points: 3450,
    streak: 5,
    achievements: 24,
    rank: "Gold",
  });

  // Friends for social component with avatar URLs (placeholders for now)
  const friends: Friend[] = [
    { name: "Emma", avatar: "https://randomuser.me/api/portraits/women/1.jpg", steps: 9842, level: 14 },
    { name: "James", avatar: "https://randomuser.me/api/portraits/men/2.jpg", steps: 8123, level: 11 },
    { name: "Sarah", avatar: "https://randomuser.me/api/portraits/women/3.jpg", steps: 12504, level: 16 },
  ];

  // Simulated data for the week
  const weekData: WeekData[] = [
    { day: 'Mon', steps: 8245, calories: 2100 },
    { day: 'Tue', steps: 9125, calories: 2300 },
    { day: 'Wed', steps: 7830, calories: 1950 },
    { day: 'Thu', steps: 7542, calories: 1850 },
    { day: 'Fri', steps: 0, calories: 0 },
    { day: 'Sat', steps: 0, calories: 0 },
    { day: 'Sun', steps: 0, calories: 0 },
  ];

  // Theme specific colors
  const themeColors: ThemeColors = {
    background: darkMode ? 'bg-gray-900' : 'bg-gray-50',
    card: darkMode ? 'bg-gray-800' : 'bg-white',
    text: darkMode ? 'text-gray-100' : 'text-gray-800',
    textSecondary: darkMode ? 'text-gray-300' : 'text-gray-600',
    textMuted: darkMode ? 'text-gray-400' : 'text-gray-500',
    border: darkMode ? 'border-gray-700' : 'border-gray-200',
    primaryGradient: darkMode ? 'from-blue-600 to-indigo-700' : 'from-blue-500 to-blue-600',
    primary: darkMode ? 'bg-blue-600' : 'bg-blue-500',
    primaryHover: darkMode ? 'hover:bg-blue-700' : 'hover:bg-blue-600',
    primaryLight: darkMode ? 'bg-blue-900' : 'bg-blue-100',
    primaryText: darkMode ? 'text-blue-400' : 'text-blue-600',
    secondary: darkMode ? 'bg-purple-600' : 'bg-purple-500',
    energy: darkMode ? 'bg-amber-600' : 'bg-amber-500',
    energyLight: darkMode ? 'bg-amber-900' : 'bg-amber-100',
    energyText: darkMode ? 'text-amber-400' : 'text-amber-600',
    success: darkMode ? 'bg-green-600' : 'bg-green-500',
    successLight: darkMode ? 'bg-green-900' : 'bg-green-100',
    successText: darkMode ? 'text-green-400' : 'text-green-600',
  };

  // Calculate percentages for progress circles
  const getPercentage = (current: number, goal: number): number => (current / goal) * 100;

  // Random progress update with occasional reward triggers (unchanged)
  useEffect(() => {
    const interval = setInterval(() => {
      if (progress.steps < goals.steps) {
        const randomSteps = Math.floor(Math.random() * 80);
        const newSteps = progress.steps + randomSteps;

        setProgress(prev => ({
          ...prev,
          steps: newSteps,
          calories: prev.calories + Math.floor(randomSteps * 0.05),
          distance: parseFloat((prev.distance + (randomSteps * 0.0008)).toFixed(1)),
          activeMinutes: prev.activeMinutes < goals.activeMinutes
            ? Math.min(goals.activeMinutes, prev.activeMinutes + (Math.random() > 0.7 ? 1 : 0))
            : prev.activeMinutes,
        }));

        if (Math.random() > 0.8) {
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 3000);
        }

        if (newSteps > 8000 && !showChallengeComplete && challenges[1].progress < 100) {
          setChallenges(prev => {
            const updated = [...prev];
            updated[1] = { ...updated[1], progress: 100, completed: true };
            return updated;
          });

          setUserStats(prev => ({
            ...prev,
            points: prev.points + 100,
          }));

          setShowChallengeComplete(true);
          setTimeout(() => setShowChallengeComplete(false), 4000);
        }
      }

      if (Math.random() > 0.9 && progress.water < goals.water) {
        setProgress(prev => ({
          ...prev,
          water: prev.water + 1,
        }));

        if (progress.water + 1 >= goals.water) {
          setShowReward(true);
          setTimeout(() => setShowReward(false), 3000);

          setUserStats(prev => ({
            ...prev,
            points: prev.points + 75,
          }));

          setChallenges(prev => {
            const updated = [...prev];
            updated[2] = { ...updated[2], progress: 100, completed: true };
            return updated;
          });
        }
      }

      setProgress(prev => ({
        ...prev,
        heartRate: prev.heartRate + (Math.random() > 0.5 ? 1 : -1),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [progress, goals, challenges, showChallengeComplete]);

  // Heart rate monitor effect (unchanged)
  useEffect(() => {
    const heartRateInterval = setInterval(() => {
      setProgress(prev => ({
        ...prev,
        heartRate: Math.max(60, Math.min(100, prev.heartRate + (Math.random() > 0.5 ? 1 : -1))),
      }));
    }, 1000);

    return () => clearInterval(heartRateInterval);
  }, []);

  // Circular progress component (unchanged)
  const CircularProgress: React.FC<CircularProgressProps> = ({ percentage, size = 'md', color = themeColors.primary, children }) => {
    const radius = size === 'lg' ? 58 : size === 'sm' ? 28 : 40;
    const strokeWidth = size === 'lg' ? 8 : size === 'sm' ? 4 : 6;
    const normalizedPercentage = percentage > 100 ? 100 : percentage;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (normalizedPercentage / 100) * circumference;

    return (
      <div className="relative flex items-center justify-center">
        <svg className="transform -rotate-90" width={radius * 2 + strokeWidth * 2} height={radius * 2 + strokeWidth * 2}>
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke={darkMode ? "#2d3748" : "#e5e7eb"}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke={percentage >= 100 ? (darkMode ? "#10b981" : "#10b981") : color.replace('bg-', 'stroke-')}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute">{children}</div>
      </div>
    );
  };

  // Bar chart component (unchanged)
  const BarChart: React.FC<BarChartProps> = ({ data, dataKey, maxValue, barColor }) => {
    return (
      <div className="flex items-end justify-between h-36 w-full gap-1">
        {data.map((item, index) => {
          const heightPercentage = (item[dataKey] / maxValue) * 100;

          return (
            <div key={index} className="flex flex-col items-center justify-end flex-1 group">
              <div
                className={`${barColor} rounded-t-md w-full transition-all duration-500 ease-out group-hover:opacity-80`}
                style={{ height: `${heightPercentage}%` }}
              >
                <div className={`opacity-0 group-hover:opacity-100 text-white text-xs font-medium text-center transform -translate-y-6 transition-opacity duration-200 ease-in-out`}>
                  {item[dataKey]}
                </div>
              </div>
              <span className={`text-xs mt-2 ${themeColors.textMuted}`}>{item.day}</span>
            </div>
          );
        })}
      </div>
    );
  };

  // Heart rate animation component (unchanged)
  const HeartRateMonitor: React.FC<HeartRateMonitorProps> = ({  }) => {
    const generatePath = (): string => {
      let path = "M 0 50 ";
      const points = 30;

      for (let i = 1; i <= points; i++) {
        const x = (i / points) * 100;
        const variation = (Math.sin(i * 0.5) * 20) + (Math.random() * 5);

        if (i === Math.floor(points * 0.3) || i === Math.floor(points * 0.7)) {
          path += `L ${x - 3} 50 L ${x - 2} 10 L ${x - 1} 70 L ${x} 30 L ${x + 1} 50 `;
        } else {
          path += `L ${x} ${50 + variation} `;
        }
      }

      return path;
    };

    return (
      <div className="w-full h-12 overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d={generatePath()}
            stroke={darkMode ? "#ec4899" : "#ec4899"}
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
        </svg>
      </div>
    );
  };

  // Water tracker component (unchanged)
  const WaterTracker: React.FC<WaterTrackerProps> = ({ current, goal }) => {
    return (
      <div className="relative h-36 w-full rounded-lg overflow-hidden border-2 border-blue-400/30">
        <div
          className="absolute bottom-0 left-0 w-full bg-blue-400/70 transition-all duration-1000 ease-out"
          style={{ height: `${(current / goal) * 100}%` }}
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-white/20"></div>
          <div className="absolute -top-1 left-0 w-full h-2 bg-white/10 animate-wave"></div>
        </div>

        {Array.from({ length: goal }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-full h-px ${i < current ? 'bg-blue-200/30' : 'bg-gray-400/10'}`}
            style={{ bottom: `${(i + 1) * (100 / goal)}%` }}
          ></div>
        ))}

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <Droplets size={24} className="mb-1 text-blue-400" />
          <div className="text-xl font-bold">{current}/{goal}</div>
          <div className="text-xs">glasses</div>
        </div>
      </div>
    );
  };

  // Toast notification component (unchanged)
  const Toast: React.FC<ToastProps> = ({ show, title, message, type = 'success', onClose }) => {
    const bgColor = type === 'success' ? (darkMode ? 'bg-green-800' : 'bg-green-100') :
      type === 'info' ? (darkMode ? 'bg-blue-800' : 'bg-blue-100') :
        darkMode ? 'bg-amber-800' : 'bg-amber-100';

    const textColor = type === 'success' ? (darkMode ? 'text-green-200' : 'text-green-800') :
      type === 'info' ? (darkMode ? 'text-blue-200' : 'text-blue-800') :
        darkMode ? 'text-amber-200' : 'text-amber-800';

    const IconComponent = type === 'success' ? Award :
      type === 'info' ? Bell :
        Gift;

    return (
      <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 md:w-1/2 lg:w-1/3 max-w-sm transition-all duration-300 ease-in-out z-50 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        <div className={`rounded-lg shadow-lg ${bgColor} px-4 py-3 flex items-center`}>
          <div className={`rounded-full p-2 ${textColor} bg-opacity-20`}>
            <IconComponent size={18} />
          </div>
          <div className="ml-3 flex-1">
            <h4 className={`font-medium ${textColor}`}>{title}</h4>
            <p className={`text-sm opacity-80 ${textColor}`}>{message}</p>
          </div>
          <button onClick={onClose} className={`${textColor} opacity-70 hover:opacity-100`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`${themeColors.background} min-h-screen font-sans transition-colors duration-300`}>
      {/* Notifications */}
      <Toast
        show={showReward}
        title="Daily Goal Achieved!"
        message="You've earned 75 points for completing your water goal."
        type="success"
        onClose={() => setShowReward(false)}
      />

      <Toast
        show={showNotification}
        title="Keep Going!"
        message="You're making great progress today!"
        type="info"
        onClose={() => setShowNotification(false)}
      />

      <Toast
        show={showChallengeComplete}
        title="Challenge Complete!"
        message="Lunch Walk completed! +100 points!"
        type="reward"
        onClose={() => setShowChallengeComplete(false)}
      />

      {/* Header */}
      <header className={`${themeColors.card} shadow-sm transition-colors duration-300`}>
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center"> {/* Changed max-w-lg to max-w-4xl */}
          <div>
            <h1 className={`text-xl md:text-2xl font-bold ${themeColors.text}`}>TrackFit</h1>
            <p className={`text-sm md:text-base ${themeColors.textMuted}`}>
              {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-blue-50 text-blue-600'} transition-colors`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-blue-50'} ${themeColors.primaryText} hover:opacity-80 transition-colors`}>
              <Bell size={20} />
            </button>
            <div className={`w-10 h-10 bg-gradient-to-br ${themeColors.primaryGradient} rounded-full flex items-center justify-center text-white font-bold`}>
              JD
            </div>
          </div>
        </div>
      </header>

      {/* User Stats Bar */}
      <div className="max-w-4xl mx-auto px-4 mt-3"> {/* Changed max-w-lg to max-w-4xl */}
        <div className={`${themeColors.card} rounded-xl shadow-sm p-3 md:p-4 flex justify-between items-center transition-colors duration-300`}>
          <div className="flex items-center">
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${themeColors.primaryLight} ${themeColors.primaryText} flex items-center justify-center`}>
              {userStats.level}
            </div>
            <div className="ml-2 md:ml-3">
              <div className={`text-xs md:text-sm ${themeColors.textMuted}`}>Level</div>
              <div className={`text-sm md:text-base font-medium ${themeColors.text}`}>Fitness Pro</div>
            </div>
          </div>

          <div className="flex items-center">
            <div className={`h-2 w-20 md:w-24 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`}>
              <div className={`h-full ${themeColors.primary}`} style={{ width: `${(userStats.points % 1000) / 10}%` }}></div>
            </div>
            <div className="ml-2 md:ml-3">
              <div className={`text-xs md:text-sm ${themeColors.textMuted}`}>XP</div>
              <div className={`text-sm md:text-base font-medium ${themeColors.text}`}>{userStats.points}</div>
            </div>
          </div>

          <div className="flex items-center">
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${themeColors.successLight} ${themeColors.successText} flex items-center justify-center`}>
              {userStats.streak}
            </div>
            <div className="ml-2 md:ml-3">
              <div className={`text-xs md:text-sm ${themeColors.textMuted}`}>Streak</div>
              <div className={`text-sm md:text-base font-medium ${themeColors.text}`}>Days</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-4xl mx-auto mt-4 px-4"> {/* Changed max-w-lg to max-w-4xl */}
        <div className={`${themeColors.card} rounded-xl shadow-sm p-2 flex transition-colors duration-300`}>
          <button
            onClick={() => setActiveTab('today')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm md:text-base font-medium transition-colors ${
              activeTab === 'today'
                ? `${themeColors.primaryLight} ${themeColors.primaryText}`
                : `${themeColors.textSecondary} hover:bg-gray-100 dark:hover:bg-gray-700`
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setActiveTab('week')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm md:text-base font-medium transition-colors ${
              activeTab === 'week'
                ? `${themeColors.primaryLight} ${themeColors.primaryText}`
                : `${themeColors.textSecondary} hover:bg-gray-100 dark:hover:bg-gray-700`
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm md:text-base font-medium transition-colors ${
              activeTab === 'challenges'
                ? `${themeColors.primaryLight} ${themeColors.primaryText}`
                : `${themeColors.textSecondary} hover:bg-gray-100 dark:hover:bg-gray-700`
            }`}
          >
            Challenges
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm md:text-base font-medium transition-colors ${
              activeTab === 'social'
                ? `${themeColors.primaryLight} ${themeColors.primaryText}`
                : `${themeColors.textSecondary} hover:bg-gray-100 dark:hover:bg-gray-700`
            }`}
          >
            Social
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6"> {/* Changed max-w-lg to max-w-4xl */}
        {/* Today View */}
        {activeTab === 'today' && (
          <div className="space-y-6">
            {/* Main Stats Card */}
            <div className={`${themeColors.card} rounded-2xl shadow-sm overflow-hidden transition-colors duration-300`}>
              <div className={`p-6 md:p-8 bg-gradient-to-r ${themeColors.primaryGradient} text-white transition-colors duration-300`}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg md:text-xl font-semibold">Daily Progress</h2>
                  <Activity size={24} />
                </div>

                <div className="flex justify-center">
                  <CircularProgress percentage={getPercentage(progress.steps, goals.steps)} size="lg" color={themeColors.primary}>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold">{progress.steps.toLocaleString()}</div>
                      <div className="text-sm md:text-base opacity-80">steps</div>
                    </div>
                  </CircularProgress>
                </div>

                <div className="flex justify-between mt-4 md:mt-6 text-sm md:text-base">
                  <div className="text-center">
                    <div className="opacity-80">Distance</div>
                    <div className="text-xl md:text-2xl font-semibold">{progress.distance} km</div>
                  </div>
                  <div className="text-center">
                    <div className="opacity-80">Calories</div>
                    <div className="text-xl md:text-2xl font-semibold">{progress.calories}</div>
                  </div>
                  <div className="text-center">
                    <div className="opacity-80">Active Time</div>
                    <div className="text-xl md:text-2xl font-semibold">{progress.activeMinutes} min</div>
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-6 flex justify-between items-center">
                <div className={`${themeColors.textMuted} text-sm md:text-base`}>
                  {(goals.steps - progress.steps) > 0
                    ? `${(goals.steps - progress.steps).toLocaleString()} steps to go`
                    : 'Daily goal completed!'}
                </div>
                <div className={`${darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'} text-xs md:text-sm font-medium px-3 py-1 rounded-full`}>
                  {Math.min(100, Math.round(getPercentage(progress.steps, goals.steps)))}% of goal
                </div>
              </div>
            </div>

            {/* Heart Rate Monitor */}
            <div className={`${themeColors.card} rounded-xl shadow-sm p-4 md:p-6 transition-colors duration-300`}>
              <div className="flex items-center gap-2 mb-3">
                <Heart size={18} className="text-pink-500" />
                <span className={`text-sm md:text-base font-medium ${themeColors.text}`}>Heart Rate</span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className={`text-2xl md:text-3xl font-bold ${themeColors.text}`}>
                  {progress.heartRate} <span className="text-sm md:text-base font-normal">bpm</span>
                </div>
                <div className={`text-xs md:text-sm ${darkMode ? 'text-pink-400' : 'text-pink-600'}`}>
                  {progress.heartRate < 70 ? 'Resting' : progress.heartRate < 90 ? 'Active' : 'Exercise'}
                </div>
              </div>

              <HeartRateMonitor rate={progress.heartRate} />
            </div>

            {/* Health Metrics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className={`${themeColors.card} rounded-xl shadow-sm p-4 transition-colors duration-300`}>
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={18} className={themeColors.energyText} />
                  <span className={`text-sm md:text-base font-medium ${themeColors.text}`}>Calories</span>
                </div>
                <div className="flex items-center">
                  <CircularProgress percentage={getPercentage(progress.calories, goals.calories)} color={themeColors.energy}>
                    <div className={`text-lg md:text-xl font-semibold ${themeColors.text}`}>{Math.round(getPercentage(progress.calories, goals.calories))}%</div>
                  </CircularProgress>
                  <div className="ml-3">
                    <div className={`text-xl md:text-2xl font-bold ${themeColors.text}`}>{progress.calories}</div>
                    <div className={`text-xs md:text-sm ${themeColors.textMuted}`}>of {goals.calories}</div>
                  </div>
                </div>
              </div>

              <div className={`${themeColors.card} rounded-xl shadow-sm p-4 transition-colors duration-300`}>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={18} className="text-indigo-500" />
                  <span className={`text-sm md:text-base font-medium ${themeColors.text}`}>Active Minutes</span>
                </div>
                <div className="flex items-center">
                  <CircularProgress percentage={getPercentage(progress.activeMinutes, goals.activeMinutes)} color="bg-indigo-500">
                    <div className={`text-lg md:text-xl font-semibold ${themeColors.text}`}>{Math.round(getPercentage(progress.activeMinutes, goals.activeMinutes))}%</div>
                  </CircularProgress>
                  <div className="ml-3">
                    <div className={`text-xl md:text-2xl font-bold ${themeColors.text}`}>{progress.activeMinutes}</div>
                    <div className={`text-xs md:text-sm ${themeColors.textMuted}`}>of {goals.activeMinutes} min</div>
                  </div>
                </div>
              </div>

              <div className={`${themeColors.card} rounded-xl shadow-sm p-4 transition-colors duration-300`}>
                <div className="flex items-center gap-2 mb-3">
                  <Droplets size={18} className="text-blue-500" />
                  <span className={`text-sm md:text-base font-medium ${themeColors.text}`}>Water Intake</span>
                </div>
                <div className="flex justify-center">
                  <WaterTracker current={progress.water} goal={goals.water} />
                </div>
                <button
                  className={`w-full mt-4 rounded-lg py-2 px-4 text-sm md:text-base font-medium ${darkMode ? 'bg-blue-900 text-blue-200 hover:bg-blue-800' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'} transition-colors flex items-center justify-center gap-2`}
                  onClick={() => {
                    if (progress.water < goals.water) {
                      setProgress(prev => ({ ...prev, water: prev.water + 1 }));
                    }
                  }}
                >
                  <Droplets size={16} />
                  Log Water
                </button>
              </div>

              <div className={`${themeColors.card} rounded-xl shadow-sm p-4 transition-colors duration-300`}>
                <div className="flex items-center gap-2 mb-3">
                  <Moon size={18} className="text-purple-500" />
                  <span className={`text-sm md:text-base font-medium ${themeColors.text}`}>Sleep</span>
                </div>
                <div className="flex items-center">
                  <CircularProgress percentage={getPercentage(progress.sleep, goals.sleep)} color="bg-purple-500">
                    <div className={`text-lg md:text-xl font-semibold ${themeColors.text}`}>
                      {Math.round(getPercentage(progress.sleep, goals.sleep))}%
                    </div>
                  </CircularProgress>
                  <div className="ml-3">
                    <div className={`text-xl md:text-2xl font-bold ${themeColors.text}`}>{progress.sleep}h</div>
                    <div className={`text-xs md:text-sm ${themeColors.textMuted}`}>of {goals.sleep}h goal</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Week View */}
        {activeTab === 'week' && (
          <div className="space-y-6">
            <div className={`${themeColors.card} rounded-xl shadow-sm p-4 md:p-6 transition-colors duration-300`}>
              <h2 className={`text-lg md:text-xl font-semibold ${themeColors.text} mb-4`}>Weekly Steps</h2>
              <BarChart
                data={weekData}
                dataKey="steps"
                maxValue={15000}
                barColor={themeColors.primary}
              />
            </div>
            <div className={`${themeColors.card} rounded-xl shadow-sm p-4 md:p-6 transition-colors duration-300`}>
              <h2 className={`text-lg md:text-xl font-semibold ${themeColors.text} mb-4`}>Weekly Calories</h2>
              <BarChart
                data={weekData}
                dataKey="calories"
                maxValue={3000}
                barColor={themeColors.energy}
              />
            </div>
          </div>
        )}

        {/* Challenges View */}
        {activeTab === 'challenges' && (
          <div className="space-y-4">
            {challenges.map(challenge => (
              <div
                key={challenge.id}
                className={`${themeColors.card} rounded-xl shadow-sm p-4 md:p-6 transition-colors duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`text-lg md:text-xl font-semibold ${themeColors.text}`}>
                      {challenge.name}
                    </h3>
                    <p className={`text-sm md:text-base ${themeColors.textMuted}`}>
                      {challenge.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {challenge.completed && (
                      <Award size={20} className={themeColors.successText} />
                    )}
                    <CircularProgress
                      percentage={challenge.progress}
                      size="sm"
                      color={challenge.completed ? themeColors.success : themeColors.primary}
                    >
                      <div className={`text-sm md:text-base font-medium ${themeColors.text}`}>
                        {challenge.progress}%
                      </div>
                    </CircularProgress>
                  </div>
                </div>
                <div className={`text-sm md:text-base ${themeColors.textMuted} mt-2`}>
                  Reward: {challenge.reward}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Social View with Avatars */}
        {activeTab === 'social' && (
          <div className="space-y-4">
            <h2 className={`text-lg md:text-xl font-semibold ${themeColors.text} mb-4`}>Friends Activity</h2>
            {friends.map((friend, index) => (
              <div
                key={index}
                className={`${themeColors.card} rounded-xl shadow-sm p-4 md:p-6 flex items-center justify-between transition-colors duration-300`}
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <img
                    src={friend.avatar}
                    alt={`${friend.name}'s avatar`}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className={`font-medium ${themeColors.text} text-sm md:text-base`}>{friend.name}</div>
                    <div className={`text-sm md:text-base ${themeColors.textMuted}`}>Level {friend.level}</div>
                  </div>
                </div>
                <div className={`text-sm md:text-base ${themeColors.text}`}>
                  {friend.steps.toLocaleString()} steps
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}