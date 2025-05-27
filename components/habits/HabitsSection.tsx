import { View } from 'react-native';
import { Container } from '../layout/Container';
import HabitsHeader from '../layout/Header';
import HabitList from './HabitList';
import HabitInput from './HabitInput';
import Button from '../ui/Button';
import { useHabits } from '@/context/HabitsContext';
import { habitSectionSize, isBigTablet, isTablet } from '@/consts/sizes';
import { useEffect, useState } from 'react';

const HabitsSection = () => {
  const { habits, isAddingNewHabit, setIsAddingNewHabit, areSomeStreaksLost } =
    useHabits();
  const [size, setSize] = useState(habitSectionSize);

  const extraHabits = habits.length - 4;
  const cappedExtraHabits = Math.min(extraHabits, isBigTablet ? 5 : 2);

  useEffect(() => {
    if (habits.length > 4 && isTablet) {
      const increment = 72 * cappedExtraHabits;
      setSize(habitSectionSize + increment);
    } else {
      setSize(habitSectionSize);
    }
  }, [habits.length]);

  return (
    <Container style={{ height: size }}>
      <HabitsHeader isLosingStreak={areSomeStreaksLost} showModal />
      <HabitList habits={habits} />
      <View className="w-full">
        <View className={isAddingNewHabit ? 'block' : 'hidden'}>
          <HabitInput />
        </View>
        <View className={isAddingNewHabit ? 'hidden' : 'block'}>
          <Button
            onPress={() => setIsAddingNewHabit(true)}
            variant="outline"
            color="green"
            round>
            +
          </Button>
        </View>
      </View>
    </Container>
  );
};

export default HabitsSection;
