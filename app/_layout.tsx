import { Stack } from 'expo-router';
import '../global.css';
import { colorScheme } from 'nativewind';
import { AuthProvider } from '@/context/AuthContext';
import { HabitsProvider } from '@/context/HabitContext';

colorScheme.set('light');

const RootLayout = () => {
  return (
    <AuthProvider>
      <HabitsProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="habit/[id]" />
        </Stack>
      </HabitsProvider>
    </AuthProvider>
  );
};

export default RootLayout;
