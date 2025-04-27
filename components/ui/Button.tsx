import { TouchableOpacity, Text } from 'react-native';
import { ReactNode } from 'react';
import { buttonSize } from '@/consts/sizes';

interface ButtonProps {
  children: ReactNode;
  variant?: 'outline' | 'fill';
  color?: 'green' | 'brown';
  round?: boolean;
  className?: string;
  onPress: () => void;
}

const Button = ({
  children,
  variant = 'fill',
  color = 'brown',
  round = false,
  className,
  onPress,
}: ButtonProps) => {
  const backgroundColors = {
    green: 'bg-green',
    brown: 'bg-brown',
  };

  const borderColors = {
    green: 'border-green',
    brown: 'border-brown',
  };

  const textColors = {
    green: 'text-green',
    brown: 'text-brown',
  };

  const padding = round ? '' : 'px-6 py-3';

  if (variant === 'outline') {
    return (
      <TouchableOpacity
        onPress={onPress}
        className={`${className} m-auto flex items-center justify-center rounded-full border border-2 ${borderColors[color]} ${padding}`}
        style={
          round
            ? { height: buttonSize, width: buttonSize }
            : { paddingHorizontal: 24, paddingVertical: 12 }
        }>
        <Text
          className={`${round ? 'text-2xl' : 'text-lg'} ${textColors[color]}`}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${className} m-auto flex items-center justify-center rounded-full ${padding} ${backgroundColors[color]}`}>
      <Text className="text-lg font-semibold text-beige">{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
