import { Habit } from '@/types/habits';
import { View, Text, TouchableOpacity } from 'react-native';
import Check from '@/assets/check.svg';
import { useState } from 'react';

interface HabitItemProps {
  habit: Habit;
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedHabit: Habit) => void;
}

const HabitItem = ({ habit, onDelete, onEdit }: HabitItemProps) => {
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  const formatedLastCompletedDate = habit.lastCompleted
    ? new Date(habit.lastCompleted).toISOString().split('T')[0]
    : 'N/A';
  const isCompletedToday = formattedDate === formatedLastCompletedDate;

  const [isChecked, setIsChecked] = useState(isCompletedToday);

  const handleCheck = () => {
    setIsChecked((prev) => !prev);

    if (!isChecked) {
      const updatedHabit = {
        ...habit,
        streak: habit.streak++,
        lastCompleted: today,
      };
      onEdit(habit.$id, updatedHabit);
    } else {
      const updatedHabit = {
        ...habit,
        streak: habit.streak--,
        lastCompleted: null,
      };
      onEdit(habit.$id, updatedHabit);
    }
  };

  return (
    <TouchableOpacity
      onLongPress={() => onDelete(habit.$id)}
      className="my-2 flex h-[3.8rem] flex-row items-center justify-between rounded-full border border-2 border-green/60">
      <View className="flex flex-row items-center gap-2">
        {isChecked ? (
          <TouchableOpacity
            onPress={handleCheck}
            className="m-1 flex h-12 w-12 items-center justify-center rounded-full">
            <Check />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleCheck}
            className="m-1 flex h-12 w-12 items-center justify-center rounded-full border border-2 border-green/60"></TouchableOpacity>
        )}

        <Text className="max-w-28 text-lg">{habit.name}</Text>
      </View>
      <View
        className={`${isChecked ? 'bg-orange/60' : 'bg-orange/30'} flex h-14 w-14 items-center justify-center rounded-full`}>
        <Text className="text-white">{habit.streak}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HabitItem;
