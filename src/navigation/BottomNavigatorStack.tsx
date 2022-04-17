
import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FILE_NAMES } from '../static/Constants';
import PostList from '../screens/PostList';
import DashBoardTSX from '../screens/DashBoardTSX';
import PeopleStack from './PeopleStack';

const BottomNavigationStack=()=>{
  const Tab = createBottomTabNavigator();

   return (
      <Tab.Navigator
       screenOptions={({ route }) => ({
         tabBarHideOnKeyboard:true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === FILE_NAMES.POSTLIST_SCREEN) {
            iconName = focused
              ? 'home'
              : 'home';
          } else if (route.name === FILE_NAMES.PEOPLE_SCREEN) {
            iconName = focused ? 'user' : 'user';
          }else if(route.name===FILE_NAMES.PEOPLE_STACK){
            iconName=focused?'folder':'fly';
          }
          // You can return any component that you like here!
          return <Icon name={iconName??''} size={30} color={color}></Icon>
        },
        tabBarActiveTintColor: 'cyan',
        tabBarInactiveTintColor: 'gray',})}
      >
      <Tab.Screen component={PostList} name={FILE_NAMES.POSTLIST_SCREEN} options={{headerShown:false}} />
      <Tab.Screen name={FILE_NAMES.PEOPLE_SCREEN} component={DashBoardTSX} options={{headerShown:false}}/>
      <Tab.Screen name={FILE_NAMES.PEOPLE_STACK} component={PeopleStack} options={{headerShown:false}}/>
      {/* to see the other post related info inside the tab bar then we need to use stack otherwise for single screen we can directly pass that.. */}
      
    </Tab.Navigator>
  )
}
export default BottomNavigationStack;