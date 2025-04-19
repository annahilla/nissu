import { View, Text } from 'react-native';
import Cookie from '@/assets/icons/cookie.svg';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useStreakProtector } from '@/context/StreakProtectorContext';

const StreakProtector = () => {
  const { user } = useAuth();
  const { streakProtector, fetchStreakProtector } = useStreakProtector();

  useEffect(() => {
    if (user) {
      fetchStreakProtector();
    }
  }, [user]);

  return (
    <View className="flex flex-row items-center gap-2">
      <Cookie width={24} height={24} />
      <Text className="text-brown">{streakProtector.value}</Text>
    </View>
  );
};

export default StreakProtector;
