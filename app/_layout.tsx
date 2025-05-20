import { Stack } from 'expo-router';
import '../global.css';
import { colorScheme } from 'nativewind';
import { AuthProvider } from '@/context/AuthContext';
import { HabitsProvider } from '@/context/HabitsContext';
import { StreakProtectorProvider } from '@/context/StreakProtectorContext';
import { MessageProvider } from '@/context/MessageContext';

colorScheme.set('light');

const RootLayout = () => {
  return (
    <AuthProvider>
      <MessageProvider>
        <HabitsProvider>
          <StreakProtectorProvider>
            <Stack
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="login" />
              <Stack.Screen name="habit/[id]" />
              <Stack.Screen name="verify-email" />
            </Stack>
          </StreakProtectorProvider>
        </HabitsProvider>
      </MessageProvider>
    </AuthProvider>
  );
};

export default RootLayout;
