import { View, ImageBackground, TouchableOpacity } from 'react-native';
import { ReactNode } from 'react';
import { Asset } from 'expo-asset';
import { useAuth } from '@/context/AuthContext';
import Logout from '@/assets/logout.svg';

const background = Asset.fromModule(require('@/assets/background.png')).uri;

const CustomImageBackground = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { user, logout } = useAuth();

  return (
    <View className="flex-1">
      <ImageBackground
        source={{ uri: background }}
        resizeMode="cover"
        className={`relative flex-1 items-center justify-center ${className}`}>
        {user && (
          <TouchableOpacity onPress={logout} className="absolute right-4 top-4">
            <Logout />
          </TouchableOpacity>
        )}
        {children}
      </ImageBackground>
    </View>
  );
};

export default CustomImageBackground;
