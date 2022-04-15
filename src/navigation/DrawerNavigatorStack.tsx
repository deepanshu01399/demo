
import React from 'react'
import { FILE_NAMES } from '../static/Constants';
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';
import { Alert, Image, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DashBoardStack from './DashBoardStack';
import LoginScreen from '../screens/LoginScreen';
import PostList from '../screens/PostList';
import Flatlist1 from '../screens/Flatlist1';
import Flatlist2 from '../screens/Flatlist2';


const DrawerNavigationStack = () => {

  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      screenOptions={{ swipeEnabled: false }}
      drawerContent={props => <DrawerContent{...props} />}
    >
      <Drawer.Screen component={DashBoardStack} name={FILE_NAMES.DASHBOARD_STACK}
        options={{
          title: 'Deep',
          headerTitle: () =>
          (
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              {/* <Image source={require('../assets/checked.png')} /> */}
              <Icon name={'home'} size={20} color={'cyan'}></Icon>
              <Text style={{ fontFamily: '', fontSize: 17, fontWeight: "bold" }}>Hey User</Text>
            </View>),
          headerRight: () => (
            <TouchableOpacity onPress={() => Alert.alert("hello user")}>
              <View style={{ flexDirection: 'row', alignItems: "center", marginRight: 10 }}>
                <Icon name={'info'} size={13} color={'black'}></Icon>
              </View>
            </TouchableOpacity>),

        }} />
      <Drawer.Screen component={Flatlist2} name={FILE_NAMES.FLAT_SCREEN2} options={{headerShown:true}}/>
      <Drawer.Screen component={Flatlist1} name={FILE_NAMES.FLAT_SCREEN} options={{headerShown:true}}/>
      <Drawer.Screen component={LoginScreen} name={FILE_NAMES.LOGIN_SCREEN} options={{headerShown:true}} />
      <Drawer.Screen component={PostList} name={FILE_NAMES.POSTLIST_SCREEN} options={{headerShown:true}}   />


    </Drawer.Navigator>
  )
}
export default DrawerNavigationStack;