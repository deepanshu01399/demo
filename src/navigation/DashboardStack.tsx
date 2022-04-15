import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { FILE_NAMES } from '../static/Constants';
import BottomNavigationStack from './BottomNavigatorStack';

const DashBoard = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
    screenOptions={{headerShown:false}}
    >
      
      <Stack.Screen component={BottomNavigationStack} name={FILE_NAMES.BOTTOM_TAB} />
     
    </Stack.Navigator>
  );
};
export default DashBoard;
