import { Keyboard, Text, View } from 'react-native';
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
import { useHabits } from '@/context/HabitContext';

const HomeScreen = () => {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const {
    habits,
    isLoading,
    isAddingNewHabit,
    setIsAddingNewHabit,
    fetchHabits,
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

  if (isLoading) return <LoadingScreen />;

  return (
    <CustomImageBackground className="relative">
      {habits.length > 0 ? (
        <>
          <Container className="h-[56%]">
            <HabitsHeader />
            <HabitList habits={habits} />
            {isAddingNewHabit ? (
              <HabitInput />
            ) : (
              <Button
                onPress={() => setIsAddingNewHabit(true)}
                variant="outline"
                color="green"
                round>
                +
              </Button>
            )}
          </Container>
          <View style={[{ position: 'absolute' }, randomPosition]}>
            {randomCat}
          </View>
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
