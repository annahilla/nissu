import { View, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import habitsService from '@/services/habitService';
import { Habit } from '@/types/habits';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { Asset } from 'expo-asset';
import HabitItem from '@/components/habits/HabitItem';
import BackIcon from '@/assets/back-icon.svg';

const noHouse = Asset.fromModule(require('@/assets/background.png')).uri;
const oneFloorHouse = Asset.fromModule(
  require('@/assets/one-floor-house.png')
).uri;

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
    <View className="flex-1">
      <ImageBackground
        source={{ uri: habit.streak === 0 ? noHouse : oneFloorHouse }}
        resizeMode="cover"
        className={`relative flex-1 justify-start`}>
        <View className="m-4 flex flex-row items-center justify-between gap-4">
          <TouchableOpacity onPress={() => router.replace('/')}>
            <BackIcon />
          </TouchableOpacity>
          <View className="flex-1">
            <HabitItem habit={habit} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HabitScreen;
