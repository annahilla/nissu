import { View, Text, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Container } from '../layout/Container';
import HabitsHeader from '../layout/Header';
import Button from '../ui/Button';
import DestroyedHouse from '@/assets/house/destroyed-house.png';
import { useHabit } from '@/context/HabitContext';
import Spinner from '../ui/Spinner';

const StreakLostHouse = () => {
  const { width, height: screenHeight } = Dimensions.get('window');
  const router = useRouter();
  const { habit } = useHabit();
  const height = width / 1;

  const topOffset = screenHeight * 0.18;

  const goBack = () => {
    router.push('/');
  };

  if (!habit) return <Spinner />;

  return (
    <View className="relative flex-1">
      <View style={{ top: topOffset }} className="absolute h-full w-full">
        <Container className="mx-auto">
          <HabitsHeader isStreakLost />
          <View className="flex gap-4">
            <Text className="text-center text-lg">
              You lost your streak for {habit.name} and the house was destroyed!
            </Text>
          </View>

          <Button onPress={goBack}>Go back</Button>
        </Container>
      </View>

      <View className="absolute bottom-0 w-full">
        <Image
          source={DestroyedHouse}
          className="absolute bottom-0"
          resizeMode="cover"
          style={{
            width: '100%',
            height: height,
          }}
        />
      </View>
    </View>
  );
};

export default StreakLostHouse;
