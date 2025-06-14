import {
  View,
  Alert,
  TouchableOpacity,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
  BackHandler,
} from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import habitsService from '@/services/habitService';
import { Habit } from '@/types/habits';
import LoadingScreen from '@/components/ui/LoadingScreen';
import HabitItem from '@/components/habits/HabitItem';
import BackIcon from '@/assets/icons/back-icon.svg';
import CloudsBackground from '@/components/layout/CloudsBackground';
import CatMessage from '@/components/house/CatMessage';
import LosingStreakModal from '@/components/house/LosingStreakModal';
import { useHabit } from '@/context/HabitContext';
import { isStreakLost } from '@/utils/streaks';
import House from '@/components/house/House';
import { onBackPress } from '@/utils/onBackPress';

const HabitScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const {
    habit,
    setHabit,
    isLosingStreak,
    setIsLosingStreak,
    isLostStreak,
    streak,
  } = useHabit();
  const [isLoading, setIsLoading] = useState(true);
  const [hasCheckedStreak, setHasCheckedStreak] = useState(false);

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

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

  useEffect(() => {
    if (habit) {
      const isCurrentStreakLost = isStreakLost(habit);
      setIsLosingStreak(isCurrentStreakLost);
      setHasCheckedStreak(true);
    }
  }, [habit]);

  if (isLoading || !habit || !hasCheckedStreak) return <LoadingScreen />;

  return (
    <View className="relative flex-1" {...panResponder.panHandlers}>
      <CloudsBackground />
      <View className="absolute z-10 w-full">
        <View className="mt-2 flex flex-row items-center justify-between gap-4 p-4">
          <TouchableOpacity onPress={() => router.replace('/')}>
            <BackIcon />
          </TouchableOpacity>
          <View className="flex-1">
            <HabitItem habit={habit} currentStreak={streak} disabled />
          </View>
        </View>
      </View>
      {isLosingStreak && (
        <View className="absolute top-28 z-[100] w-full">
          <LosingStreakModal />
        </View>
      )}

      <View className="relative flex-1">
        <House />
        <View className="absolute bottom-2 right-4">
          {!isLosingStreak && !isLostStreak && <CatMessage />}
        </View>
      </View>
    </View>
  );
};

export default HabitScreen;
