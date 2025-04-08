import { ScrollView, Image } from 'react-native';
import React from 'react';
import BottomHouse from '@/assets/bottom-house.png';
import TopHouse from '@/assets/top-house.png';
import CenterFloor from '@/assets/center-floor.png';
import { Habit } from '@/types/habits';

const StackedHouse = ({ habit }: { habit: Habit }) => {
  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: 'flex-start',
        paddingTop: 30,
        flexDirection: 'column',
        alignItems: 'center',
      }}
      contentInsetAdjustmentBehavior="always"
      showsVerticalScrollIndicator={false}>
      <Image source={TopHouse} />
      {Array.from({ length: habit.streak - 3 }).map((_, index) => (
        <Image key={index} source={CenterFloor} />
      ))}
      <Image source={BottomHouse} />
    </ScrollView>
  );
};

export default StackedHouse;
