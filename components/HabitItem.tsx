import { View, Text, TouchableOpacity } from 'react-native';

const HabitItem = ({ habit, streak }: { habit: string; streak: number }) => {
  return (
    <View className="border-green/60 flex flex-row items-center justify-between rounded-full border border-2">
      <View className="flex flex-row items-center gap-2">
        <TouchableOpacity className="border-green/60 m-1 flex h-12 w-12 items-center justify-center rounded-full border border-2 text-white"></TouchableOpacity>
        <Text className="text-lg">{habit}</Text>
      </View>
      <View className="bg-orange/60 flex h-14 w-14 items-center justify-center rounded-full">
        <Text className="text-white">{streak}</Text>
      </View>
    </View>
  );
};

export default HabitItem;
