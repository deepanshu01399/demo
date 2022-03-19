import React, {useEffect, useState} from 'react';
import {Alert, Text} from 'react-native';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {personList} from '../models/personsList';
import {getPersonsList1} from '../networkApi/UrlManager';
import * as actions from '../redux/actionCreatorsTs';

const DashBoardScreen = (props) => {
  console.log('props==>', props);
  const isLoading = props.isLoading;

  useEffect(() => {
    props._showProgressBar();
      props._getUserLists()
      
  }, []);

  return <Text>Dashboard</Text>;
};



const mapStateToProps = (state) => {
  state = {...state.commonRedcuer}; //...state.otherreducer}
  return {
    isLoading: state.isLoading,
    error: state.error,
    personLists:state.personLists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    _getUserLists:()=>dispatch(actions.getPersonsList()),
    _showProgressBar: () => dispatch(actions.showProgressBar()),
    _hideProgressBar: () => dispatch(actions.hideProgressBar()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DashBoardScreen);
