import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Asset } from 'expo-asset';
import Star from '@/assets/star.svg';
import HappyCat from '@/assets/happy-cat.svg';
import HabitItem from '@/components/HabitItem';

const background = Asset.fromModule(require('@/assets/background.png')).uri;

const HomeScreen = () => {
  return (
    <View className="flex-1">
      <ImageBackground
        source={{ uri: background }}
        resizeMode="cover"
        className="flex-1 items-center justify-center">
        <View className="bg-beige border-brown flex w-[80%] flex-col gap-10 rounded-xl border border-2 p-5">
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row items-center gap-2">
              <Star width={24} height={24} />
              <Text className="text-brown">4</Text>
            </View>
            <HappyCat width={24} height={24} />
          </View>

          <View className="flex flex-col gap-4">
            <HabitItem habit="Piano" streak={10} />
            <HabitItem habit="Llegir" streak={2} />
            <HabitItem habit="Gym" streak={4} />
          </View>

          <TouchableOpacity className="border-green/60 m-auto flex h-14 w-14 items-center justify-center rounded-full border border-2">
            <Text className="text-green/60 text-2xl">+</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
