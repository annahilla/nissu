import { useHabit } from '@/context/HabitContext';
import LoadingScreen from '../ui/LoadingScreen';
import StreakLostHouse from './StreakLostHouse';
import StackedHouse from './StackedHouse';
import SmallHouse from './SmallHouse';

const House = () => {
  const { habit, isLostStreak } = useHabit();

  if (!habit) return <LoadingScreen />;

  return (
    <>
      {isLostStreak ? (
        <StreakLostHouse />
      ) : habit.streak < 3 ? (
        <SmallHouse />
      ) : (
        <StackedHouse />
      )}
    </>
  );
};

export default House;
