import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Comments from '../screens/Comments';
import DashBoardTSX from '../screens/DashBoardTSX';
import PersonDetails from '../screens/PersonDetails';
import PostList from '../screens/PostList';
import ProfileScreen from '../screens/ProfileScreen';
import { FILE_NAMES } from '../static/Constants';

const PeopleStack = () => {//not any requirement .
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
    screenOptions={{headerShown:false}}
    >
      <Stack.Screen name={FILE_NAMES.PEOPLE_SCREEN} component={DashBoardTSX}/>
      <Stack.Screen component={PostList} name={FILE_NAMES.POSTLIST_SCREEN} />
      <Stack.Screen component={PersonDetails} name={FILE_NAMES.PERSONDETAIL_SCREEN} />
      <Stack.Screen component={Comments} name={FILE_NAMES.COMMENTLIST_SCREEN} />
      <Stack.Screen component={ProfileScreen} name={FILE_NAMES.PROFILE_SCREEN} />
    </Stack.Navigator>
  );
};
export default PeopleStack;
