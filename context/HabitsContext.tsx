import { createContext, useContext, useState, ReactNode } from 'react';
import { Habit } from '@/types/habits';
import { LayoutAnimation } from 'react-native';
import habitsService from '@/services/habitService';

interface HabitsContextInterface {
  habits: Habit[];
  addHabit: (habit: string) => void;
  deleteHabit: (id: string) => void;
  updateHabit: (habit: Habit) => void;
  isAddingNewHabit: boolean;
  setIsAddingNewHabit: (value: boolean) => void;
  isLoading: boolean;
  loadHabits: () => void;
}

interface HabitsProviderInterface {
  children: ReactNode;
}

const HabitsContext = createContext<HabitsContextInterface>({
  habits: [],
  addHabit: async () => ({}),
  deleteHabit: async () => ({}),
  updateHabit: async () => ({}),
  isAddingNewHabit: false,
  setIsAddingNewHabit: () => ({}),
  isLoading: true,
  loadHabits: () => ({}),
});

export const HabitsProvider = ({ children }: HabitsProviderInterface) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingNewHabit, setIsAddingNewHabit] = useState(false);

  const loadHabits = async () => {
    setIsLoading(true);
    const data = await habitsService.getHabits();
    const sortedData = data.sort((a: Habit, b: Habit) => {
      return new Date(a.id).getTime() - new Date(b.id).getTime();
    });
    setHabits(sortedData);
    setIsLoading(false);
  };

  const addHabit = async (newHabit: string) => {
    if (newHabit.trim() === '') return;

    const habit: Habit = {
      id: `${Date.now()}`,
      name: newHabit,
      streak: 0,
    };

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setHabits((prev) => [...prev, habit]);
    await habitsService.addHabit(habit);
    setIsAddingNewHabit(false);
  };

  const deleteHabit = async (id: string) => {
    await habitsService.deleteHabit(id);
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const updateHabit = async (updatedHabit: Habit) => {
    await habitsService.updateHabit(updatedHabit);
    setHabits((prev) =>
      prev.map((habit) => (habit.id === updatedHabit.id ? updatedHabit : habit))
    );
  };

  return (
    <HabitsContext.Provider
      value={{
        habits,
        addHabit,
        deleteHabit,
        updateHabit,
        isAddingNewHabit,
        setIsAddingNewHabit,
        isLoading,
        loadHabits,
      }}>
      {children}
    </HabitsContext.Provider>
  );
};

export const useHabits = () => useContext(HabitsContext);
