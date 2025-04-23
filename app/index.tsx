import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import CustomImageBackground from '@/components/layout/CustomImageBackground';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { useHabits } from '@/context/HabitsContext';
import WelcomeScreen from '@/components/layout/WelcomeScreen';
import HabitsScreen from '@/components/habits/HabitsScreen';

const HomeScreen = () => {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { habits, isLoading: habitsLoading } = useHabits();

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login');
    }
  }, [user, authLoading]);

  if (habitsLoading) return <LoadingScreen />;

  return (
    <CustomImageBackground className="relative">
      {habits.length > 0 ? <HabitsScreen /> : <WelcomeScreen />}
    </CustomImageBackground>
  );
};

export default HomeScreen;
