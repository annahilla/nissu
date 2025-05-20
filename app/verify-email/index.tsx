import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Logo from '@/assets/logo.svg';
import BackgroundLayout from '@/components/layout/BackgroundLayout';
import { account } from '@/services/appwrite';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Spinner from '@/components/ui/Spinner';
import Button from '@/components/ui/Button';
import ResendEmailButton from '@/components/login/ResendEmailButton';

const VerifyEmailScreen = () => {
  const { userId, secret } = useLocalSearchParams<{
    userId: string;
    secret: string;
  }>();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );

  useEffect(() => {
    const verify = async () => {
      if (!secret) {
        setStatus('error');
        return;
      }

      try {
        await account.updateVerification(userId, secret);
        setStatus('success');
        setTimeout(() => {
          router.replace('/');
        }, 2000);
      } catch (err) {
        console.error(err);
        setStatus('error');
      }
    };

    verify();
  }, [secret]);

  return (
    <BackgroundLayout className="px-10 py-12">
      <View className="flex items-center">
        <Logo width={95} />
      </View>

      {status === 'loading' && (
        <>
          <Spinner />
        </>
      )}
      {status === 'success' && (
        <>
          <Text className="text-center text-lg font-semibold">
            Account verified!
          </Text>
          <Text className="text-md text-center">
            Your Nissu account is now verified. You can now start counting
            streaks.
          </Text>
          <Button onPress={() => router.replace('/')}>Start</Button>
        </>
      )}
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
