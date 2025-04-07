import { View, Text } from 'react-native';
import Star from '@/assets/star.svg';
import HappyCat from '@/assets/happy-cat.svg';

const HabitsHeader = () => {
  return (
    <View className="flex flex-row items-center justify-between">
      <View className="flex flex-row items-center gap-2">
        <Star width={24} height={24} />
        <Text className="text-brown">4</Text>
      </View>
      <HappyCat width={24} height={24} />
    </View>
  );
};

export default HabitsHeader;
