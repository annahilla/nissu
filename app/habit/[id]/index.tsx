import { View, Alert, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import habitsService from '@/services/habitService';
import { Habit } from '@/types/habits';
import LoadingScreen from '@/components/ui/LoadingScreen';
import HabitItem from '@/components/habits/HabitItem';
import BackIcon from '@/assets/back-icon.svg';
import CloudsBackground from '@/components/house/CloudsBackground';
import StackedHouse from '@/components/house/StackedHouse';

const HabitScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [habit, setHabit] = useState<Habit | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHabit();
  }, []);

  const fetchHabit = async () => {
    setIsLoading(true);
    const response = await habitsService.getHabit(id as string);

    if (response.error || !response.data) {
      Alert.alert('Error', response.error || 'No data received');
    } else {
      const fetchedHabit: Habit = {
        $id: response.data.$id,
        name: response.data.name,
        streak: response.data.streak,
        lastCompleted: response.data.lastCompleted,
      };
      setHabit(fetchedHabit);
    }

    setIsLoading(false);
  };

  if (isLoading || !habit) return <LoadingScreen />;

  return (
    <View className="relative flex-1">
      <CloudsBackground />

      <View className="absolute z-10 w-full">
        <View className="flex flex-row items-center justify-between gap-4 p-4">
          <TouchableOpacity onPress={() => router.replace('/')}>
            <BackIcon />
          </TouchableOpacity>
          <View className="flex-1">
            <HabitItem habit={habit} />
          </View>
        </View>
      </View>
      <StackedHouse habit={habit} />
    </View>
  );
};

export default HabitScreen;
