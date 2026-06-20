import { View, Text } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import BackgroundLayout from '../layout/BackgroundLayout';
import Logo from '@/assets/logo.svg';
import { useFocusEffect, useRouter } from 'expo-router';
import ResendEmailButton from './ResendEmailButton';
import { useCallback } from 'react';

const VerifyUserMessage = () => {
  const router = useRouter();
  const { user, refreshUser } = useAuth();

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => {
        refreshUser();
      }, 2000);

      return () => clearInterval(interval);
    }, [])
  );

  return (
    <BackgroundLayout className="px-10 py-12">
      <View className="flex items-center">
        <Logo onPress={() => router.replace('/')} width={95} />
      </View>

      <View className="flex gap-8">
        <Text className="text-center text-lg font-semibold">
          Confirm your email address
        </Text>

        <View className="flex flex-col items-center justify-center gap-2">
          <Text className="text-center">We sent a confirmation email to:</Text>
          <Text className="font-semibold">{user?.email}</Text>
        </View>

        <Text className="text-center">
          Check your email and click on the confirmation link to continue.
        </Text>

        <ResendEmailButton />
      </View>
    </BackgroundLayout>
  );
};

export default VerifyUserMessage;
