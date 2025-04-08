import { ImageBackground, View } from 'react-native';
import { Asset } from 'expo-asset';
import { Habit } from '@/types/habits';
import { ReactNode } from 'react';
import StackedHouse from './StackedHouse';
import CloudsBackground from './CloudsBackground';

interface HouseBackgroundProps {
  children: ReactNode;
  habit: Habit;
}

const HouseBackground = ({ children, habit }: HouseBackgroundProps) => {
  const noHouse = Asset.fromModule(require('@/assets/background.png')).uri;
  const oneFloorHouse = Asset.fromModule(
    require('@/assets/one-floor-house.png')
  ).uri;
  const twoFloorHouse = Asset.fromModule(
    require('@/assets/two-floor-house.png')
  ).uri;

  const getHouseImage = (habit: Habit) => {
    if (habit.streak === 0) {
      return noHouse;
    } else if (habit.streak === 1) {
      return oneFloorHouse;
    } else if (habit.streak === 2) {
      return twoFloorHouse;
    }
  };

  return (
    <View className="relative flex-1">
      <CloudsBackground />
      {habit.streak >= 0 && habit.streak <= 2 ? (
        <ImageBackground
          source={{ uri: getHouseImage(habit) }}
          resizeMode="cover"
          className="relative flex-1 justify-start">
          {children}
        </ImageBackground>
      ) : (
        <>
          {children}
          <StackedHouse habit={habit} />
        </>
      )}
    </View>
  );
};

export default HouseBackground;
