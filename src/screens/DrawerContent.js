import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  FlatList,
  Alert,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import CommonUIComponent from '../commonComponent/CommonUIComponent';
import * as actions from '../redux/actionCreatorsTs';
import { Assets } from '../resources/Assets';
import { COLORS } from '../resources/theme';
import { FILE_NAMES, STORAGE_KEY } from '../static/Constants';
import LocalStorage from '../static/LocalStorage';

const DrawerContent = props => {
  console.log('props:=======>', props);

  const [updateCheckedValue, setCheckedValue] = useState('');
  const [insideSetting, setInsideSetting] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => { }, []);

  const handleProfileNavigate = () => {
    console.log('handle profile navigate');
  };
  const settingOptions = [
    {
      key: 'updatePhoto',
      value: 'Update Photo',
      navigateTo: FILE_NAMES.PERSONDETAIL_SCREEN,
    },
    {
      key: 'updateName',
      value: 'Update Name',
      navigateTo: FILE_NAMES.PERSONDETAIL_SCREEN,
    },
    {
      key: 'updateEmail',
      value: 'Update Email',
      navigateTo: FILE_NAMES.PERSONDETAIL_SCREEN,
    },
  ];

  const dashboardItemlist = [
    {
      key: 'dashboard',
      value: 'Dashboard',
      option: [],
      navigateTo: FILE_NAMES.BOTTOM_TAB,
    },
    { key: 'login', value: 'Login', navigateTo: FILE_NAMES.LOGIN_SCREEN },
    {
      key: 'profile',
      value: 'Profile',
      option: [],
      navigateTo: FILE_NAMES.PERSONDETAIL_SCREEN,
    },
    { key: 'settings', value: 'Settings', option: settingOptions },
    { key: 'flatlist1', value: 'Flat List1', navigateTo: FILE_NAMES.FLAT_SCREEN },
    {
      key: 'flatlist2',
      value: 'Flat List2',
      navigateTo: FILE_NAMES.FLAT_SCREEN2,
    },
    {
      key: 'logout',
      value: 'Logout',
      option: [],
      navigateTo: FILE_NAMES.LOGIN_SCREEN,
    },
  ];

  useEffect(() => {
    fetchLocalStorageData();
  }, []);

  const fetchLocalStorageData = async () => {
    let userName = await LocalStorage.getFromLocal(STORAGE_KEY.USER_NAME);
    setUserName(userName);
  };

  const openLogoutAlert = () => {
    Alert.alert('Logout!', 'Are you sure you want to logout?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => serviceHitForLogout(),
      },
    ]);
  };

  const serviceHitForLogout = async () => {
    LocalStorage.removeFromLocal(STORAGE_KEY.USER_NAME);
    LocalStorage.emptyLocalStorage();
    let applaunchFirstTime = await LocalStorage.getFromLocal(
      STORAGE_KEY.IS_FIRST_TIME_APP_LAUNCHES,
    );
    console.log('isfirstitmelogin---', applaunchFirstTime);
    props?.navigation?.replace(FILE_NAMES.AUTH_STACK);
    await LocalStorage.storeToLocal(STORAGE_KEY.IS_LOGGED_IN, false);
  };

  const renderDrawerItem = item => {
    return (
      <TouchableOpacity
        style={{
          padding: 10,
          borderRadius: 10,
          borderBottomWidth: 2,
          backgroundColor:
            updateCheckedValue == 'settings'
              ? 'white'
              : item.key === updateCheckedValue
                ? 'cyan'
                : 'white',
        }}
        onPress={() => {
          setCheckedValue(item.key);
          setInsideSetting(false);
          if (item.key == 'logout') {
            openLogoutAlert();
          } else {
            item.navigateTo
              ? props.navigation.navigate(item?.navigateTo)
              : null;
          }
        }}>
        <CommonUIComponent
          type="normalText"
          label={`${item.value}`}
          fontSize={16}
          inbold={true}
        />

        {updateCheckedValue == 'settings' || insideSetting
          ? item?.option?.length > 0
            ? item.option.map(item => (
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  backgroundColor:
                    item.key === updateCheckedValue
                      ? 'cyan'
                      : 'white',
                }}
                onPress={() => {
                  setCheckedValue(item.key);
                  setInsideSetting(true);
                  item.navigateTo
                    ? props.navigation.navigate(item?.navigateTo)
                    : null;
                }}>
                <CommonUIComponent
                  type="normalText"
                  label={`${item.value}`}
                  fontSize={16}
                  inbold={true}
                />
              </TouchableOpacity>
            ))
            : null
          : null}
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
      }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => handleProfileNavigate()}>
        <View
          style={{
            flexDirection: 'column',
            minHeight: 200,
            backgroundColor: 'cyan',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 40, //DeviceInfo.hasNotch() ? 55 : 35,
          }}>
          <Image
            source={
              Assets.people
              //</View>  ? {uri: `data:image/gif;base64,${imagePath}`}
              //  : Assets.avatar
            }
            style={{ alignSelf: 'center', height: 80, width: 80, marginBottom: 10 }}></Image>
          <Text style={{}}>{userName + ' ' + 'lastName'}</Text>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 15,
              alignSelf: 'center',
            }}>
            {'deepanshu@gmail.com'}
          </Text>
        </View>
      </TouchableOpacity>

      <FlatList
        style={{ padding: 1 }}
        data={dashboardItemlist}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderDrawerItem(item)}
      />

      <View style={{ alignItems: 'center', marginBottom: 12 }}>
        <Text>version 1.0.1</Text>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  state = { ...state.commonRedcuer }; //...state.otherreducer}
  return {
    isLoading: state.isLoading,
    error: state.error,
    personLists: state.personLists,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    _getUserLists: () => dispatch(actions.getPersonsList()),
    _showProgressBar: () => dispatch(actions.showProgressBar()),
    _hideProgressBar: () => dispatch(actions.hideProgressBar()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
