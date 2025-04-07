import { FlatList } from 'react-native';
import HabitItem from './HabitItem';
import { Habit } from '@/types/habits';

interface HabitListProps {
  habits: Habit[];
  deleteHabit: (id: string) => void;
  updateHabit: (id: string, updatedHabit: Habit) => void;
}

const HabitList = ({ habits, updateHabit, deleteHabit }: HabitListProps) => {
  return (
    <FlatList
      data={habits}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <HabitItem habit={item} onEdit={updateHabit} onDelete={deleteHabit} />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default HabitList;
