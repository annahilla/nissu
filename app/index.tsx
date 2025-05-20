import ProtectedRoute from '@/components/ProtectedRoute';
import HomeContent from '@/components/habits/HomeContent';
import VerifyUserMessage from '@/components/login/VerifyUserMessage';
import { useAuth } from '@/context/AuthContext';
import { useHabits } from '@/context/HabitsContext';
import { useEffect } from 'react';

const HomeScreen = () => {
  const { user } = useAuth();
  const { fetchHabits } = useHabits();

  const isVerified = user?.emailVerification;

  useEffect(() => {
    if (user) {
      fetchHabits();
    }
  }, [user]);

  return (
    <ProtectedRoute>
      {isVerified ? <HomeContent /> : <VerifyUserMessage />}
    </ProtectedRoute>
  );
};

export default HomeScreen;
