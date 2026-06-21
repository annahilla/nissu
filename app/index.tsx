import HabitsScreen from '@/components/habits/HabitsScreen';
import CustomImageBackground from '@/components/layout/CustomImageBackground';
import WelcomeScreen from '@/components/layout/WelcomeScreen';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { useHabits } from '@/context/HabitsContext';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { BackHandler } from 'react-native';

const HomeScreen = () => {
  const router = useRouter();
  const { loadHabits, habits, isLoading } = useHabits();

  useFocusEffect(
    useCallback(() => {
      loadHabits();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
    }, [router])
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <CustomImageBackground className="relative">
      {habits.length > 0 ? <HabitsScreen /> : <WelcomeScreen />}
    </CustomImageBackground>
  );
};

export default HomeScreen;
