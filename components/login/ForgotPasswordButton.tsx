import { useRouter } from 'expo-router';
import { Pressable, Text } from 'react-native';

const ForgotPasswordButton = () => {
  const router = useRouter();

  const goToForgotPassword = () => {
    router.replace('/forgot-password');
  };

  return (
    <Pressable onPress={goToForgotPassword}>
      <Text className="text-darkGray">Forgot your password?</Text>
    </Pressable>
  );
};

export default ForgotPasswordButton;
