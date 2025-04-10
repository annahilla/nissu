import { FlatList } from 'react-native';
import HabitItem from './HabitItem';
import { Habit } from '@/types/habits';

interface HabitListProps {
  habits: Habit[];
}

const HabitList = ({ habits }: HabitListProps) => {
  return (
    <FlatList
      data={habits}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => <HabitItem habit={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default HabitList;
