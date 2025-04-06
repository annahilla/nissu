import { Stack } from 'expo-router';
import '../global.css';
import { colorScheme } from 'nativewind';

colorScheme.set('light');

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
    </Stack>
  );
};

export default RootLayout;
