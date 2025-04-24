import ProtectedRoute from '@/components/ProtectedRoute';
import { HabitProvider } from '@/context/HabitContext';
import { Stack } from 'expo-router';

const HabitLayout = () => {
  return (
    <ProtectedRoute>
      <HabitProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </HabitProvider>
    </ProtectedRoute>
  );
};

export default HabitLayout;
