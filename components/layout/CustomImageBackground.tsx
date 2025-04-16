import { View, TouchableOpacity, Image } from 'react-native';
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

  return (
    <View className={`flex-1 items-center justify-center ${className}`}>
      <CloudsBackground />
      <View className="absolute bottom-0 left-1/2 -translate-x-1/2 transform">
        <Image source={NoHouse} />
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
