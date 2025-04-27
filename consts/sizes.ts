import { Dimensions } from 'react-native';

const { height: deviceHeight } = Dimensions.get('window');

export const isTablet = deviceHeight >= 700;
export const isSmallDevice = deviceHeight < 700;

export const size = isSmallDevice ? '2.8rem' : '3.8rem';
export const buttonSize = isSmallDevice ? 45 : 55;
