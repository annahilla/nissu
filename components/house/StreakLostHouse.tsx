import { View, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Container } from '../layout/Container';
import HabitsHeader from '../layout/Header';
import Button from '../ui/Button';
import DestroyedHouse from '@/assets/house/destroyed-house.png';
import { useHabit } from '@/context/HabitContext';
import Spinner from '../ui/Spinner';

const StreakLostHouse = () => {
  const router = useRouter();
  const { habit } = useHabit();

  const goBack = () => {
    router.push('/');
  };

  if (!habit) return <Spinner />;

  return (
    <View className="relative h-full w-full flex-1">
      <Container className="mx-auto">
        <HabitsHeader isStreakLost />
        <View className="flex gap-4">
          <Text className="text-center text-lg">
            You lost your streak for {habit.name} and the house was destroyed!
          </Text>
        </View>

        <Button onPress={goBack}>Go back</Button>
      </Container>
      <View className="absolute bottom-0 left-1/2 -translate-x-1/2 transform">
        <Image source={DestroyedHouse} style={{ width: 400, height: 300 }} />
      </View>
    </View>
  );
};

export default StreakLostHouse;
