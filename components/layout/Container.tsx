import { isSmallDevice } from '@/consts/sizes';
import { View, StyleProp, ViewStyle } from 'react-native';

export const Container = ({
  children,
  className = '',
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <View
      style={style}
      className={`flex w-[80%] flex-col rounded-xl border-2 border-brown bg-beige p-5 text-center ${className} ${isSmallDevice ? 'gap-4' : 'gap-8'}`}>
      {children}
    </View>
  );
};
