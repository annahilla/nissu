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
import { SoundProvider, useSound } from '@/context/SoundProvider';

colorScheme.set('light');
SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

function Routes() {
  const { checkUser } = useAuth();
  const [appIsReady, setAppIsReady] = useState(false);
  const { loadSoundPreference } = useSound();

  useEffect(() => {
    async function prepare() {
      try {
        await checkUser();
        await loadSoundPreference();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="habit/[id]" />
        <Stack.Screen name="verify-email" />
      </Stack>
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
