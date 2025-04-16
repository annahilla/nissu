import { Habit } from '@/types/habits';
import { View, Text, TouchableOpacity } from 'react-native';
import Check from '@/assets/icons/check.svg';
import { useEffect, useState } from 'react';
import { isCompletedToday, isStreakLost } from '@/utils/streaks';
import { useLocalSearchParams, useRouter } from 'expo-router';
import EditHabitModal from './EditHabitModal';
import { useHabits } from '@/context/HabitsContext';
import { useAuth } from '@/context/AuthContext';
import { useStreakProtector } from '@/context/StreakProtectorContext';
import { useMessage } from '@/context/MessageContext';

const HabitItem = ({
  habit,
  currentStreak,
}: {
  habit: Habit;
  currentStreak?: number;
}) => {
  const { user } = useAuth();
  const { updateHabit } = useHabits();
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

  const [isChecked, setIsChecked] = useState(completed);
  const [streak, setStreak] = useState(habit.streak);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedHabit, setUpdatedHabit] = useState(habit.name);

  const handleCheck = async () => {
    let newStreak = streak;
    let newLastCompleted = habit.lastCompleted;

    const wasMultipleOf7 = streak > 0 && streak % 7 === 0;

    if (!isChecked) {
      newStreak += 1;
      newLastCompleted = today;
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

  const handleLooseStreak = () => {
    const isLostStreak = isStreakLost(habit);

    if (isLostStreak) {
      //router.push(`/habit/${habit.$id}`);
    }
  };

  useEffect(() => {
    handleLooseStreak();
  }, []);

  const handleNavigation = () => {
    if (currentId !== habit.$id) {
      router.replace(`/habit/${habit.$id}`);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={handleNavigation}
        onLongPress={() => setIsModalOpen(true)}
        className="my-2 flex h-[3.8rem] w-full flex-row items-center justify-between rounded-full border border-2 border-green bg-beige">
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

          <Text className="max-w-28 text-lg">{updatedHabit}</Text>
        </View>
        <View
          className={`${isChecked ? 'bg-orange' : 'bg-lightOrange'} flex h-14 w-14 items-center justify-center rounded-full`}>
          <Text className="text-white">
            {currentStreak ? currentStreak : streak}
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
