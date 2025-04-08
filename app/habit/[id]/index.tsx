import {
  View,
  Alert,
  TouchableOpacity,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import habitsService from '@/services/habitService';
import { Habit } from '@/types/habits';
import LoadingScreen from '@/components/ui/LoadingScreen';
import HabitItem from '@/components/habits/HabitItem';
import BackIcon from '@/assets/back-icon.svg';
import CloudsBackground from '@/components/house/CloudsBackground';
import StackedHouse from '@/components/house/StackedHouse';
import Cat from '@/assets/cat.svg';
import CatMessage from '@/components/house/CatMessage';

const HabitScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [habit, setHabit] = useState<Habit | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (
        _: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {
        return (
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
          Math.abs(gestureState.dx) > 20
        );
      },
      onPanResponderRelease: (
        _: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {
        if (gestureState.dx > 50) {
          router.replace('/');
        }
      },
    })
  ).current;

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
    <View className="relative flex-1" {...panResponder.panHandlers}>
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

      <CatMessage habit={habit} />
    </View>
  );
};

export default HabitScreen;
