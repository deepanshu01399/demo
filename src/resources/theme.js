import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export const androidHeaderHeight = height / 11;
export const iosHeaderHeight = height / 8.5;
export const tabletHeaderHeight = height / 12;

export const COLORS = {
  appDefaultColor: '#3079BD', 
  lightGrayColor: '#CDCDD2', 
  lightBlueColor: '#f0f5fb',
  black: '#1E1F20',
  white: '#FFFFFF',
  dimRed: '#ffaea7',
  dimAppBlue: '#97bcde',
  whiteSmoke: '#F0F0F0',
  lightGray: '#F5F5F6',
  lightGray2: '#F6F6F7',
  lightGray3: '#EFEFF1',
  lightGray4: '#F8F8F9',
  lightGray5: '#f4f4f4',
  transparent: 'transparent',
  darkgray: '#707070',
  placeHolderColor: '#b8b8b8',
  status: '#1BC63C',
  appLightGray: '#b8b8b8',
  red: '#D96464',
  green: '#088647',
  aqua: '#2D78B9',
  violet: '#A377FF',
  selectedBlueColor: '#e4f8ff',
  redColor: '#B82F26',
  greenColor: '#458810',
  selectedItemColor: '#cae9ff',
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  h0: 40,
  h1: 30,
  h2: 18,
  h3: 22,
  h4: 16,
  h5: 14,
  body1: 30,
  body2: 22,
  body3: 20,
  body4: 16,
  body5: 14,
  body6: 12,

  width,
  height,
};

export const FONTS = {
  // Common header
  headerFont: {fontFamily: 'Poppins-Medium', fontSize: 18},

  //No data found
  noDataFoundFont: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: COLORS.darkgray,
  },

  // Stock List
  headerText: {fontFamily: 'Poppins-Regular', fontSize: 13},
  headerText2: {fontFamily: 'Poppins-Medium', fontSize: 12},
  buyTextFont: {fontFamily: 'Poppins-Medium', fontSize: 15},
  listHeadingTextFont: {fontFamily: 'Poppins-Medium', fontSize: 14},
  listItemFont: {fontSize: 13, fontFamily: 'Poppins-Medium'},
  itemDetailsFont: {fontFamily: 'Poppins-Regular', fontSize: 12},
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
