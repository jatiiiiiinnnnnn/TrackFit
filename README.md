# Fitness Tracker App

This is a React-based fitness tracker application built with TypeScript and Tailwind CSS. The app provides users with an interactive dashboard to track their daily fitness progress, weekly stats, challenges, and social interactions with friends.

## Features

### 1. **Daily Progress Tracking**
- Displays key metrics such as steps, distance, calories burned, active minutes, water intake, sleep, and heart rate.
- Circular progress indicators for visualizing progress toward daily goals.
- Heart rate monitor with animated visualization.

### 2. **Weekly Stats**
- Bar charts for weekly steps and calorie data.
- Visual representation of progress over the week.

### 3. **Challenges**
- Interactive challenges with progress tracking.
- Rewards for completing challenges.
- Visual indicators for completed challenges.

### 4. **Social Interactions**
- Displays friends' activity, including steps and levels.
- Avatars for friends fetched from placeholder URLs.

### 5. **Dark Mode Support**
- Toggle between light and dark themes.
- Dynamic theme colors for seamless user experience.

### 6. **Notifications**
- Toast notifications for achievements, progress updates, and rewards.

## Components

### 1. **CircularProgress**
- A reusable circular progress component with customizable size and color.
- Displays progress percentage and child content.

### 2. **BarChart**
- A bar chart component for visualizing weekly data.
- Supports hover effects for better interactivity.

### 3. **HeartRateMonitor**
- Animated heart rate visualization using SVG paths.
- Simulates heart rate fluctuations.

### 4. **WaterTracker**
- Tracks water intake with a visual representation.
- Allows users to log water intake.

### 5. **Toast**
- A notification component for displaying messages.
- Supports different types: success, info, and reward.

## State Management

The app uses React's `useState` and `useEffect` hooks for managing state and simulating real-time updates. Key states include:
- `progress`: Tracks daily fitness metrics.
- `goals`: Stores user-defined fitness goals.
- `challenges`: Tracks progress and completion status of challenges.
- `userStats`: Stores user-level stats like level, points, streak, and achievements.
- `darkMode`: Toggles between light and dark themes.
- `activeTab`: Tracks the currently active tab (Today, Week, Challenges, Social).

## Simulated Data

The app includes simulated data for:
- Daily progress (steps, calories, distance, etc.).
- Weekly stats (steps and calories for each day).
- Challenges with progress and rewards.
- Friends' activity with avatars and step counts.

## How It Works

1. **Progress Updates**:
  - Simulates random progress updates every 2 seconds.
  - Triggers notifications and rewards when goals or challenges are completed.

2. **Heart Rate Simulation**:
  - Updates heart rate every second with random fluctuations.

3. **Dynamic Theme Colors**:
  - Adjusts colors dynamically based on the selected theme (light or dark).

## Installation

1. Clone the repository:
  ```bash
  git clone <repository-url>
  cd fitness-tracker
  ```

2. Install dependencies:
  ```bash
  npm install
  ```

3. Start the development server:
  ```bash
  npm run dev
  ```

4. Open the app in your browser at `http://localhost:3000`.

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For type safety and better developer experience.
- **Tailwind CSS**: For styling and responsive design.
- **Lucide Icons**: For modern and customizable icons.

## Folder Structure

