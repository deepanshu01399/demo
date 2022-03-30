import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Comments from '../screens/Comments';
import DashBoard from '../screens/DashBoardTSX';
import FieldGeneratorScreen from '../screens/FieldGeneratorScreen';
import LoginScreen from '../screens/LoginScreen';
import PersonDetails from '../screens/PersonDetails';
import PostList from '../screens/PostList';
import {FILE_NAMES} from '../static/Constants';

const AppStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
    //screenOptions={{headerShown:false}}
    >
      
      <Stack.Screen component={LoginScreen} name={FILE_NAMES.LOGIN_SCREEN} />
      {/* <Stack.Screen component={FieldGeneratorScreen} name={FILE_NAMES.FIELD_GENERATE_SCREEN} /> */}
      <Stack.Screen component={PostList} name={FILE_NAMES.POSTLIST_SCREEN} />
      <Stack.Screen component={PersonDetails} name={FILE_NAMES.PERSONDETAIL_SCREEN}/>
      <Stack.Screen component={Comments} name={FILE_NAMES.COMMENTLIST_SCREEN}/>
    </Stack.Navigator>
  );
};
export default AppStack;
