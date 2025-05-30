import {
  View,
  Image,
  ImageSourcePropType,
  Dimensions,
  Pressable,
} from 'react-native';
import { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import Logout from '@/assets/icons/logout.svg';
import CloudsBackground from './CloudsBackground';
import NoHouse from '@/assets/house/no-house.png';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SoundController from '../SoundController';

const CustomImageBackground = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { user, logout } = useAuth();
  const { width } = Dimensions.get('window');
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      className={`flex-1 items-center justify-center ${className}`}>
      <CloudsBackground />

      <View className="absolute bottom-0 w-full">
        <Image
          className="absolute bottom-0"
          source={NoHouse as ImageSourcePropType}
          resizeMode="cover"
          style={{
            width: '100%',
            height: width / 1.5,
          }}
        />
      </View>

      <View className="absolute right-4 top-4 flex flex-row items-center gap-6">
        <SoundController />
        {user && (
          <Pressable onPress={logout}>
            <Logout />
          </Pressable>
        )}
      </View>
      {children}
    </View>
  );
};

export default CustomImageBackground;
