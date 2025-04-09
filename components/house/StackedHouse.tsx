import { ScrollView, Image, View } from 'react-native';
import { useEffect, useRef } from 'react';
import BottomHouse from '@/assets/house/bottom-house.png';
import TopHouse from '@/assets/house/top-house.png';
import CenterFloor from '@/assets/house/center-floor.png';
import OneFloorHouse from '@/assets/house/one-floor.png';
import TwoFloorHouse from '@/assets/house/two-floors.png';
import NoHouse from '@/assets/house/no-house.png';
import { Habit } from '@/types/habits';

const StackedHouse = ({ habit }: { habit: Habit }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const getHouseImage = (habit: Habit) => {
    if (habit.streak === 0) {
      return NoHouse;
    } else if (habit.streak === 1) {
      return OneFloorHouse;
    } else if (habit.streak === 2) {
      return TwoFloorHouse;
    }
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  }, []);

  const onContentSizeChange = (contentHeight: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: contentHeight, animated: false });
    }
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'flex-end',
        paddingTop: 120,
        flexDirection: 'column',
        alignItems: 'center',
      }}
      style={{ flex: 1 }}
      contentInsetAdjustmentBehavior="always"
      showsVerticalScrollIndicator={false}
      onContentSizeChange={onContentSizeChange}>
      {habit.streak < 3 ? (
        <>
          <View className="absolute bottom-0 left-1/2 -translate-x-1/2 transform">
            <Image source={getHouseImage(habit)} />
          </View>
        </>
      ) : (
        <>
          <Image source={TopHouse} />
          {Array.from({ length: habit.streak - 3 }).map((_, index) => (
            <Image key={index} source={CenterFloor} />
          ))}
          <Image className="-mt-1" source={BottomHouse} />
        </>
      )}
    </ScrollView>
  );
};

export default StackedHouse;
