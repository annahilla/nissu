import MessageCard from '../layout/MessageCard';
import HabitsSection from './HabitsSection';
import DynamicCat from '../layout/DynamicCat';
import useKeyboardVisible from '@/hooks/useKeyboardVisible';
import { View } from 'react-native';

const HabitsScreen = () => {
  const { keyboardVisible } = useKeyboardVisible();

  return (
    <View className="relative flex h-full w-full">
      <View
        className="flex-1 items-center justify-center gap-4"
        style={{ marginBottom: keyboardVisible ? 0 : 50 }}>
        <View
          className={keyboardVisible ? 'hidden' : 'block w-full items-center'}>
          <MessageCard />
        </View>

        <HabitsSection />
      </View>

      <View className={keyboardVisible ? 'hidden' : 'block'}>
        <DynamicCat />
      </View>
    </View>
  );
};

export default HabitsScreen;
