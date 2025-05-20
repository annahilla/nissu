import { View } from 'react-native';
import BackgroundLayout from '@/components/layout/BackgroundLayout';
import Logo from '@/assets/logo.svg';
import AuthForm from '@/components/login/AuthForm';

const LoginScreen = () => {
  return (
    <BackgroundLayout className="px-10 py-12">
      <View className="flex items-center">
        <Logo width={95} />
      </View>

      <AuthForm />
    </BackgroundLayout>
  );
};

export default LoginScreen;
