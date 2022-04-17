
import React, { useEffect, useState } from 'react'
import { FILE_NAMES, STORAGE_KEY } from '../static/Constants';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Alert, Image, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoginScreen from '../screens/LoginScreen';
import PostList from '../screens/PostList';
import Flatlist1 from '../screens/Flatlist1';
import Flatlist2 from '../screens/Flatlist2';
import BottomNavigationStack from './BottomNavigatorStack';
import DrawerContent from '../screens/DrawerContent';
import Comments from '../screens/Comments';
import LineCharts from '../screens/charts/LineCharts';
import ProfileScreen from '../screens/ProfileScreen';
import PersonDetails from '../screens/PersonDetails';
import LocalStorage from '../static/LocalStorage';


const DrawerNavigationStack = (navigation:any) => {
  const [username,setUserName] = useState('');

  useEffect(()=>{
    fetchLocalStorageData()
    
  },[])

  const fetchLocalStorageData= async()=>{
    let userName= await LocalStorage.getFromLocal(STORAGE_KEY.USER_NAME);
    setUserName(userName);

  }

  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      screenOptions={{ swipeEnabled: false ,
        headerStyle: {
          backgroundColor: 'lightblue',
          height: 50,
        },
        // headerLeft: () => (
        //   <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{}}>
        //     <Icon name="bars" size={20} color="black" />
        //   </TouchableOpacity>
        // ),
      }}
      drawerContent={props => <DrawerContent{...props} />}
      
    >
      <Drawer.Screen component={BottomNavigationStack} name={FILE_NAMES.BOTTOM_TAB} 
       options={{
        title: 'Deep',
        headerTitle: () =>
        (
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            {/* <Image source={require('../assets/checked.png')} /> */}
            <Icon name={'home'} size={20} color={'cyan'}></Icon>
            <Text style={{ fontFamily: '', fontSize: 17, fontWeight: "bold" }}>Hye {username}</Text>
          </View>),
        headerRight: () => (
          <TouchableOpacity onPress={() => Alert.alert("hello user")}>
            <View style={{ flexDirection: 'row', alignItems: "center", marginRight: 10 }}>
              <Icon name={'info'} size={13} color={'black'}></Icon>
            </View>
          </TouchableOpacity>),

      }} />
      {/* inside the drawer dikhani hai agar ui to yaha r dale screens vanra bhar} */}
      <Drawer.Screen component={PersonDetails} name={FILE_NAMES.PERSONDETAIL_SCREEN} options={{headerShown:true}} />
      <Drawer.Screen component={Comments} name={FILE_NAMES.COMMENTLIST_SCREEN} options={{headerShown:true}}/>
      <Drawer.Screen component={LineCharts} name={FILE_NAMES.LINECHART_SCREEN}options={{headerShown:true}} />
      <Drawer.Screen component={ProfileScreen} name={FILE_NAMES.PROFILE_SCREEN}options={{headerShown:true}} />
      <Drawer.Screen component={Flatlist1} name={FILE_NAMES.FLAT_SCREEN2} options={{headerShown:true}}/>
      <Drawer.Screen component={Flatlist2} name={FILE_NAMES.FLAT_SCREEN} options={{headerShown:true}}/>
      <Drawer.Screen component={PostList} name={FILE_NAMES.POSTLIST_SCREEN} options={{headerShown:true}}   />


    </Drawer.Navigator>
  )
}
export default DrawerNavigationStack;