import { Alert, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import habitsService from '@/services/habitService';
import { Habit } from '@/types/habits';
import HabitInput from '@/components/habits/HabitInput';
import BackgroundLayout from '@/components/layout/BackgroundLayout';
import Spinner from '@/components/ui/Spinner';
import HabitList from '@/components/habits/HabitList';
import Button from '@/components/ui/Button';
import HabitsHeader from '@/components/layout/Header';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingNewHabit, setIsAddingNewHabit] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login');
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (user) {
      fetchHabits();
    }
  }, [user]);

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

    const response = await habitsService.updateHabit(id, {
      name,
      streak,
      lastCompleted,
      $id: id,
    });

    if (response.error) {
      Alert.alert('Error: ', response.error);
    }
  };

  const deleteHabit = async (id: string) => {
    Alert.alert('Delete Habit', 'Are you sure you want to delete this habit?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const response = await habitsService.deleteHabit(id);
          if (response.error) {
            Alert.alert('Error:', response.error);
          } else {
            setHabits(habits.filter((habit) => habit.$id !== id));
          }
        },
      },
    ]);
  };

  if (isLoading)
    return (
      <BackgroundLayout className="flex h-[55%] items-center justify-center">
        <Spinner />
      </BackgroundLayout>
    );

  return (
    <BackgroundLayout className="relative h-[55%]">
      <HabitsHeader />

      {habits.length === 0 ? (
        <Text className="flex-1 text-center text-2xl text-brown">
          You have no habits
        </Text>
      ) : (
        <HabitList
          habits={habits}
          updateHabit={updateHabit}
          deleteHabit={deleteHabit}
        />
      )}
      {isAddingNewHabit && (
        <HabitInput
          onCancel={() => setIsAddingNewHabit(false)}
          newHabit={newHabit}
          setNewHabit={setNewHabit}
          addHabit={addHabit}
        />
      )}

      {!isAddingNewHabit && (
        <Button
          onPress={() => setIsAddingNewHabit(true)}
          variant="outline"
          color="green">
          +
        </Button>
      )}
    </BackgroundLayout>
  );
};

export default HomeScreen;
