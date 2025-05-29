import { getRandomCat, getRandomPosition } from '@/consts/cats';
import { useMessage } from '@/context/MessageContext';
import { useTilt } from '@/hooks/useTilt';
import { useMemo } from 'react';
import { Pressable, Animated, Vibration } from 'react-native';

const DynamicCat = () => {
  const { generateNewMessage } = useMessage();
  const { tilt, wiggle } = useTilt();
  const randomPosition = useMemo(() => getRandomPosition(), []);
  const randomCat = useMemo(() => getRandomCat(), []);

  const onCatPress = () => {
    wiggle();
    generateNewMessage();
    Vibration.vibrate(100);
  };

  return (
    <Pressable
      onPress={onCatPress}
      style={[{ position: 'absolute' }, randomPosition]}>
      <Animated.View style={{ transform: [{ rotate: tilt }] }}>
        {randomCat}
      </Animated.View>
    </Pressable>
  );
};

export default DynamicCat;
