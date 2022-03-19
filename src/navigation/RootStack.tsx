import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FILE_NAMES} from '../static/Constants';
import AppStack from './AppStack';
import SplashStack from './SplashStack';
import {navigationRef} from './RootNavigation';
import BottomNavigationStack from './BottomNavigatorStack';

interface RootStackProps {}

const RootStack = (props: RootStackProps) => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={FILE_NAMES.SPLASH_STACK}>
        <Stack.Screen component={SplashStack} name={FILE_NAMES.SPLASH_STACK} />

        <Stack.Screen
          component={BottomNavigationStack}
          name={FILE_NAMES.BOTTOM_TAB}
          options={{title: 'AppStackStg'}}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootStack;
