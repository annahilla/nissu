import { Animated, Keyboard, Pressable, Text, View } from 'react-native';
import { useState, useEffect, useMemo } from 'react';
import HabitInput from '@/components/habits/HabitInput';
import HabitList from '@/components/habits/HabitList';
import Button from '@/components/ui/Button';
import HabitsHeader from '@/components/layout/Header';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import Cat from '@/assets/cats/cat.svg';
import CustomImageBackground from '@/components/layout/CustomImageBackground';
import LoadingScreen from '@/components/ui/LoadingScreen';
import DialogBubble from '@/components/ui/DialogBubble';
import { Container } from '@/components/layout/Container';
import { getRandomCat, getRandomPosition } from '@/consts/cats';
import { useHabits } from '@/context/HabitsContext';
import { useMessage } from '@/context/MessageContext';
import { useTilt } from '@/hooks/useTilt';

const HomeScreen = () => {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { message, generateNewMessage, setMessage } = useMessage();
  const { tilt, wiggle } = useTilt();
  const {
    habits,
    isLoading,
    isAddingNewHabit,
    setIsAddingNewHabit,
    fetchHabits,
    areSomeStreaksLost,
  } = useHabits();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const randomPosition = useMemo(() => getRandomPosition(), []);
  const randomCat = useMemo(() => getRandomCat(), []);

  useEffect(() => {
    if (user) {
      fetchHabits();
    }
  }, [user]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login');
    }
  }, [user, authLoading]);

  useEffect(() => {
    setMessage('You have lost some streaks, be sure to check them up today');
  }, [areSomeStreaksLost]);

  if (isLoading) return <LoadingScreen />;

  return (
    <CustomImageBackground className="relative">
      {habits.length > 0 ? (
        <>
          {!keyboardVisible && (
            <View
              className="absolute m-4 flex h-20 w-[80%] items-center justify-center rounded-xl border border-2 border-brown/80 bg-beige/80 p-4"
              style={{ top: `${10}%` }}>
              <Text className="text-center">{message}</Text>
            </View>
          )}
          <Container className={`${keyboardVisible ? 'h-auto' : 'h-[56%]'}`}>
            <HabitsHeader isLosingStreak={areSomeStreaksLost} />
            <HabitList habits={habits} />
            <View className="w-full">
              <View className={isAddingNewHabit ? 'block' : 'hidden'}>
                <HabitInput />
              </View>
              {!isAddingNewHabit && (
                <Button
                  onPress={() => setIsAddingNewHabit(true)}
                  variant="outline"
                  color="green"
                  round>
                  +
                </Button>
              )}
            </View>
          </Container>
          {!keyboardVisible && (
            <Pressable
              onPress={() => {
                wiggle();
                generateNewMessage();
              }}
              style={[{ position: 'absolute' }, randomPosition]}>
              <Animated.View style={{ transform: [{ rotate: tilt }] }}>
                {randomCat}
              </Animated.View>
            </Pressable>
          )}
        </>
      ) : (
        <>
          <View
            style={{
              marginBottom: keyboardVisible ? 80 : 0,
            }}>
            <DialogBubble>
              <Text className="text-center text-lg">
                Hi, I am Nissu. Create your first habit to start counting
                streaks!
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
      )}
    </CustomImageBackground>
  );
};

export default HomeScreen;
