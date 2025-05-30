import { Stack } from 'expo-router';
import '../global.css';
import { colorScheme } from 'nativewind';
import { AuthProvider } from '@/context/AuthContext';
import { HabitsProvider } from '@/context/HabitsContext';
import { StreakProtectorProvider } from '@/context/StreakProtectorContext';
import { MessageProvider } from '@/context/MessageContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SoundProvider } from '@/context/SoundProvider';

colorScheme.set('light');

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <SoundProvider>
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
        </SoundProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default RootLayout;
