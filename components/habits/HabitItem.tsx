import { Habit } from '@/types/habits';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Check from '@/assets/check.svg';
import { useEffect, useState } from 'react';
import { isCompletedToday, wasCompletedYesterday } from '@/utils/streaks';

interface HabitItemProps {
  habit: Habit;
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedHabit: Habit) => void;
}

const HabitItem = ({ habit, onDelete, onEdit }: HabitItemProps) => {
  const today = new Date();
  const completed = habit.lastCompleted
    ? isCompletedToday(habit.lastCompleted)
    : false;

  const [isChecked, setIsChecked] = useState(completed);
  const [streak, setStreak] = useState(habit.streak);

  const handleCheck = () => {
    let newStreak = streak;
    let newLastCompleted = habit.lastCompleted;

    if (!isChecked) {
      newStreak = streak + 1;
      newLastCompleted = today;
    } else if (streak > 0) {
      newStreak = streak - 1;
      newLastCompleted = habit.lastCompleted;
    }

    setStreak(newStreak);
    setIsChecked((prev) => !prev);

    const updatedHabit = {
      ...habit,
      streak: newStreak,
      lastCompleted: newLastCompleted,
    };

    onEdit(habit.$id, updatedHabit);
  };

  const handleLooseStreak = () => {
    const isStreakCurrent = habit.lastCompleted
      ? wasCompletedYesterday(habit.lastCompleted) ||
        isCompletedToday(habit.lastCompleted)
      : false;

    if (!isStreakCurrent && habit.streak > 0) {
      Alert.alert(`Ohhhhh! You lost the streak for ${habit.name}`);
      const updatedHabit = {
        ...habit,
        streak: 0,
      };
      setStreak(0);
      onEdit(habit.$id, updatedHabit);
    }
  };

  useEffect(() => {
    handleLooseStreak();
  }, []);

  return (
    <TouchableOpacity
      onLongPress={() => onDelete(habit.$id)}
      className="my-2 flex h-[3.8rem] flex-row items-center justify-between rounded-full border border-2 border-green">
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
            className="m-1 flex h-12 w-12 items-center justify-center rounded-full border border-2 border-green"></TouchableOpacity>
        )}

        <Text className="max-w-28 text-lg">{habit.name}</Text>
      </View>
      <View
        className={`${isChecked ? 'bg-orange' : 'bg-lightOrange'} flex h-14 w-14 items-center justify-center rounded-full`}>
        <Text className="text-white">{streak}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HabitItem;
