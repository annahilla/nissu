import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { Habit } from '@/types/habits';
import { useAuth } from './AuthContext';
import { Alert, LayoutAnimation } from 'react-native';
import habitsService from '@/services/habitService';
import { isStreakLost, streakHasToBeReseted } from '@/utils/streaks';
import { useMessage } from './MessageContext';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  streakHasLoaded: boolean;
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
  streakHasLoaded: false,
});

export const HabitsProvider = ({ children }: HabitsProviderInterface) => {
  const { user } = useAuth();
  const { setMessage } = useMessage();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatedHabit, setUpdatedHabit] = useState('');
  const [isAddingNewHabit, setIsAddingNewHabit] = useState(false);
  const [areSomeStreaksLost, setAreSomeStreaksLost] = useState(false);
  const [streakHasLoaded, setStreakHasLoaded] = useState(false);

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
    if (newHabit.trim() === '' || !user) return;

    const provisionalHabit: Habit = {
      $id: `${Date.now()}`,
      name: newHabit,
      streak: 0,
    };

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setHabits((prev) => [...prev, provisionalHabit]);

    const response = await habitsService.addHabit(user.$id, newHabit);
    if (response.error) {
      Alert.alert('Error', response.error);
      setHabits((prev) =>
        prev.filter((habit) => habit.$id !== provisionalHabit.$id)
      );
    } else {
      setHabits((prev) =>
        prev.map((habit) =>
          habit.$id === provisionalHabit.$id
            ? (response.data as unknown as Habit)
            : habit
        )
      );
    }

    setIsAddingNewHabit(false);
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

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const scheduleReminderNotification = async () => {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Don't lose your streaks! 🌟",
        body: 'You still have habits to complete today.',
        data: { screen: 'index' },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: 20,
        minute: 0,
      },
    });

    await AsyncStorage.setItem('todayReminderNotificationId', id);
  };

  const cancelTodayNotificationIfAllCompleted = async () => {
    const incompleteHabits = habits.filter((habit) => {
      if (!habit.lastCompleted) return true;
      const lastDate = new Date(habit.lastCompleted);
      return !isToday(lastDate);
    });

    if (incompleteHabits.length === 0) {
      const id = await AsyncStorage.getItem('todayReminderNotificationId');
      if (id) {
        await Notifications.cancelScheduledNotificationAsync(id);
      }
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
    setStreakHasLoaded(true);
  };

  useEffect(() => {
    if (!habits.length) return;

    const lost = habits.some((habit) => isStreakLost(habit));
    setAreSomeStreaksLost(lost);

    const toReset = habits.filter((habit) => streakHasToBeReseted(habit));
    if (toReset.length > 0) {
      resetAllHabits();
    } else if (lost) {
      setMessage('You have lost some streaks, be sure to check them up today');
      setStreakHasLoaded(true);
    }
  }, [habits]);

  useEffect(() => {
    if (!isLoading && habits.length > 0) {
      scheduleReminderNotification();
      cancelTodayNotificationIfAllCompleted();
    }
  }, [isLoading, habits]);

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
        streakHasLoaded,
      }}>
      {children}
    </HabitsContext.Provider>
  );
};

export const useHabits = () => useContext(HabitsContext);
