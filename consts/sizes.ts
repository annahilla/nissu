import { Dimensions } from 'react-native';

const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

export const isTablet = deviceHeight >= 700;
export const isSmallDevice = deviceWidth < 400;

export const size = isSmallDevice ? '2.8rem' : '3.8rem';
export const buttonSize = isSmallDevice ? 45 : 61;
