import { ScrollView, Image, Dimensions } from 'react-native';
import { useEffect, useRef } from 'react';
import BottomHouse from '@/assets/house/bottom-house.png';
import TopHouse from '@/assets/house/top-house.png';
import CenterFloor from '@/assets/house/center-floor.png';
import { useHabit } from '@/context/HabitContext';
import LoadingScreen from '../ui/LoadingScreen';

const StackedHouse = () => {
  const { habit } = useHabit();
  const scrollViewRef = useRef<ScrollView>(null);
  const { width } = Dimensions.get('window');

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

  if (!habit) return <LoadingScreen />;

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
      <Image
        source={TopHouse}
        resizeMode="cover"
        style={{
          width: '100%',
          height: width / 2.25,
        }}
      />

      {Array.from({ length: habit.streak - 3 }).map((_, index) => (
        <Image
          className="-mt-1"
          key={index}
          source={CenterFloor}
          resizeMode="cover"
          style={{
            width: '100%',
            height: width / 3.35,
          }}
        />
      ))}
      <Image
        source={BottomHouse}
        resizeMode="cover"
        style={{
          width: '100%',
          height: width / 1,
        }}
      />
    </ScrollView>
  );
};

export default StackedHouse;
