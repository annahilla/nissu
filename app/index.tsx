import ProtectedRoute from '@/components/ProtectedRoute';
import HomeContent from '@/components/habits/HomeContent';
import { useAuth } from '@/context/AuthContext';
import { useHabits } from '@/context/HabitsContext';
import { useEffect } from 'react';

const HomeScreen = () => {
  const { user } = useAuth();
  const { fetchHabits } = useHabits();

  useEffect(() => {
    if (user) {
      fetchHabits();
    }
  }, [user]);

  return (
    <ProtectedRoute>
      <HomeContent />
    </ProtectedRoute>
  );
};

export default HomeScreen;
