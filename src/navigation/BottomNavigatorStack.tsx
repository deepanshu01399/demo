
import React, { useState } from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashBoardTSX from '../screens/DashBoardTSX';
import PostList from '../screens/PostList';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FILE_NAMES } from '../static/Constants';
import AppStack from './AppStack';

const BottomNavigationStack=()=>{
  const Tab = createBottomTabNavigator();

   return (
      <Tab.Navigator
       screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === FILE_NAMES.APP_STACK) {
            iconName = focused
              ? 'home'
              : 'home';
          } else if (route.name === FILE_NAMES.DASHBOARD_SCREEN) {
            iconName = focused ? 'user' : 'user';
          }
          // You can return any component that you like here!
          return <Icon name={iconName} size={25} color={color}></Icon>
        },
        tabBarActiveTintColor: 'cyan',
        tabBarInactiveTintColor: 'gray',})}
      >
      <Tab.Screen name={FILE_NAMES.APP_STACK} component={AppStack} options={{headerShown:false}} />
      <Tab.Screen name={FILE_NAMES.DASHBOARD_SCREEN} component={DashBoardTSX} />

    </Tab.Navigator>
  )
}
export default BottomNavigationStack;