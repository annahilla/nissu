import { View, Alert, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import habitsService from '@/services/habitService';
import { Habit } from '@/types/habits';
import LoadingScreen from '@/components/ui/LoadingScreen';
import HabitItem from '@/components/habits/HabitItem';
import BackIcon from '@/assets/back-icon.svg';
import HouseBackground from '@/components/house/HouseBackground';

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
    <HouseBackground habit={habit}>
      <View className="z-10 flex flex-row items-center justify-between gap-4 p-4">
        <TouchableOpacity onPress={() => router.replace('/')}>
          <BackIcon />
        </TouchableOpacity>
        <View className="flex-1">
          <HabitItem habit={habit} />
        </View>
      </View>
    </HouseBackground>
  );
};

export default HabitScreen;
