import { TouchableOpacity, Text } from 'react-native';
import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'outline' | 'fill';
  color?: 'green' | 'brown';
  onPress: () => void;
}

const Button = ({
  children,
  variant = 'fill',
  color = 'brown',
  onPress,
}: ButtonProps) => {
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
        className={`m-auto flex h-14 w-14 items-center justify-center rounded-full border border-2 ${borderColors[color]}`}>
        <Text className={`text-2xl ${textColors[color]}`}>{children}</Text>
      </TouchableOpacity>
    );
  }
};

export default Button;
