import { View, Text, Pressable, Animated, Easing } from 'react-native';
import React, { useState, useRef } from 'react';
import Cat from '@/assets/cat.svg';
import { Habit } from '@/types/habits';
import DialogBubble from '../ui/DialogBubble';

const CatMessage = ({ habit }: { habit: Habit }) => {
  const [isBubbleShowing, setIsBubbleShowing] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const tiltAnim = useRef(new Animated.Value(0)).current;

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

  const scaleBubble = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 250,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const toggleBubble = () => {
    wiggle();
    if (isBubbleShowing) {
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 250,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        setIsBubbleShowing(false);
        setShowMessage(false);
        scaleBubble();
      });
    } else {
      setShowMessage(true);
      setIsBubbleShowing(true);
      scaleAnim.setValue(0);
      scaleBubble();
    }
  };

  const message = () => {
    const { streak } = habit;

    if (streak === 0) {
      return "When you complete this habit you'll get a one floor house!";
    } else if (streak <= 2) {
      return 'Nice little house! Hope you add one more floor tomorrow!';
    } else if (streak <= 5) {
      return 'This is starting to look cozy! Keep going!';
    } else if (streak <= 9) {
      return 'Woah! Your house is getting taller!';
    } else if (streak <= 14) {
      return "You're on fire! This streak is inspiring!";
    } else {
      return "You built a skyscraper! I'm so proud of you!";
    }
  };

  const tilt = tiltAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '15deg'],
  });

  return (
    <Pressable onPress={toggleBubble}>
      <Animated.View
        className="absolute bottom-1 right-2"
        style={{ transform: [{ rotate: tilt }, { scaleX: -1 }] }}>
        <Cat width={80} height={80} />
      </Animated.View>

      <View
        style={{
          position: 'absolute',
          bottom: 80,
          right: isBubbleShowing ? 5 : 55,
          zIndex: 1,
        }}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <DialogBubble size="small" width={isBubbleShowing ? 170 : undefined}>
            <Text className="text-center">{showMessage ? message() : '!'}</Text>
          </DialogBubble>
        </Animated.View>
      </View>
    </Pressable>
  );
};

export default CatMessage;
