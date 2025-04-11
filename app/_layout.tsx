import { Stack } from 'expo-router';
import '../global.css';
import { colorScheme } from 'nativewind';
import { AuthProvider } from '@/context/AuthContext';
import { HabitsProvider } from '@/context/HabitContext';
import { StreakProtectorProvider } from '@/context/StreakProtectorContext';

colorScheme.set('light');

const RootLayout = () => {
  return (
    <AuthProvider>
      <HabitsProvider>
        <StreakProtectorProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="habit/[id]" />
          </Stack>
        </StreakProtectorProvider>
      </HabitsProvider>
    </AuthProvider>
  );
};

export default RootLayout;
