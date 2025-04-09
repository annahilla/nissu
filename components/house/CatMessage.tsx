import { View, Text, Pressable, Animated, Easing } from 'react-native';
import React, { useState, useRef } from 'react';
import Cat from '@/assets/cat.svg';
import { Habit } from '@/types/habits';
import DialogBubble from '../ui/DialogBubble';

const CatMessage = ({ habit }: { habit: Habit }) => {
  const [isBubbleShowing, setIsBubbleShowing] = useState(false);
  const [showMessage, setShowMessage] = useState(false); // controla quin contingut mostrar
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const toggleBubble = () => {
    if (isBubbleShowing) {
      // Animació de sortida
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 250,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        // Després de desaparèixer, canvia el contingut i torna a aparèixer
        setIsBubbleShowing(false);
        setShowMessage(false);
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 250,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }).start();
      });
    } else {
      setShowMessage(true);
      setIsBubbleShowing(true);
      scaleAnim.setValue(0);
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
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

  return (
    <Pressable onPress={toggleBubble}>
      <View className="absolute bottom-1 right-2 h-auto">
        <Cat width={80} height={80} />
      </View>

      <View
        className="absolute"
        style={{ bottom: 80, right: isBubbleShowing ? 10 : 50 }}>
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
