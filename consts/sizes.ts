import { Dimensions } from 'react-native';

const { height: deviceHeight } = Dimensions.get('window');

export const isTablet = deviceHeight >= 900;
export const isSmallTablet = deviceHeight >= 900 && deviceHeight < 1100;
export const isBigTablet = deviceHeight >= 1100;
export const isSmallDevice = deviceHeight < 700;

export const size = isSmallDevice ? '2.8rem' : '3.8rem';
export const buttonSize = isSmallDevice ? 50 : 55;
export const checkSize = buttonSize - 10;
export const streakSize = buttonSize - 1;
export const habitSectionSize = isSmallDevice ? 405 : isTablet ? 470 : 450;
