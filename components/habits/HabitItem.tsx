import { Habit } from '@/types/habits';
import { View, Text, Pressable, Vibration } from 'react-native';
import Check from '@/assets/icons/check.svg';
import { useEffect, useState } from 'react';
import { isCompletedToday, isStreakLost } from '@/utils/streaks';
import { useLocalSearchParams, useRouter } from 'expo-router';
import EditHabitModal from './EditHabitModal';
import { useHabits } from '@/context/HabitsContext';
import { useAuth } from '@/context/AuthContext';
import { useStreakProtector } from '@/context/StreakProtectorContext';
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
  const { user } = useAuth();
  const { updateHabit, streakHasLoaded } = useHabits();
  const { updateStreakProtector, streakProtector } = useStreakProtector();
  const { setMessage } = useMessage();
  const { id: currentId } = useLocalSearchParams();
  const router = useRouter();
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

  const handleCheck = async () => {
    let newStreak = streak;
    let newLastCompleted = habit.lastCompleted;

    const wasMultipleOf7 = streak > 0 && streak % 7 === 0;

    if (!isChecked) {
      newStreak += 1;
      newLastCompleted = today;
      playBellSound();
      setMessage("Cool! You've completed one more streak!");
    } else if (streak > 0) {
      newStreak -= 1;
      newLastCompleted = newStreak === 0 ? null : yesterday;
      setMessage('What? I thought you really completed this one');
    }

    const isNowMultipleOf7 = newStreak > 0 && newStreak % 7 === 0;

    const updatedHabitObject = {
      ...habit,
      streak: newStreak,
      lastCompleted: newLastCompleted,
    };

    setStreak(newStreak);
    setIsChecked((prev) => !prev);
    await updateHabit(habit.$id, updatedHabitObject);

    if (!user) return;

    if (!isChecked && isNowMultipleOf7) {
      updateStreakProtector(streakProtector.$id, {
        userId: user.$id,
        value: streakProtector.value + 1,
        $id: streakProtector.$id,
      });
      setMessage('Yaaaaay! You won a streak protector!');
    }

    if (isChecked && wasMultipleOf7) {
      updateStreakProtector(streakProtector.$id, {
        userId: user.$id,
        value: Math.max(streakProtector.value - 1, 0),
        $id: streakProtector.$id,
      });
    }
  };

  const handleNavigation = () => {
    if (currentId !== habit.$id) {
      router.replace(`/habit/${habit.$id}`);
      Vibration.vibrate(100);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    Vibration.vibrate();
  };

  useEffect(() => {
    setStreak(habit.streak);
  }, [habit.streak]);

  useEffect(() => {
    if (streakHasLoaded) {
      setIsAlert(isStreakLost(habit));
    }
  }, [streakHasLoaded, habit]);

  return (
    <>
      <Pressable
        onPress={handleNavigation}
        onLongPress={openModal}
        style={{ height: buttonSize }}
        className="my-2 flex w-full flex-row items-center justify-between rounded-full border-2 border-green bg-beige">
        <View className="flex flex-row items-center gap-2">
          {isChecked ? (
            <Pressable
              onPress={handleCheck}
              disabled={disabled}
              style={{ height: checkSize, width: checkSize }}
              className="m-1 flex items-center justify-center rounded-full">
              <Check />
            </Pressable>
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
      </Pressable>

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
