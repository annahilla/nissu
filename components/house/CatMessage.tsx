import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import TextBubbleBackground from '../ui/TextBubbleBackground';
import Cat from '@/assets/cat.svg';
import { Habit } from '@/types/habits';

const CatMessage = ({ habit }: { habit: Habit }) => {
  const [isBubbleShowing, setIsBubbleShowing] = useState(false);

  const toggleBubble = () => {
    setIsBubbleShowing((prev) => !prev);
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
    <TouchableOpacity onPress={toggleBubble}>
      <View className="absolute bottom-1 right-2 h-auto">
        <Cat width={80} height={80} />
      </View>
      {isBubbleShowing ? (
        <View style={{ bottom: 45, right: 2 }} className="absolute">
          <TextBubbleBackground size={180}>
            <Text className="text-center">{message()}</Text>
          </TextBubbleBackground>
        </View>
      ) : (
        <View style={{ bottom: 70, right: 40 }} className="absolute">
          <TextBubbleBackground size={50} marginTop={0.27}>
            <Text className="text-center">!</Text>
          </TextBubbleBackground>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CatMessage;
