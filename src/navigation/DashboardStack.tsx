import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LineCharts from '../screens/charts/LineCharts';
import Comments from '../screens/Comments';
import DashBoardTSX from '../screens/DashBoardTSX';
import FlatlistScreen from '../screens/Flatlist1';
import FlatlistScreen2 from '../screens/Flatlist2';
import LoginScreen from '../screens/LoginScreen';
import PersonDetails from '../screens/PersonDetails';
import PostList from '../screens/PostList';
import ProfileScreen from '../screens/ProfileScreen';
import { FILE_NAMES } from '../static/Constants';

const DashBoardStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
    screenOptions={{headerShown:false}}
    >
      <Stack.Screen name={FILE_NAMES.DASHBOARD_SCREEN} component={DashBoardTSX}/>
      <Stack.Screen component={PostList} name={FILE_NAMES.POSTLIST_SCREEN} />
      <Stack.Screen component={PersonDetails} name={FILE_NAMES.PERSONDETAIL_SCREEN} />
      <Stack.Screen component={Comments} name={FILE_NAMES.COMMENTLIST_SCREEN} />
      <Stack.Screen component={ProfileScreen} name={FILE_NAMES.PROFILE_SCREEN} />
    </Stack.Navigator>
  );
};
export default DashBoardStack;
