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

const background = Asset.fromModule(require('@/assets/background.png')).uri;

const HomeScreen = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    setIsLoading(true);
    const response = await habitsService.getHabits();

    if (response.error) {
      setError(response.error);
      Alert.alert('Error', response.error);
    } else {
      setHabits(response.data as Habit[]);
      setError(null);
    }

    setIsLoading(false);
  };

  return (
    <View className="flex-1">
      <ImageBackground
        source={{ uri: background }}
        resizeMode="cover"
        className="flex-1 items-center justify-center">
        <View className="flex w-[80%] flex-col gap-10 rounded-xl border border-2 border-brown bg-beige p-5">
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
              renderItem={({ item }) => <HabitItem habit={item} />}
            />
          )}

          <TouchableOpacity className="m-auto flex h-14 w-14 items-center justify-center rounded-full border border-2 border-green/60">
            <Text className="text-2xl text-green/60">+</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
