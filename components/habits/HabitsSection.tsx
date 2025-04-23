import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { Container } from '../layout/Container';
import HabitsHeader from '../layout/Header';
import HabitList from './HabitList';
import HabitInput from './HabitInput';
import Button from '../ui/Button';
import { useHabits } from '@/context/HabitsContext';
import useKeyboardVisible from '@/hooks/useKeyboardVisible';

const HabitsSection = () => {
  const { habits, isAddingNewHabit, setIsAddingNewHabit, areSomeStreaksLost } =
    useHabits();

  const { keyboardVisible } = useKeyboardVisible();

  return (
    <Container className={`${keyboardVisible ? 'h-auto' : 'h-[56%]'}`}>
      <HabitsHeader isLosingStreak={areSomeStreaksLost} showModal />
      <HabitList habits={habits} />
      <View className="w-full">
        <View className={isAddingNewHabit ? 'block' : 'hidden'}>
          <HabitInput />
        </View>
        {!isAddingNewHabit && (
          <Button
            onPress={() => setIsAddingNewHabit(true)}
            variant="outline"
            color="green"
            round>
            +
          </Button>
        )}
      </View>
    </Container>
  );
};

export default HabitsSection;
