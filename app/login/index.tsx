import { Text, TextInput, View, Alert } from 'react-native';
import BackgroundLayout from '@/components/layout/BackgroundLayout';
import Logo from '@/assets/logo.svg';
import Button from '@/components/ui/Button';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

const LoginScreen = () => {
  const router = useRouter();
  const { login, register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string>('');

  const handleAuth = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required');
      return;
    }

    if (isRegistering && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    let response;

    if (isRegistering) {
      response = await register(email, password);
    } else {
      response = await login(email, password);
    }

    if ('error' in response) {
      Alert.alert('Error', response.error);
      return;
    }

    router.replace('/');
  };

  const toggleLoginPage = () => {
    setIsRegistering((prev) => !prev);
  };

  useEffect(() => {
    setError('');
  }, [email, password, confirmPassword]);

  const inputStyles =
    'rounded-full border border-2 border-brown p-3 placeholder:opacity-60 overflow-hidden';

  return (
    <BackgroundLayout className="px-10 py-12">
      <View className="flex items-center">
        <Logo width={95} />
      </View>

      <View className="flex gap-4">
        <Text className="text-lg text-darkGray">Welcome!</Text>
        <TextInput
          className={inputStyles}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          className={inputStyles}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          textContentType="none"
        />

        {isRegistering && (
          <TextInput
            className={inputStyles}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            textContentType="none"
          />
        )}
        {error.trim() !== '' && (
          <Text className="text-center text-red-600">{error}</Text>
        )}
      </View>

      <Button className="w-full" onPress={handleAuth}>
        {isRegistering ? 'Create' : 'Login'}
      </Button>

      <View className="flex items-center justify-center gap-4">
        <Text className="text-darkGray">
          {isRegistering
            ? 'Already have an account?'
            : "Don't have an account?"}
        </Text>
        <View className="w-1/2">
          <Button onPress={toggleLoginPage}>
            {isRegistering ? 'Login' : 'Create'}
          </Button>
        </View>
      </View>
    </BackgroundLayout>
  );
};

export default LoginScreen;
