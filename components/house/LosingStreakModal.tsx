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

const LosingStreakModal = () => {
  const { user } = useAuth();
  const { habit, setIsLosingStreak, setIsLostStreak, setStreak } = useHabit();
  const { updateHabit } = useHabits();
  const { streakProtector, updateStreakProtector } = useStreakProtector();

  const looseStreak = () => {
    if (habit) {
      const updatedHabit = {
        ...habit,
        streak: 0,
      };
      updateHabit(habit.$id, updatedHabit);
      setStreak(0);
      setIsLosingStreak(false);
      setIsLostStreak(true);
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
    }
    setIsLosingStreak(false);
  };

  useEffect(() => {
    looseStreak();
  }, []);

  if (!habit) return <Spinner />;

  return (
    <Container className=" mx-auto">
      <HabitsHeader isStreakLost />
      <View className="flex gap-4">
        <Text className="text-center text-lg">
          Oh no! You lost your streak for {habit.name}!
        </Text>
        <Text className="text-center text-lg">
          Nissu is protecting your house but if you don't give him a cookie it
          will fall apart
        </Text>
      </View>
      <View className="flex flex-row gap-2">
        <Button variant="outline" onPress={looseStreak}>
          Loose house
        </Button>
        <Button onPress={spendStreakProtector}>Give a cookie</Button>
      </View>
    </Container>
  );
};

export default LosingStreakModal;
