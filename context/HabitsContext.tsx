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
import { isStreakLost, streakHasToBeReseted } from '@/utils/streaks';
import { useMessage } from './MessageContext';

interface HabitsContextInterface {
  habits: Habit[];
  updatedHabit: string;
  setUpdatedHabit: (value: string) => void;
  fetchHabits: () => void;
  addHabit: (habit: string) => void;
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
  const { setMessage, generateNewMessage } = useMessage();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatedHabit, setUpdatedHabit] = useState('');
  const [isAddingNewHabit, setIsAddingNewHabit] = useState(false);
  const [areSomeStreaksLost, setAreSomeStreaksLost] = useState(false);
  const [lostStreakHabits, setLostStreakHabits] = useState(false);

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

  const addHabit = async (newHabit: string) => {
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

  const habitsToReset = habits.filter((habit) => streakHasToBeReseted(habit));

  const resetAllHabits = async () => {
    const updatedHabits = await Promise.all(
      habitsToReset.map(async (habit) => {
        const updatedHabit = { ...habit, streak: 0 };
        await updateHabit(habit.$id, updatedHabit);
        return updatedHabit;
      })
    );

    setHabits((prev) =>
      prev.map((habit) => {
        const updated = updatedHabits.find((h) => h.$id === habit.$id);
        return updated ? updated : habit;
      })
    );

    setMessage('Today is a sad day, you completely lost a streak and a house');
  };

  useEffect(() => {
    if (habits && habitsToReset.length > 0) {
      resetAllHabits();
    }
  }, [habitsToReset]);

  useEffect(() => {
    const areHabitsLost = habits.some((habit) => isStreakLost(habit));
    setLostStreakHabits(areHabitsLost);
  }, [habits]);

  useEffect(() => {
    if (habits) {
      setAreSomeStreaksLost(lostStreakHabits);
    }
  }, [lostStreakHabits]);

  useEffect(() => {
    if (areSomeStreaksLost && habitsToReset.length === 0) {
      setMessage('You have lost some streaks, be sure to check them up today');
    }
  }, [areSomeStreaksLost]);

  return (
    <HabitsContext.Provider
      value={{
        habits,
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
