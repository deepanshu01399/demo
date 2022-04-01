import React, { useEffect, useState } from 'react';
import {

  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,

} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../redux/actionCreatorsTs';
import MainView from './MainView';
import { RESETCOMMENT } from '../redux/actionTypes';

import { LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager, } from 'react-native-fbsdk';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import FieldGeneratorScreen from './FieldGeneratorScreen';
import commonFunctions from '../resources/commonFunctions';
import { COLORS } from '../resources/theme';
import { utils } from '@react-native-firebase/app';
import { commonStyling } from '../resources/styles';

const LoginScreen = (props: any) => {

  const [userInfo, setUserInfo] = useState<any>({})
  const [label1, setLabel1Value] = useState<string>('');
  const [label, setLabelValue] = useState<string>('');
  const [label5, setLabelValue5] = useState<string>('');
  const [label6, setLabelValue6] = useState<string>('');
  const [label7, setLabelValue7] = useState<string>('');
  const [label8, setLabelValue8] = useState<string>();
  const [label9, setLabelValue9] = useState<string>('');

  const [label2, setLabelValue2] = useState({});
  const [label3, setLabelValue3] = useState<string>('');
  const [label4, setLabelValue4] = useState<string>('');


  useEffect(() => {
    //props._showProgressBar();
    setTimeout(() => {
      // props.navigation.replace(FILE_NAMES.POSTLIST_SCREEN);
    }, 3000);
  }, []);


  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // [Android] what API you want to access on behalf of the user, default is email and profile
      webClientId: '86276697199-kcbcmgpdlb4hreqdmfb161mq3qij6haa.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
      openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
      profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });
  }, [])

  const datalist = [{ key: 1, label: "deep", section: false }, { key: 2, label: "bhanu", section: false }, { key: 3, label: "himanshu" }, { key: 4, label: "rinku" }]
  const signIn = async () => {

    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn();
      console.log("-------------------", userInfo)

      setUserInfo(userInfo);
    } catch (error: any) {
      console.log("Error:==>", error)

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        console.log("Error:=====>", error)
        // some other error happened
      }

    }
  }

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      //await GoogleSignin.signOut();
      setUserInfo(null); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  const revokeAccess = async () => {
    try {
      await GoogleSignin.revokeAccess();
      // Google Account disconnected from your app.
      // Perform clean-up actions, such as deleting data associated with the disconnected account.
    } catch (error) {
      console.error(error);
    }
  };

  function loginViaFb() {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(["public_profile"]).then(
      function (result: any) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          console.log(
            AccessToken.getCurrentAccessToken().then(
              (data: any) => {
                const accessToken = data.accessToken.toString();
                getInfoFromToken(accessToken);
              }
            ),
            "Login success with permissions: " + JSON.stringify(result), " ",
            result.grantedPermissions.toString()
          );
        }
      },
      function (error: any) {
        console.log("Login fail with error: " + error);
      }

    );
  }

  const getInfoFromToken = (token: string) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id, name,  first_name, last_name',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error: any, result: any) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          setUserInfo(result);
          console.log('result:', result);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };
  const dateForEighteenYearsAgo = () => {
    let dateForEighteenYearsAgo = new Date();
    dateForEighteenYearsAgo.setDate(dateForEighteenYearsAgo.getDate() - 6570)
    console.log(dateForEighteenYearsAgo)
    return dateForEighteenYearsAgo;
  }

  const setbutton8Values = (data: string) => {
    console.log("data--->", data)
  }

  return (
    <MainView>
      <ScrollView style={{ marginBottom: 20 }}>

        <View style={{ marginTop: 20, flexDirection: 'column', justifyContent: 'center' }}>

          <GoogleSigninButton
            style={{ ...styles.pickerWrapper, backgroundColor: COLORS.appDefaultColor, }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
          />

          <LoginButton
            style={{ ...styles.pickerWrapper, backgroundColor: COLORS.appDefaultColor, }}
            onLoginFinished={
              (error: any, result: any) => {
                if (error) {
                  console.log("login has error: " + result.error);
                } else if (result.isCancelled) {
                  console.log("login is cancelled.");
                } else {
                  AccessToken.getCurrentAccessToken().then(
                    (data: any) => {
                      const accessToken = data.accessToken.toString();
                      getInfoFromToken(accessToken);
                    }
                  )
                }
              }
            }
            onLogoutFinished={() => console.log("logout")} />

          <FieldGeneratorScreen
            lable={"login via fb"}
            value={label7}
            callBack={() => loginViaFb()}
            type={"Pressable"}
            isDisabled={false}
            inputType={"Pressable"}
            iconAlignment={"justRight"}
            backgroundColor={COLORS.appDefaultColor}
            textColor={COLORS.white}
            needtoShowIcon={false}

          />

          {userInfo.name && (
            <Text style={{ fontSize: 16, marginVertical: 16 }}>
              Logged in As {userInfo.name}
            </Text>
          )}

        </View>

        <View style={{ flexDirection: 'column' }}>

          <FieldGeneratorScreen
            lable={"Alphabets"}
            placeholder='abc'
            value={label}
            callBack={(data: any) => setLabelValue(data)}
            type={"TEXT_INPUT"}
            isDisabled={false}
            inputType={"ALPHABETS"}
            isRequired={false}

          />

          <FieldGeneratorScreen
            lable={"NumberDash"}
            placeholder='abc'
            value={label1}
            callBack={(data: any) => setLabel1Value(data)}
            type={"TEXT_INPUT"}
            isDisabled={false}
            inputType={"NUMBER"}
            isRequired={true}
            validationType={"DASH"}
            maxLength={11}

          />

          <FieldGeneratorScreen
            lable={"ONLYNUMBER"}
            placeholder='abc'
            value={label2}
            callBack={(data: any) => setLabelValue2(data)}
            type={"TEXT_INPUT"}
            isDisabled={false}
            inputType={"ONLYNUMBER"}
            isRequired={false}

          />
          <FieldGeneratorScreen
            lable={"ALPHANUMBER"}
            placeholder='abc'
            value={label5}
            callBack={(data: any) => setLabelValue3(data)}
            type={"TEXT_INPUT"}
            isDisabled={false}
            inputType={"ALPHANUMBERIC"}
            isRequired={false}
          />

          <FieldGeneratorScreen
            lable={"Only Number DASH"}
            placeholder='abc'
            value={label4}
            callBack={(data: any) => setLabelValue4(data)}
            type={"TEXT_INPUT"}
            isDisabled={false}
            inputType={"ONLYNUMBER"}
            isRequired={false}
            validationType={"DASH"}

          />

          <FieldGeneratorScreen
            lable={"Calander"}
            placeholder='calander'
            date={label8}
            callBack={(data: string) => setLabelValue8(data)}
            type={"Date_picker"}
            isDisabled={false}
            isRequired={false}
            maxDate={new Date()}
          //minDate={new Date()}

          />

          <FieldGeneratorScreen
            lable={"Calander"}
            placeholder='calander'
            date={label9}
            callBack={(data: string) => setLabelValue9(data)}
            type={"Date_picker"}
            isDisabled={false}
            isRequired={false}
            maxDate={dateForEighteenYearsAgo()}

          />

          <FieldGeneratorScreen
            lable={"picker"}
            value={label5}
            callBack={(data: any) => setLabelValue5(data)}
            isDisabled={false}
            isRequired={false}
            data={datalist}
            placeholder='select any one option'
            type={"picker"}
            children={
              <TouchableOpacity
                style={{}}
                onPress={() => { }}
              >
                <TextInput
                  style={{ height: 40, color: 'grey' }}
                  editable={false}

                  placeholder="Please Select"
                  value={label5}
                />
              </TouchableOpacity>

            } />

          <FieldGeneratorScreen
            lable={"Button6"}
            value={label6}
            callBack={(data: any) => setLabelValue6(data)}
            type={"PressableBtn"}
            isDisabled={true}
            iconAlignment={"alignEnd"}
            needtoShowIcon={true}
          />
          <FieldGeneratorScreen
            lable={"Button7"}
            callBack={(data: any) => setLabelValue7(data)}
            type={"PressableBtn"}
            isDisabled={false}
            iconAlignment={"justRight"}
            backgroundColor={COLORS.white}
            textColor={COLORS.appDefaultColor}
            needtoShowIcon={true}

          />

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
    _getPostList: (data: Number) => dispatch(actions.getPostList(data)),
    _showProgressBar: () => dispatch(actions.showProgressBar()),
    _getPerSonDetail: (id: Number) => dispatch(actions.getPersonDetail(id)),
    _resetComment: () => dispatch({ type: RESETCOMMENT }),
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
    paddingHorizontal: commonStyling._textLeftSpacing
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
