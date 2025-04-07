import { View } from 'react-native';
import TextBubble from '@/assets/text-bubble.svg';

const TextBubbleBackground = ({ children }: { children?: React.ReactNode }) => {
  return (
    <View className="relative h-full w-full items-center justify-center">
      <View className="absolute bottom-64 h-72 w-full items-center justify-center">
        <TextBubble width={380} />
        <View className="absolute bottom-4 flex h-full w-[70%] items-center justify-center">
          <View className="flex gap-4">{children}</View>
        </View>
      </View>
    </View>
  );
};

export default TextBubbleBackground;
