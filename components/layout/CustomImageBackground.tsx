import {
  View,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  Dimensions,
} from 'react-native';
import { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import Logout from '@/assets/icons/logout.svg';
import CloudsBackground from './CloudsBackground';
import NoHouse from '@/assets/house/no-house.png';

const CustomImageBackground = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { user, logout } = useAuth();
  const { width } = Dimensions.get('window');

  return (
    <View className={`flex-1 items-center justify-center ${className}`}>
      <CloudsBackground />

      <View className="absolute bottom-0 w-full">
        <Image
          className="absolute bottom-0"
          source={NoHouse as ImageSourcePropType}
          resizeMode="cover"
          style={{
            width: '100%',
            height: width / 2.58,
          }}
        />
      </View>

      {user && (
        <TouchableOpacity onPress={logout} className="absolute right-4 top-4">
          <Logout />
        </TouchableOpacity>
      )}
      {children}
    </View>
  );
};

export default CustomImageBackground;
