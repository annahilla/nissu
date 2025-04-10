import { TouchableOpacity, Text } from 'react-native';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'outline' | 'fill';
  color?: 'green' | 'brown';
  round?: boolean;
  onPress: () => void;
}

const Button = ({
  children,
  variant = 'fill',
  color = 'brown',
  round = false,
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

  if (variant === 'outline') {
    return (
      <TouchableOpacity
        onPress={onPress}
        className={`m-auto flex items-center justify-center rounded-full border border-2 ${round ? 'h-[3.8rem] w-[3.8rem]' : 'flex-1 p-2'} ${borderColors[color]}`}>
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
      className={`m-auto flex flex-1 items-center justify-center rounded-full p-2 ${backgroundColors[color]}`}>
      <Text className="text-lg font-semibold text-beige">{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
