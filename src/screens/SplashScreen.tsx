import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../redux/actionCreatorsTs';
import {FILE_NAMES} from '../static/Constants';
import MainView from './MainView';

const SplashScreen = (props: any) => {
  const isLoading = props.isLoading;
  const postList = props.postList.data ?? [];

  useEffect(() => {
    //props._showProgressBar();
    props._getPostList(10);
    setTimeout(() => {
      props.navigation.replace(FILE_NAMES.BOTTOM_TAB);
    }, 1500);
  }, []);

  return (
    <MainView>
      <View style={{backgroundColor: 'red', flex: 1}}>
        <Text>splash screen</Text>
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
    _getPostList: (data:Number) => dispatch(actions.getPostList(data)),
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
