import { Alert, Keyboard, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import habitsService from '@/services/habitService';
import { Habit } from '@/types/habits';
import HabitInput from '@/components/habits/HabitInput';
import BackgroundLayout from '@/components/layout/BackgroundLayout';
import HabitList from '@/components/habits/HabitList';
import Button from '@/components/ui/Button';
import HabitsHeader from '@/components/layout/Header';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import Cat from '@/assets/cats/cat.svg';
import CustomImageBackground from '@/components/layout/CustomImageBackground';
import LoadingScreen from '@/components/ui/LoadingScreen';
import DialogBubble from '@/components/ui/DialogBubble';

const HomeScreen = () => {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingNewHabit, setIsAddingNewHabit] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

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

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      {habits.length > 0 ? (
        <BackgroundLayout className="relative h-[56%]">
          <HabitsHeader />
          <HabitList
            habits={habits}
            updateHabit={updateHabit}
            deleteHabit={deleteHabit}
          />
          {isAddingNewHabit ? (
            <HabitInput
              onCancel={() => setIsAddingNewHabit(false)}
              newHabit={newHabit}
              setNewHabit={setNewHabit}
              addHabit={addHabit}
            />
          ) : (
            <Button
              onPress={() => setIsAddingNewHabit(true)}
              variant="outline"
              color="green">
              +
            </Button>
          )}
        </BackgroundLayout>
      ) : (
        <CustomImageBackground className="relative items-center justify-center">
          <View
            style={{
              marginBottom: keyboardVisible ? 80 : 0,
            }}>
            <DialogBubble>
              <Text className="text-center text-lg">
                Hi, I am Nissu. Create your first habit to start counting
                streaks!
              </Text>
              <View style={{ marginTop: 20, width: '80%' }}>
                {isAddingNewHabit ? (
                  <HabitInput
                    onCancel={() => setIsAddingNewHabit(false)}
                    newHabit={newHabit}
                    setNewHabit={setNewHabit}
                    addHabit={addHabit}
                  />
                ) : (
                  <Button
                    onPress={() => setIsAddingNewHabit(true)}
                    variant="outline"
                    color="green">
                    +
                  </Button>
                )}
              </View>
            </DialogBubble>
          </View>

          <View className="absolute bottom-2 right-4">
            <Cat />
          </View>
        </CustomImageBackground>
      )}
    </>
  );
};

export default HomeScreen;
