import { StackActions } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {DataInterface, personList} from '../models/personsList';
import * as actions from '../redux/actionCreatorsTs';
import { FILE_NAMES } from '../static/Constants';
import MainView from './MainView';
import * as RootNavigation from "../navigation/RootNavigation"
import CommonHeader from './CommonHeader';

const DashBoardScreen = (props: any) => {
  console.log('props==>', props);
  const isLoading = props.isLoading;
  const personLists = props.personLists.data ?? [];

  function getPersonDetail(id: Number | undefined) {
    props._showProgressBar();
    props._getPerSonDetail(id);
  }

  const seeUsersPost=(id:Number|undefined,no:Number)=>{
  props._showProgressBar();
  props._getUserPosts(id,no);
  //RootNavigation.push(FILE_NAMES.POSTLIST_SCREEN,{callFor:"UserPost"})
   props.navigation.dispatch(StackActions.push(FILE_NAMES.POSTLIST_SCREEN, {callFor:"UserPost"}))
  //props.navigation.navigate(FILE_NAMES.APP_STACK,{screen: FILE_NAMES.POSTLIST_SCREEN,params:{callFor:"UserPost"}});

  //props.navigation.dispatch(StackActions.push(FILE_NAMES.APP_STACK,{screen: FILE_NAMES.POSTLIST_SCREEN,params:{callFor:"UserPost"}}));

  }
  const renderItems = (item: DataInterface, index: number) => {
    return (
      <TouchableOpacity onPress={() => getPersonDetail(item.id)}>
        <View style={styles.constainerStyle}>
          <Image style={styles.imageViewStyle} 
        
          source={{uri: item?.picture??''}} />
          <Text
            style={{
              backgroundColor: 'white',
              textAlign: 'center',
              marginLeft: 10,
            }}>
            {item.title}. {item.firstName} {item.lastName}
          </Text>
          <TouchableOpacity onPress={()=>seeUsersPost(item.id,10)}>
          <Text
            style={{
              textAlign: 'center',
              marginLeft: 10,
              color:"blue"
            }}>           
          See Posts
          </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    props._showProgressBar();
    props._getUserLists();
  }, []);

  const onPressLeftButton = () => {
    console.log("---",props.navigation)
  props.navigation.openDrawer();
  };
 

  return (
    <MainView>
        <CommonHeader
        title={'People'}
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
      <FlatList
        keyExtractor={(item, index: any) => index}
        renderItem={({item, index}) => renderItems(item, index)}
        data={personLists}
        ListEmptyComponent={<Text>Data Loading...</Text>}
      />
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
    personLists: state.commonReducer.personLists,
    
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    _getUserLists: () => dispatch(actions.getPersonsList()),
    _getUserPosts: (id:Number,number:Number) => dispatch(actions.getUserList(id,number)),
    _showProgressBar: () => dispatch(actions.showProgressBar()),
    _hideProgressBar: () => dispatch(actions.hideProgressBar()),
    _getPerSonDetail: (id: Number) => dispatch(actions.getPersonDetail(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DashBoardScreen);

const styles = StyleSheet.create({
  constainerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginVertical: 3,
    marginHorizontal: 7,
    borderRadius: 10,
  },
  imageViewStyle: {
    marginLeft: 10,
    height: 90,
    width: 90,
    resizeMode: 'contain',
    margin: 5,
    borderRadius: 2,
  },
});
