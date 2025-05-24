import { View, StyleSheet } from 'react-native';
import { ReactNode } from 'react';

const DialogBubble = ({
  children,
  size = 'large',
  width,
}: {
  children: ReactNode;
  size?: 'small' | 'large';
  width?: number;
}) => {
  const paddingHorizontal = size === 'large' ? 40 : 20;
  const paddingVertical = size === 'large' ? 40 : 10;

  const dynamicStyles = {
    bubble: {
      paddingHorizontal: paddingHorizontal,
      paddingVertical: paddingVertical,
      width: width,
    },
    triangle: {
      borderLeftWidth: paddingVertical,
      borderRightWidth: paddingVertical,
      borderBottomWidth: paddingVertical,
    },
  };

  return (
    <View style={styles.container}>
      <View style={[styles.bubble, dynamicStyles.bubble]}>{children}</View>
      <View style={styles.triangleWrapper}>
        <View style={[styles.triangle, dynamicStyles.triangle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'relative',
  },
  bubble: {
    backgroundColor: '#E9E8DF',
    borderRadius: 9999,
    display: 'flex',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  triangleWrapper: {
    position: 'absolute',
    bottom: 0,
    transform: [{ rotate: '35deg' }],
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#E9E8DF',
  },
});

export default DialogBubble;
