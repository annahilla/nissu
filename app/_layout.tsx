import { Stack } from 'expo-router';
import '../global.css';
import { colorScheme } from 'nativewind';
import { AuthProvider } from '@/context/AuthContext';

colorScheme.set('light');

const RootLayout = () => {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
      </Stack>
    </AuthProvider>
  );
};

export default RootLayout;
