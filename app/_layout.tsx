import { Stack } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import '../global.css';
import { colorScheme } from 'nativewind';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { HabitsProvider } from '@/context/HabitsContext';
import { StreakProtectorProvider } from '@/context/StreakProtectorContext';
import { MessageProvider } from '@/context/MessageContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SoundProvider } from '@/context/SoundProvider';
import LoadingScreen from '@/components/ui/LoadingScreen';

colorScheme.set('light');
SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

function Routes() {
  const { isLoading: isAuthLoading } = useAuth();
  const [isAppReady, SetIsAppReady] = useState(false);

  useEffect(() => {
    if (!isAuthLoading) {
      SetIsAppReady(true);
    }
  }, [isAuthLoading]);

  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      {isAppReady ? (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="habit/[id]" />
          <Stack.Screen name="verify-email" />
        </Stack>
      ) : (
        <LoadingScreen />
      )}
    </SafeAreaProvider>
  );
}

const RootLayout = () => {
  return (
    <SoundProvider>
      <AuthProvider>
        <MessageProvider>
          <HabitsProvider>
            <StreakProtectorProvider>
              <Routes />
            </StreakProtectorProvider>
          </HabitsProvider>
        </MessageProvider>
      </AuthProvider>
    </SoundProvider>
  );
};

export default RootLayout;
