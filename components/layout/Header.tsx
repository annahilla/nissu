import { View } from 'react-native';
import HappyCat from '@/assets/cats/happy-cat.svg';
import StreakProtector from '../habits/StreakProtector';

const HabitsHeader = () => {
  return (
    <View className="flex flex-row items-center justify-between">
      <StreakProtector />
      <HappyCat width={24} height={24} />
    </View>
  );
};

export default HabitsHeader;
