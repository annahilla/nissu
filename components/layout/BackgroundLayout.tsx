import { View, ImageBackground } from 'react-native';
import { Container } from './Container';
import { ReactNode } from 'react';
import { Asset } from 'expo-asset';

const background = Asset.fromModule(require('@/assets/background.png')).uri;

const BackgroundLayout = ({ children }: { children: ReactNode }) => {
  return (
    <View className="flex-1">
      <ImageBackground
        source={{ uri: background }}
        resizeMode="cover"
        className="flex-1 items-center justify-center">
        <Container>{children}</Container>
      </ImageBackground>
    </View>
  );
};

export default BackgroundLayout;
