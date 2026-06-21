import { Habit } from '@/types/habits';
import {
  View,
  Text,
  Pressable,
  Vibration,
  TouchableOpacity,
} from 'react-native';
import Check from '@/assets/icons/check.svg';
import { useState } from 'react';
import { isCompletedToday } from '@/utils/streaks';
import { useLocalSearchParams, useRouter } from 'expo-router';
import EditHabitModal from './EditHabitModal';
import { useHabits } from '@/context/HabitsContext';
import { useMessage } from '@/context/MessageContext';
import { buttonSize, checkSize, streakSize } from '@/consts/sizes';
import useBellSound from '@/hooks/sounds/useBellSound';

const HabitItem = ({
  habit,
  currentStreak,
  disabled = false,
}: {
  habit: Habit;
  currentStreak?: number;
  disabled?: boolean;
}) => {
  const { updateHabit } = useHabits();
  const { setMessage } = useMessage();
  const router = useRouter();
  const { id: currentId } = useLocalSearchParams();
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const completed = habit.lastCompleted
    ? isCompletedToday(habit.lastCompleted)
    : false;

  const { playBellSound } = useBellSound();
  const [isChecked, setIsChecked] = useState(completed);
  const [streak, setStreak] = useState(habit.streak);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedHabit, setUpdatedHabit] = useState(habit.name);
  const [isAlert, setIsAlert] = useState(false);

  const handleCheck = () => {
    if (disabled) return;

    if (isChecked) {
      setIsChecked(false);
      setStreak((prev) => prev - 1);
      const updatedHabit = {
        ...habit,
        streak: streak - 1,
        lastCompleted: yesterday,
      } as Habit;
      updateHabit(updatedHabit);
      setMessage('What? I thought you really completed this one');
      return;
    } else {
      setIsChecked(true);
      setStreak((prev) => prev + 1);
      const updatedHabit = {
        ...habit,
        streak: streak + 1,
        lastCompleted: today,
      } as Habit;
      updateHabit(updatedHabit);
      playBellSound();
      setMessage("Cool! You've completed one more streak!");
    }
  };

  const handleNavigation = () => {
    if (currentId !== habit.id) {
      router.replace(`/habit/${habit.id}`);
      Vibration.vibrate(100);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    Vibration.vibrate();
  };

  return (
    <>
      <TouchableOpacity
        onPress={handleNavigation}
        onLongPress={openModal}
        style={{ height: buttonSize }}
        className="my-2 flex w-full flex-row items-center justify-between rounded-full border-2 border-green bg-beige">
        <View className="flex flex-row items-center gap-2">
          {isChecked ? (
            <TouchableOpacity
              onPress={handleCheck}
              disabled={disabled}
              style={{ height: checkSize, width: checkSize }}
              className="m-1 flex items-center justify-center rounded-full">
              <Check />
            </TouchableOpacity>
          ) : (
            <Pressable
              onPress={handleCheck}
              disabled={isAlert || disabled}
              style={{ height: checkSize, width: checkSize }}
              className={`m-1 flex items-center justify-center rounded-full border-2 ${isAlert ? 'border-green/30' : 'border-green'}`}></Pressable>
          )}

          <View className="flex flex-row items-start gap-1">
            <Text className="max-w-28 text-lg">{updatedHabit}</Text>
            {isAlert && (
              <View className="mt-2 h-2 w-2 rounded-full bg-red-500/60"></View>
            )}
          </View>
        </View>
        <View
          style={{ height: streakSize, width: streakSize }}
          className={`${isChecked ? 'bg-orange' : 'bg-lightOrange'} flex items-center justify-center rounded-full`}>
          <Text className="text-white">
            {currentStreak !== undefined && currentStreak !== null
              ? currentStreak
              : streak}
          </Text>
        </View>
      </TouchableOpacity>

      <EditHabitModal
        updatedHabit={updatedHabit}
        setUpdatedHabit={setUpdatedHabit}
        isModalOpen={isModalOpen}
        habit={habit}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default HabitItem;
