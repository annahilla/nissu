import { View } from 'react-native';
import TextBubble from '@/assets/text-bubble.svg';
import { ReactNode } from 'react';

const TextBubbleBackground = ({
  children,
  size = 380,
  style,
  marginTop = 0.3,
}: {
  children?: ReactNode;
  size?: number;
  style?: {};
  marginTop?: number;
}) => {
  return (
    <View className="relative flex items-center justify-center" style={style}>
      <TextBubble className="absolute top-2" width={size} height={size} />
      <View
        style={{
          top: size * marginTop,
        }}
        className="absolute flex w-[70%] items-center justify-center gap-4">
        {children}
      </View>
    </View>
  );
};

export default TextBubbleBackground;
