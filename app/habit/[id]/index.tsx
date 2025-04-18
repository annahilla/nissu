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
import StackedHouse from '@/components/house/StackedHouse';
import CatMessage from '@/components/house/CatMessage';
import LosingStreakModal from '@/components/house/LosingStreakModal';
import { useHabit } from '@/context/HabitContext';
import { isStreakLost } from '@/utils/streaks';

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
    setIsLostStreak,
  } = useHabit();
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.replace('/');
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [router])
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

  useEffect(() => {
    setIsLostStreak(false);
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
    }
  }, [habit]);

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
            <HabitItem habit={habit} currentStreak={streak} />
          </View>
        </View>
      </View>
      {isLosingStreak && (
        <View className="absolute top-28 z-[100] w-full">
          <LosingStreakModal />
        </View>
      )}
      <StackedHouse />
      {!isLosingStreak && !isLostStreak && <CatMessage />}
    </View>
  );
};

export default HabitScreen;
