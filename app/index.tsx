import ProtectedRoute from '@/components/ProtectedRoute';
import HomeContent from '@/components/habits/HomeContent';
import VerifyUserMessage from '@/components/login/VerifyUserMessage';
import { useAuth } from '@/context/AuthContext';
import { useHabits } from '@/context/HabitsContext';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { BackHandler } from 'react-native';

const HomeScreen = () => {
  const { user } = useAuth();
  const { fetchHabits } = useHabits();
  const router = useRouter();

  const isVerified = user?.emailVerification;

  useEffect(() => {
    if (user) {
      fetchHabits();
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
    }, [router])
  );

  return (
    <ProtectedRoute>
      {isVerified ? <HomeContent /> : <VerifyUserMessage />}
    </ProtectedRoute>
  );
};

export default HomeScreen;
