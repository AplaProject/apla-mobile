import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window');
const statusBarHeight = getStatusBarHeight();

export const Fonts = {
  regular: 'Lato-Regular',
  bold: 'Lato-Bold',
  thin: 'Lato-Thin',
  light: 'Lato-Light',
};
export const borderRadius = 12;
export const buttonsBorderRadius = 8;
export const scrollableContainerHeight = height - statusBarHeight - 100;

export const FontSizes = {
  smallCommonSize: 14,
  mediumCommonSize: 16,
  commonSize: 18,
  titleSize: 32,
  smallTitleSize: 28,
  modalTitleSize: 26,
};

export const Colors = {
  blue: '#4d3ebc',
  green: '#3AC28B',
  dark: '#1C1A1A',
  white: '#fff',
  violet: '#532B83',
  dangerRed: '#FA3356',
  lightGrey: '#DFDFDF',
  grey: '#717171',

  underlayGreen: 'rgba(58, 194, 139, .15)',
  underlayGreenLessOpacity: 'rgba(58, 194, 139, .45)',
  underlayRed: 'rgba(250, 51, 86, .15)',
};

export const cancelButton = {
  backgroundColor: 'transparent',
  borderColor: '#fff',
  borderWidth: 1,
  width: '100%',
  marginTop: 0,
}