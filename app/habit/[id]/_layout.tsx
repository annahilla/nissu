import { HabitProvider } from '@/context/HabitContext';
import { Stack } from 'expo-router';

const HabitLayout = () => {
  return (
    <HabitProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </HabitProvider>
  );
};

export default HabitLayout;
