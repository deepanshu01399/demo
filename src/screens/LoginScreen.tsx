import React, {useEffect} from 'react';
import {
  
  StyleSheet,
  Text,
  
} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../redux/actionCreatorsTs';
import MainView from './MainView';
import {RESETCOMMENT} from '../redux/actionTypes';




const LoginScreen = (props: any) => {
  
  useEffect(() => {
    //props._showProgressBar();
    setTimeout(() => {
     // props.navigation.replace(FILE_NAMES.POSTLIST_SCREEN);
    }, 3000);
  }, []);


  return (
    <MainView>
      <Text> login with facebook</Text>
      
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
    _getPostList: (data:Number) => dispatch(actions.getPostList(data)),
    _showProgressBar: () => dispatch(actions.showProgressBar()),
    _getPerSonDetail: (id: Number) => dispatch(actions.getPersonDetail(id)),
    _resetComment: () => dispatch({type: RESETCOMMENT}),
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
