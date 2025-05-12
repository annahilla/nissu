import { View, Image, Dimensions, ImageSourcePropType } from 'react-native';
import { useEffect, useState } from 'react';
import { Habit } from '@/types/habits';
import OneFloorHouse from '@/assets/house/one-floor.png';
import TwoFloorHouse from '@/assets/house/two-floors.png';
import NoHouse from '@/assets/house/no-house.png';
import { useHabit } from '@/context/HabitContext';
import LoadingScreen from '../ui/LoadingScreen';

const getHouseImageAndAspectRatio = (
  habit: Habit
): { image: ImageSourcePropType; aspectRatio: number } => {
  if (habit.streak === 0) {
    return { image: NoHouse, aspectRatio: 1.5 };
  } else if (habit.streak === 1) {
    return { image: OneFloorHouse, aspectRatio: 1 };
  } else {
    return { image: TwoFloorHouse, aspectRatio: 1 };
  }
};

const SmallHouse = () => {
  const { habit } = useHabit();
  const { width } = Dimensions.get('window');
  const [aspectRatio, setAspectRatio] = useState(1.5);
  const height = width / aspectRatio;

  useEffect(() => {
    if (habit) {
      const { aspectRatio } = getHouseImageAndAspectRatio(habit);
      setAspectRatio(aspectRatio);
    }
  }, [habit]);

  if (!habit) return <LoadingScreen />;

  const { image: houseImage } = getHouseImageAndAspectRatio(habit);

  return (
    <View className="relative h-full w-full flex-1">
      <View className="absolute bottom-0 w-full">
        <Image
          className="absolute bottom-0"
          source={houseImage}
          resizeMode="cover"
          style={{
            width: '100%',
            height: height,
          }}
        />
      </View>
    </View>
  );
};

export default SmallHouse;
