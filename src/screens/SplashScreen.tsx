import AnimatedLottieView from 'lottie-react-native';
import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../redux/actionCreatorsTs';
import {FILE_NAMES, STORAGE_KEY} from '../static/Constants';
import LocalStorage from '../static/LocalStorage';
import MainView from './MainView';

const SplashScreen = (props: any) => {
  const isLoading = props.isLoading;
  const postList = props.postList.data ?? [];

  useEffect(() => {
    props._getPostList(10);
    setTimeout(() => {
      navigateTonextScreen();
    }, 1500);
  }, []);

  const navigateTonextScreen = async () => {
    console.log('navigate..')
    let isloggedIn = await LocalStorage.getFromLocal(STORAGE_KEY.IS_LOGGED_IN);
    if (isloggedIn) {
      props.navigation.replace(FILE_NAMES.APP_STACK);
    } else
     props.navigation.replace(FILE_NAMES.AUTH_STACK);
  };

  return (
    <MainView>
      <View style={{backgroundColor: '', flex: 1}}>
       <AnimatedLottieView
        source={require('../animations/astronot.json')}
        autoPlay={true}
        loop={true}
        // onAnimationFinish = {()=>{
        //   navigateTonextScreen()
        // }}
        // colorFilters={[
        //   {
        //     keypath: 'button',
        //     color: 'red',
        //   },
        //   {
        //     keypath: 'Sending Loader',
        //     color: 'black',
        //   },
        // ]}
      /> 
     
      </View>
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
    postList: state.commonReducer.postList,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    _getPostList: (data: Number) => dispatch(actions.getPostList(data)),
    _showProgressBar: () => dispatch(actions.showProgressBar()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);

const styles = StyleSheet.create({
  constainerStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'red',
    marginVertical: 3,
    borderRadius: 10,
  },
  profileHeadertext: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
