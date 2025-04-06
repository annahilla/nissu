import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          paddingHorizontal: 10,
          paddingTop: 10,
          backgroundColor: '#fff',
        },
      }}>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
    </Stack>
  );
};

export default RootLayout;
