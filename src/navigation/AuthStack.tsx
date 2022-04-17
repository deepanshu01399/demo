import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import SplashScreen from '../screens/SplashScreen';
import {FILE_NAMES} from '../static/Constants';

const AuthStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={LoginScreen}
        name={FILE_NAMES.LOGIN_SCREEN}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default AuthStack;
