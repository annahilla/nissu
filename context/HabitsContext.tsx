import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { Habit } from '@/types/habits';
import { useAuth } from './AuthContext';
import { Alert } from 'react-native';
import habitsService from '@/services/habitService';
import { isStreakLost } from '@/utils/streaks';

interface HabitsContextInterface {
  habits: Habit[];
  newHabit: string;
  setNewHabit: (value: string) => void;
  updatedHabit: string;
  setUpdatedHabit: (value: string) => void;
  fetchHabits: () => void;
  addHabit: () => void;
  updateHabit: (id: string, updatedHabit: Habit) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  isLoading: boolean;
  isAddingNewHabit: boolean;
  setIsAddingNewHabit: (value: boolean) => void;
  areSomeStreaksLost: boolean;
}

interface HabitsProviderInterface {
  children: ReactNode;
}

const HabitsContext = createContext<HabitsContextInterface>({
  habits: [],
  newHabit: '',
  setNewHabit: () => {},
  updatedHabit: '',
  setUpdatedHabit: () => {},
  fetchHabits: async () => ({}),
  addHabit: async () => ({}),
  updateHabit: async () => {},
  deleteHabit: async () => {},
  isLoading: false,
  isAddingNewHabit: false,
  setIsAddingNewHabit: () => {},
  areSomeStreaksLost: true,
});

export const HabitsProvider = ({ children }: HabitsProviderInterface) => {
  const { user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newHabit, setNewHabit] = useState('');
  const [updatedHabit, setUpdatedHabit] = useState('');
  const [isAddingNewHabit, setIsAddingNewHabit] = useState(false);
  const [areSomeStreaksLost, setAreSomeStreaksLost] = useState(false);

  const fetchHabits = async () => {
    if (user) {
      setIsLoading(true);
      const response = await habitsService.getHabits(user.$id);

      if (response.error) {
        Alert.alert('Error', response.error);
      } else {
        setHabits(response.data as Habit[]);
      }

      setIsLoading(false);
    }
  };

  const addHabit = async () => {
    if (newHabit.trim() === '') return;

    if (user) {
      const response = await habitsService.addHabit(user.$id, newHabit);
      if (response.error) {
        Alert.alert('Error: ', response.error);
      } else {
        if (response.data && !response.error) {
          setHabits([...habits, response.data as unknown as Habit]);
        }
      }
      setNewHabit('');
      setIsAddingNewHabit(false);
    }
  };

  const updateHabit = async (id: string, updatedHabit: Habit) => {
    const { name, streak, lastCompleted } = updatedHabit;

    if (user) {
      const response = await habitsService.updateHabit(
        id,
        {
          name,
          streak,
          lastCompleted,
          $id: id,
        },
        user?.$id
      );

      if (response.error) {
        Alert.alert('Error: ', response.error);
      }

      setUpdatedHabit(name);
    }
  };

  const deleteHabit = async (id: string) => {
    const response = await habitsService.deleteHabit(id);
    if (response.error) {
      Alert.alert('Error:', response.error);
    } else {
      setHabits(habits.filter((habit) => habit.$id !== id));
    }
  };

  const lostStreakHabits = habits.some((habit) => isStreakLost(habit));

  useEffect(() => {
    if (habits) {
      setAreSomeStreaksLost(lostStreakHabits);
    }
  }, [lostStreakHabits]);

  return (
    <HabitsContext.Provider
      value={{
        habits,
        newHabit,
        setNewHabit,
        updatedHabit,
        setUpdatedHabit,
        fetchHabits,
        addHabit,
        updateHabit,
        deleteHabit,
        isLoading,
        isAddingNewHabit,
        setIsAddingNewHabit,
        areSomeStreaksLost,
      }}>
      {children}
    </HabitsContext.Provider>
  );
};

export const useHabits = () => useContext(HabitsContext);
