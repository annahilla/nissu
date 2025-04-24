import React from 'react';
import CustomImageBackground from '../layout/CustomImageBackground';
import HabitsScreen from './HabitsScreen';
import WelcomeScreen from '../layout/WelcomeScreen';
import { useHabits } from '@/context/HabitsContext';
import LoadingScreen from '../ui/LoadingScreen';

const HomeContent = () => {
  const { habits, isLoading } = useHabits();

  if (isLoading) return <LoadingScreen />;

  return (
    <CustomImageBackground className="relative">
      {habits.length > 0 ? <HabitsScreen /> : <WelcomeScreen />}
    </CustomImageBackground>
  );
};

export default HomeContent;
