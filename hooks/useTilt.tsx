import { useRef } from 'react';
import { Animated, Easing } from 'react-native';

export const useTilt = () => {
  const tiltAnim = useRef(new Animated.Value(0)).current;

  const tilt = tiltAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '15deg'],
  });

  const wiggle = () => {
    tiltAnim.setValue(0);
    Animated.sequence([
      Animated.timing(tiltAnim, {
        toValue: 1,
        duration: 100,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(tiltAnim, {
        toValue: 0,
        duration: 100,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  };

  return { tilt, wiggle };
};
