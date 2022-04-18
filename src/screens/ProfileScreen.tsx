import React, { useEffect, useState } from 'react';
import {

  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  View,

} from 'react-native';
import { connect } from 'react-redux';
import CommonUIComponent from '../commonComponent/CommonUIComponent';
import * as actions from '../redux/actionCreatorsTs';
import { COLORS } from '../resources/theme';
import FieldGeneratorScreen from './FieldGeneratorScreen';
import MainView from './MainView';
import { launchCamera, launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
import CommonHeader from './CommonHeader';




const ProfileScreen = (props: any) => {
  const [fileData, setFileData] = useState<ImagePickerResponse | null | undefined>();

  useEffect(() => {

  }, [])

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        openCameraWithPermission()
        // console.log("Camera permission given");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };


  const openCameraWithPermission = () => {
    try {
      launchCamera({
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 550,
        maxWidth: 300,
      }, (response) => {
        if (response.didCancel) {
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          Alert.alert("Camera not avl on device");
          return;
        } else if (response.errorCode == 'permission') {
          Alert.alert('Permission required')
          return;
        } else if (response.errorCode == 'others') {
          Alert.alert(response.errorMessage ?? "Something went wrong...")
          return;
        }
        setFileData(response)
        console.log('response:==>', response, fileData?.assets?.uri)
      })

    } catch (error) {
      Alert.alert('Error', error + "")
    }

  }
  const chooseFile = (type: string | any) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        Alert.alert("user canceled Image Picker")
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        Alert.alert('Camera not avl on device')
        return;
      } else if (response.errorCode == 'permission') {
        Alert.alert('permissions required...')
        return;
      } else if (response.errorCode == 'others') {
        Alert.alert('Something went wrong...')
        return;
      } setFileData(response)
    })

  }
  const removeFile = () => {
    setFileData({})
  }

  const uploadImage = () => {
    Alert.alert('upload Photo', '', [
      { text: 'take photo', onPress: () => { requestCameraPermission() } },
      { text: "Choose From Gallery", onPress: () => chooseFile('photo') },
      { text: "Remove Photo", onPress: () => removeFile() },
      { text: "Choose From Gallery", onPress: () => console.log("canceled the task") }

    ])

  }
  const serverHitForUploadImage = () => {
    //isloading(true);
    let uri = Platform.OS == 'ios' ? fileData?.assets?.uri?.replace('file://', '') :
      fileData?.assets?.uri;

    let photo = {
  
      uri: uri, type:fileData?.assets?.type ?? 'image/jpeg',
      name: fileData?.assets?.fileName ?? 'profile_image',
    };

    let req = new FormData();
    req.append('request[profile_image',photo)
    // let urlManager = new Urlmanager();
    // urlManager.profileUPloadhit(req).then(res=>res.json() as Promoise<profileResponse>).then(res=>validateres(res)).catch(err=>{console.log(error)}).finally(()=>{
    //   isloading(false);
    // })

  }
  const onPressLeftButton = () => {
    console.log("---",props.navigation)
  props.navigation.openDrawer();
  };

  return (
    <MainView>
        <CommonHeader
        title={'Posts'}
        isBackButton={true}
        leftButtonType={'hamburger'}
        onPressLeftButton={() => onPressLeftButton()}
        navigation={props?.navigation}
        isRightButton={true}
        rightButtonType={'search'}
        onPressRightButton={() => {
          Alert.alert('clicked on Notification!');
        }}
      />
      <ScrollView style={{ marginBottom: 20, marginHorizontal: 8 }}>
        <CommonUIComponent
          type="headerText"
          label="Hello ProfileScreen"
          textColor="red"
        />
        <Image

          source={{
            uri: fileData?.assets?.uri ?? ''
          }}

          style={{ width: 100, height: 100, alignItems: "center", flex: 1, }}

        />

        <View style={{ flex: 1, marginTop: 20, flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>

          <FieldGeneratorScreen
            lable={"update Profile Pic"}
            callBack={() => uploadImage()}
            type={"PressableBtn"}
            isDisabled={false}
            iconAlignment={"alignEnd"}
            needtoShowIcon={false}
            backgroundColor={COLORS.appDefaultColor}
            textColor={COLORS.white}
          />
        </View>

      </ScrollView>
    </MainView>
  );
};

interface stateProps {
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


export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
  constainerStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    marginVertical: 3,
    borderRadius: 10,
  },
  headerStyle: { flex: 1, color: 'black', fontWeight: '700', fontSize: 20, alignSelf: "center", marginVertical: 15 }

});
