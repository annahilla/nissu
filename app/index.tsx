import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Asset } from 'expo-asset';
import Star from '@/assets/star.svg';
import HappyCat from '@/assets/happy-cat.svg';
import HabitItem from '@/components/HabitItem';
import { useState, useEffect } from 'react';
import habitsService from '@/services/habitService';
import { Habit } from '@/types/habits';
import HabitInput from '@/components/HabitInput';
import { Container } from '@/components/Container';

const background = Asset.fromModule(require('@/assets/background.png')).uri;

const HomeScreen = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingNewHabit, setIsAddingNewHabit] = useState(false);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    setIsLoading(true);
    const response = await habitsService.getHabits();

    if (response.error) {
      Alert.alert('Error', response.error);
    } else {
      setHabits(response.data as Habit[]);
    }

    setIsLoading(false);
  };

  const addHabit = async () => {
    if (newHabit.trim() === '') return;

    const response = await habitsService.addHabit(newHabit);

    if (response.error) {
      Alert.alert('Error: ', response.error);
    } else {
      if (response.data && !response.error) {
        setHabits([...habits, response.data as unknown as Habit]);
      }
    }
    setNewHabit('');
    setIsAddingNewHabit(false);
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

  return (
    <View className="flex-1">
      <ImageBackground
        source={{ uri: background }}
        resizeMode="cover"
        className="flex-1 items-center justify-center">
        <Container>
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row items-center gap-2">
              <Star width={24} height={24} />
              <Text className="text-brown">4</Text>
            </View>
            <HappyCat width={24} height={24} />
          </View>

          {isLoading ? (
            <ActivityIndicator className="my-10" color="#A68F75" size="large" />
          ) : (
            <FlatList
              data={habits}
              keyExtractor={(item) => item.$id}
              renderItem={({ item }) => (
                <HabitItem habit={item} onDelete={deleteHabit} />
              )}
              showsVerticalScrollIndicator={false}
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
            <TouchableOpacity
              onPress={() => setIsAddingNewHabit(true)}
              className="m-auto flex h-14 w-14 items-center justify-center rounded-full border border-2 border-green/60">
              <Text className="text-2xl text-green/60">+</Text>
            </TouchableOpacity>
          )}
        </Container>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
