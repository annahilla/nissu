import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import '../global.css';
import { colorScheme } from 'nativewind';
import { HabitsProvider } from '@/context/HabitsContext';
import { MessageProvider } from '@/context/MessageContext';
import { SoundProvider } from '@/context/SoundProvider';

colorScheme.set('light');

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

function Routes() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="habit/[id]" />
    </Stack>
  );
}

const RootLayout = () => {
  return (
    <SoundProvider>
      <MessageProvider>
        <HabitsProvider>
          <Routes />
        </HabitsProvider>
      </MessageProvider>
    </SoundProvider>
  );
};

export default RootLayout;
