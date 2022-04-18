import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../redux/actionCreatorsTs';
import MainView from './MainView';
import FieldGeneratorScreen from './FieldGeneratorScreen';
import {COLORS} from '../resources/theme';
import {commonStyling} from '../resources/styles';
import {FILE_NAMES, STORAGE_KEY} from '../static/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocalStorage from '../static/LocalStorage';

const LoginScreen = (props: any) => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const submitLoginDetails = async () => {
    if (validation()) {
      LocalStorage.storeToLocal(STORAGE_KEY.USER_NAME, userName);
      AsyncStorage.setItem(STORAGE_KEY.USER_PASSWORD, password);
      await LocalStorage.storeToLocal(
        STORAGE_KEY.IS_FIRST_TIME_APP_LAUNCHES,
        true,
      ).then(res => console.log('isfirstitmelogin---', res));
      await LocalStorage.storeToLocal(STORAGE_KEY.IS_LOGGED_IN, true);

      props.navigation.replace(FILE_NAMES.APP_STACK);
    }
  };
  const validation = () => {
    let isValid = true;
    if (userName == '' && userName == undefined) {
      Alert.alert('UserName required');
      isValid = false;
    } else if (password == '' && password == undefined) {
      Alert.alert('Password required');
      isValid = false;
    } else if (userName !== 'qwerty' && password !== '1234') {
      Alert.alert('Invalid creads...');
      isValid = false;
    }

    return isValid;
  };

  return (
    <MainView>
      <ScrollView style={{marginBottom: 20}}>
        <View style={{flexDirection: 'column'}}>
          <FieldGeneratorScreen
            lable={'UserName'}
            placeholder="UserName"
            value={userName}
            callBack={(data: any) => setUserName(data)}
            type={'TEXT_INPUT'}
            isDisabled={false}
            inputType={'ALPHABETS'}
            isRequired={false}
          />

          <FieldGeneratorScreen
            lable={'Password'}
            placeholder="Password"
            value={password}
            callBack={(data: any) => setPassword(data)}
            type={'TEXT_INPUT'}
            isDisabled={false}
            inputType={'password'}
            isRequired={true}
            maxLength={20}
          />

          <View style={{marginTop: 20}}>
            <FieldGeneratorScreen
              lable={'Submit'}
              callBack={() => submitLoginDetails()}
              type={'PressableBtn'}
              isDisabled={false}
              iconAlignment={'justRight'}
              backgroundColor={'cyan'}
              textColor={COLORS.white}
              needtoShowIcon={false}
            />
          </View>
        </View>
      </ScrollView>
    </MainView>
  );
};

interface stateProps {
  //[x: string]: any;
  commonReducer: any;
  isLoading: boolean;
  error: string;
}

const mapStateToProps = (state: stateProps) => {
  return {
    isLoading: state.commonReducer.isLoading,
    error: state.commonReducer.error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    _showProgressBar: () => dispatch(actions.showProgressBar()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  constainerStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    marginVertical: 3,
    borderRadius: 10,
  },
  profileHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  pickerWrapper: {
    flex: 1,
    marginTop: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.lightGrayColor,
    minHeight: commonStyling._fieldHeight,
    justifyContent: 'center',
    marginHorizontal: commonStyling._sideScreenSpacing,
    paddingHorizontal: commonStyling._textLeftSpacing,
  },
  commentItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
    //backgroundColor: 'red',
    marginHorizontal: 10,
  },
  commentView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
    //backgroundColor: 'red',
    marginHorizontal: 10,
  },
  profileHeadertext: {
    //backgroundColor: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  profileTagtext: {
    //backgroundColor: 'white',
    fontSize: 13,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  postLikeText: {
    //backgroundColor: 'white',
    fontSize: 12,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  profileHeaderImage: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
    borderRadius: 15,
  },
  postImage: {
    height: 250,
    width: 384,
    borderRadius: 10,
  },
});
