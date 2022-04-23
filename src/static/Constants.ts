export const CLINET_VERSION = 'clientVersion';
export const HEADER_LANGUAGAE = 'headerLanguage';
export const BASE_URL = 'https://dummyapi.io/data/v1/';

export const FILE_NAMES = {
  ROOT_STACK: 'RootStack',
  SPLASH_STACK: 'SplashStack',
  APP_STACK: 'AppStack',
  AUTH_STACK: 'AuthStack',
  DRAWER_TAB: 'Drawertab',
  DASHBOARD_STACK: 'Home',
  BOTTOM_TAB: 'Bottomtab',
  PEOPLE_STACK: 'Peoplestack',
  SPLASH_SCREEN: 'SplashScreen',
  IAP_SCREEN: 'IAPScreen',
  POSTLIST_SCREEN: 'Posts',
  PEOPLE_SCREEN: 'People',
  PERSONDETAIL_SCREEN: 'Profile Details',
  COMMENTLIST_SCREEN: 'CommentList',
  LOGIN_SCREEN: 'LoginScreen',
  FLAT_SCREEN: 'FlatScreen',
  FLAT_SCREEN2: 'FlatScreen2',
  PROFILE_SCREEN: 'ProfileScreen',
  LINECHART_SCREEN: 'LineCharts',
  FIELD_GENERATE_SCREEN: 'FieldScreen',
};
export const STORAGE_KEY = {
  USER_NAME: 'userName',
  USER_PASSWORD: 'userPassword',
  IS_FIRST_TIME_APP_LAUNCHES: 'is_first_time_app_launches',
  IS_LOGGED_IN: 'is_logged_in',
};

export const API_ENDPOINTS = {
  USER_WITH_PAGINATION_LIMIt: 'user?limit=20',
  GET_USER_DETAIL: 'user/',
  GET_POST_LIST: 'post?limit=',
};

export default {
  CLINET_VERSION,
  HEADER_LANGUAGAE,
  FILE_NAMES,
  STORAGE_KEY,
  API_ENDPOINTS,
};
