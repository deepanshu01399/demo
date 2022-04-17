import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {FILE_NAMES} from '../static/Constants';
import SplashStack from './SplashStack';
import {navigationRef} from './RootNavigation';
import {createStackNavigator} from '@react-navigation/stack';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

interface RootStackProps {}

const RootStack = (props: RootStackProps) => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={FILE_NAMES.SPLASH_STACK}>
        <Stack.Screen component={SplashStack} name={FILE_NAMES.SPLASH_STACK} />

        <Stack.Screen
          component={AppStack}
          name={FILE_NAMES.APP_STACK}
          options={{title: 'AppStackStg'}}
        />
        <Stack.Screen
          component={AuthStack}
          name={FILE_NAMES.AUTH_STACK}
          options={{title: 'AppStackStg'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootStack;
