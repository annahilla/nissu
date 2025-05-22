import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import Logo from '@/assets/logo.svg';
import BackgroundLayout from '@/components/layout/BackgroundLayout';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Spinner from '@/components/ui/Spinner';
import Button from '@/components/ui/Button';
import ResendEmailButton from '@/components/login/ResendEmailButton';
import { useAuth } from '@/context/AuthContext';
import LoadingScreen from '@/components/ui/LoadingScreen';

const VerifyEmailScreen = () => {
  const { verifyEmail, isLoading } = useAuth();
  const { userId, secret } = useLocalSearchParams<{
    userId: string;
    secret: string;
  }>();
  const router = useRouter();
  const [status, setStatus] = useState<'success' | 'error' | 'loading'>(
    'loading'
  );

  useEffect(() => {
    const runVerification = async () => {
      const result = await verifyEmail(userId, secret);
      setStatus(result);
      if (result === 'success') {
        router.replace('/');
      }
    };

    runVerification();
  }, [secret]);

  if (status === 'loading') {
    return <LoadingScreen />;
  }

  return (
    <BackgroundLayout className="px-10 py-12">
      <View className="flex items-center">
        <Logo width={95} />
      </View>

      {status === 'error' && (
        <>
          <Text className="text-center text-lg font-semibold">
            Uh oh... Verification failed
          </Text>
          <Text className="text-md text-center">
            Something went wrong verifying your account. Please try again or
            request a new verification email from the app.
          </Text>
          <ResendEmailButton />
        </>
      )}
    </BackgroundLayout>
  );
};

export default VerifyEmailScreen;
