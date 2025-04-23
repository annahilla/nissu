import { View, Text } from 'react-native';
import React from 'react';
import DialogBubble from '../ui/DialogBubble';
import HabitInput from '../habits/HabitInput';
import Button from '../ui/Button';
import Cat from '@/assets/cats/cat.svg';
import { useHabits } from '@/context/HabitsContext';
import useKeyboardVisible from '@/hooks/useKeyboardVisible';

const WelcomeScreen = () => {
  const { isAddingNewHabit, setIsAddingNewHabit } = useHabits();
  const { keyboardVisible } = useKeyboardVisible();

  return (
    <>
      <View
        style={{
          marginBottom: keyboardVisible ? 80 : 0,
        }}>
        <DialogBubble>
          <Text className="text-center text-lg">
            Hi, I am Nissu. Create your first habit to start counting streaks!
          </Text>
          <View style={{ marginTop: 20, width: '80%' }}>
            {isAddingNewHabit ? (
              <HabitInput />
            ) : (
              <Button
                onPress={() => setIsAddingNewHabit(true)}
                variant="outline"
                color="green"
                round={true}>
                +
              </Button>
            )}
          </View>
        </DialogBubble>
      </View>

      <View className="absolute bottom-2 right-4">
        <Cat />
      </View>
    </>
  );
};

export default WelcomeScreen;
