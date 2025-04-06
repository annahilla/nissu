import { Habit } from '@/types/habits';
import { View, Text, TouchableOpacity } from 'react-native';

const HabitItem = ({ habit }: { habit: Habit }) => {
  return (
    <View className="my-2 flex h-[3.8rem] flex-row items-center justify-between rounded-full border border-2 border-green/60">
      <View className="flex flex-row items-center gap-2">
        <TouchableOpacity className="m-1 flex h-12 w-12 items-center justify-center rounded-full border border-2 border-green/60 text-white"></TouchableOpacity>
        <Text className="text-lg">{habit.name}</Text>
      </View>
      <View className="flex h-14 w-14 items-center justify-center rounded-full bg-orange/60">
        <Text className="text-white">{habit.streak}</Text>
      </View>
    </View>
  );
};

export default HabitItem;
