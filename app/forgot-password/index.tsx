import {
  View,
  TextInput,
  BackHandler,
  Text,
  Alert,
  Animated,
} from 'react-native';
import { account } from '@/services/appwrite';
import BackgroundLayout from '@/components/layout/BackgroundLayout';
import React, { useCallback, useRef, useState } from 'react';
import Logo from '@/assets/logo.svg';
import { inputStyles } from '@/components/login/AuthForm';
import Button from '@/components/ui/Button';
import { useFocusEffect } from 'expo-router';
import { onBackPress } from '@/utils/onBackPress';

const url = process.env.FORGOT_PASSWORD_URL;

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(10)).current;

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleForgotPassword = async () => {
    if (!isValidEmail(email)) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      await account.createRecovery(email, url);
      appearMessage();
      return { success: true };
    } catch (error: any) {
      setError(true);
      return { error: error.message || 'Something went wrong' };
    } finally {
      setIsLoading(false);
    }
  };

  const appearMessage = () => {
    setShowMessage(true);
    opacityAnim.setValue(0);
    translateYAnim.setValue(10);

    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  return (
    <BackgroundLayout className="px-10 py-12">
      <View className="flex items-center">
        <Logo width={95} />
      </View>

      <Text className="text-lg text-darkGray">
        Type your email address below to receive a password reset link.
      </Text>

      <TextInput
        className={inputStyles}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Button
        className="w-full"
        onPress={handleForgotPassword}
        disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send Reset Link'}
      </Button>

      {showMessage && (
        <Animated.View
          style={{
            opacity: opacityAnim,
            transform: [{ translateY: translateYAnim }],
            marginTop: 12,
          }}>
          <Text className="text-center text-darkGray">
            {error
              ? 'There was an error. Please try again.'
              : 'Email sent. Please check your inbox.'}
          </Text>
        </Animated.View>
      )}
    </BackgroundLayout>
  );
};

export default ForgotPasswordScreen;
