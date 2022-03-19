import React from 'react';
import {StyleSheet, View} from 'react-native';
import BottomNavigation from 'react-native-material-bottom-navigation';
import {connect} from 'react-redux';
import * as actions from '../redux/actionCreatorsTs';
import AppActivityIndicator from './AppActivityIndicator';

const MainViewScreen = (props: any) => {
  const isLoading = props.isLoading;

  return (
    <View style={{...styles.constainerStyle, ...props.style}}>
      {props.children}
      {isLoading ? <AppActivityIndicator></AppActivityIndicator> : null}
    </View>

  );
};

interface stateProps {
  commonReducer: any;
  isLoading: boolean;
}

const mapStateToProps = (state: stateProps) => {
  return {
    isLoading: state.commonReducer.isLoading,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    _showProgressBar: () => dispatch(actions.showProgressBar()),
    _hideProgressBar: () => dispatch(actions.hideProgressBar()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainViewScreen);

const styles = StyleSheet.create({
  constainerStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#D5FAFA',
    //marginVertical: 2,
    //paddingHorizontal:8,
   // marginHorizontal:5,
  },
});
