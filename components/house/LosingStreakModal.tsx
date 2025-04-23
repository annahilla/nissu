import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { Container } from '../layout/Container';
import HabitsHeader from '../layout/Header';
import Button from '../ui/Button';
import { useAuth } from '@/context/AuthContext';
import { useHabits } from '@/context/HabitsContext';
import { useStreakProtector } from '@/context/StreakProtectorContext';
import { useHabit } from '@/context/HabitContext';
import Spinner from '../ui/Spinner';
import { yesterday } from '@/consts/dates';
import Cookie from '@/assets/icons/cookie.svg';
import { useMessage } from '@/context/MessageContext';

const LosingStreakModal = () => {
  const { user } = useAuth();
  const { setMessage } = useMessage();
  const { habit, setHabit, setIsLosingStreak, setIsLostStreak, setStreak } =
    useHabit();
  const { updateHabit } = useHabits();
  const { streakProtector, updateStreakProtector } = useStreakProtector();

  const loseStreak = () => {
    if (habit) {
      const updatedHabit = {
        ...habit,
        streak: 0,
      };
      updateHabit(habit.$id, updatedHabit);
      setHabit(updatedHabit);
      setStreak(0);
      setIsLosingStreak(false);
      setIsLostStreak(true);
      setMessage(`You lost the streak for ${habit.name}`);
    }
  };

  const spendStreakProtector = () => {
    if (user && habit) {
      updateStreakProtector(streakProtector.$id, {
        userId: user.$id,
        value: streakProtector.value - 1,
        $id: streakProtector.$id,
      });

      const updatedHabit = {
        ...habit,
        lastCompleted: yesterday,
      };
      updateHabit(habit.$id, updatedHabit);
      setHabit(updatedHabit);
      setMessage(`Yay! You saved the streak for ${habit.name}`);
    }
    setIsLosingStreak(false);
  };

  useEffect(() => {
    if (streakProtector.value === 0) {
      loseStreak();
    }
  }, []);

  if (!habit) return <Spinner />;

  return (
    <Container className=" mx-auto">
      <HabitsHeader isStreakLost />
      <View className="flex gap-4">
        <Text className="text-center text-lg font-bold">
          Oh no! You forgot to complete your habit: {habit.name}
        </Text>
        <Text className="text-center text-lg">
          Nissu is doing his best to save your house... but he needs a cookie to
          keep it standing!
        </Text>
      </View>
      <View className="flex flex-row gap-2">
        <Button variant="outline" onPress={loseStreak}>
          Let it fall
        </Button>
        <Button onPress={spendStreakProtector}>
          <View className="flex flex-row items-center justify-center gap-2">
            <Cookie width={22} height={22} />
            <Text className="font-bold text-beige">Give cookie</Text>
          </View>
        </Button>
      </View>
    </Container>
  );
};

export default LosingStreakModal;
