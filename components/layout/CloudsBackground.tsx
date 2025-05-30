import {
  ImageBackground,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { useEffect, useRef } from 'react';
import clouds from '@/assets/background/clouds.png';
import {
  ANIMATION_DURATION,
  ANIMATION_TO_VALUE,
  INPUT_RANGE_END,
  INPUT_RANGE_START,
  OUTPUT_RANGE_END,
  OUTPUT_RANGE_START,
} from '@/consts/animatedBackground';
import React from 'react';

const { width, height } = Dimensions.get('window');

const CloudsBackground = () => {
  const initialValue = 0;
  const translateValue = useRef(new Animated.Value(initialValue)).current;

  useEffect(() => {
    const translate = () => {
      translateValue.setValue(initialValue);
      Animated.timing(translateValue, {
        toValue: ANIMATION_TO_VALUE,
        duration: ANIMATION_DURATION,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => translate());
    };

    translate();
  }, [translateValue]);

  const translateAnimation = translateValue.interpolate({
    inputRange: [INPUT_RANGE_START, INPUT_RANGE_END],
    outputRange: [OUTPUT_RANGE_START, OUTPUT_RANGE_END],
  });

  const AnimetedImage = Animated.createAnimatedComponent(ImageBackground);

  return (
    <AnimetedImage
      source={clouds}
      resizeMode="cover"
      style={[
        styles.background,
        {
          transform: [
            { translateX: translateAnimation },
            { translateY: translateAnimation },
          ],
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    width: width * 2.5,
    height: height * 2.5,
    top: 0,
    transform: [{ translateX: 0 }, { translateY: 0 }],
  },
});

export default React.memo(CloudsBackground);
