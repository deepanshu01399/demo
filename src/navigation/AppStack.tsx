import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LineCharts from '../screens/charts/LineCharts';
import Comments from '../screens/Comments';
import FlatlistScreen from '../screens/Flatlist1';
import FlatlistScreen2 from '../screens/Flatlist2';
import PersonDetails from '../screens/PersonDetails';
import PostList from '../screens/PostList';
import ProfileScreen from '../screens/ProfileScreen';
import { FILE_NAMES } from '../static/Constants';
import DrawerNavigationStack from './DrawerNavigatorStack';

const AppStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
   // screenOptions={{headerShown:false}}
    >
      
      <Stack.Screen component={DrawerNavigationStack} name={FILE_NAMES.DRAWER_TAB}  options={{headerShown:false}} />
      <Stack.Screen component={PersonDetails} name={FILE_NAMES.PERSONDETAIL_SCREEN} options={{headerShown:false}} />
      <Stack.Screen component={Comments} name={FILE_NAMES.COMMENTLIST_SCREEN} options={{headerShown:false}}/>
      <Stack.Screen component={LineCharts} name={FILE_NAMES.LINECHART_SCREEN}options={{headerShown:false}} />
      <Stack.Screen component={ProfileScreen} name={FILE_NAMES.PROFILE_SCREEN}options={{headerShown:false}} />
      <Stack.Screen component={FlatlistScreen2} name={FILE_NAMES.FLAT_SCREEN2} options={{headerShown:false}}/>
      <Stack.Screen component={FlatlistScreen} name={FILE_NAMES.FLAT_SCREEN} options={{headerShown:false}}/>
      <Stack.Screen component={PostList} name={FILE_NAMES.POSTLIST_SCREEN} options={{headerShown:false}}   />

    </Stack.Navigator>
  );
};
export default AppStack;
