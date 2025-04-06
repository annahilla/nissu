import { Habit } from '@/types/habits';
import { View, Text, TouchableOpacity } from 'react-native';
import Check from '@/assets/check.svg';

const HabitItem = ({
  habit,
  onDelete,
}: {
  habit: Habit;
  onDelete: (id: string) => void;
}) => {
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  const formatedLastCompletedDate = habit.lastCompleted
    ? new Date(habit.lastCompleted).toISOString().split('T')[0]
    : 'N/A';
  const isCompletedToday = formattedDate === formatedLastCompletedDate;

  return (
    <TouchableOpacity
      onLongPress={() => onDelete(habit.$id)}
      className="my-2 flex h-[3.8rem] flex-row items-center justify-between rounded-full border border-2 border-green/60">
      <View className="flex flex-row items-center gap-2">
        {isCompletedToday ? (
          <TouchableOpacity className="m-1 flex h-12 w-12 items-center justify-center rounded-full">
            <Check />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity className="m-1 flex h-12 w-12 items-center justify-center rounded-full border border-2 border-green/60"></TouchableOpacity>
        )}

        <Text className="max-w-28 text-lg">{habit.name}</Text>
      </View>
      <View
        className={`${isCompletedToday ? 'bg-orange/60' : 'bg-orange/30'} flex h-14 w-14 items-center justify-center rounded-full`}>
        <Text className="text-white">{habit.streak}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HabitItem;
