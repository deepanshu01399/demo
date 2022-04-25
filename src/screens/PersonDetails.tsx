import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../redux/actionCreatorsTs';
import { getFormattedDate } from '../resources/commonFunctions';
import { FILE_NAMES } from '../static/Constants';
import MainView from './MainView';
import * as RootNavigation from "../navigation/RootNavigation"
import { StackActions } from '@react-navigation/native';
import CommonHeader from './CommonHeader';
import { Assets } from '../resources/Assets';


const PersonDetails = (props: any) => {
  console.log('PersonDetailsProps: ==>', props);
  const personDetails = props.personDetails ?? {};

  const seeUsersPost = (id: Number | undefined, no: Number) => {
    props._showProgressBar();
    props._getUserPosts(id, no);
    RootNavigation.push(FILE_NAMES.POSTLIST_SCREEN,{callFor:"UserPost"})
    //props.navigation.dispatch(StackActions.push(FILE_NAMES.POSTLIST_SCREEN, {callFor:"UserPost"}))
    //props.navigation.navigate(FILE_NAMES.APP_STACK, { screen: FILE_NAMES.POSTLIST_SCREEN, params: { callFor: "UserPost" } });
    //  props.navigation.dispatch(StackActions.push(FILE_NAMES.APP_STACK,{screen: FILE_NAMES.POSTLIST_SCREEN,params:{callFor:"UserPost"}}));//ye nahi chala

  }
  const onPressLeftButton = () => {
    console.log("---",props.navigation)
    props?.navigation.goBack()
  };

  function isEmpty(obj:any) {
    return Object.keys(obj).length === 0;
}


  return (
    <MainView>
      <CommonHeader
        title={'Details'}
        isBackButton={true}
        leftButtonType={'back'}
        onPressLeftButton={() => onPressLeftButton()}
        navigation={props?.navigation}
        isRightButton={false}
      />

      {console.log("/////////////////",personDetails)}
      { !isEmpty(personDetails)? (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image
              style={styles.imageViewStyle}
              
              source={personDetails.picture?{ uri: personDetails.picture }:Assets.avatar}
            />
          
            <TouchableOpacity onPress={() => seeUsersPost(personDetails.id, 10)}>
              <Text
                style={{
                  textAlign: 'center',
                  marginLeft: 10,
                  color: "blue"
                }}>
                See Posts
              </Text>
            </TouchableOpacity>
            <View style={styles.outerBoxView}>
              <Text style={styles.textViewStyle}>Name: </Text>
              <Text style={styles.textValueViewStyle}>
                {personDetails.title}. {personDetails.firstName}{' '}
                {personDetails.lastName}
              </Text>
            </View>
            <View style={styles.outerBoxView}>
              <Text style={[styles.textViewStyle]}>Gender: </Text>
              <Text style={styles.textViewStyle}>{personDetails.gender}</Text>
            </View>
            <View style={styles.outerBoxView}>
              <Text style={styles.textViewStyle}>Date Of Birth: </Text>
              <Text style={styles.textViewStyle}>
                {getFormattedDate(personDetails.dateOfBirth, true)}
              </Text>
            </View>
            <View style={styles.outerBoxView}>
              <Text style={styles.textViewStyle}>Email: </Text>
              <Text style={styles.textViewStyle}>{personDetails.email}</Text>
            </View>
            <View style={styles.outerBoxView}>
              <Text style={styles.textViewStyle}>Phone: </Text>
              <Text style={styles.textViewStyle}>{personDetails.phone}</Text>
            </View>
            <View style={styles.outerBoxView}>
              <Text style={styles.textViewStyle}>Address: </Text>
              <Text style={styles.textViewStyle}>
                {personDetails.location?.state}
              </Text>
            </View>
            <View style={styles.outerBoxView}>
              <Text style={styles.textViewStyle}>Street: </Text>
              <Text style={styles.textViewStyle}>
                {personDetails.location?.street}
              </Text>
            </View>
            <View style={styles.outerBoxView}>
              <Text style={styles.textViewStyle}>City: </Text>
              <Text style={styles.textViewStyle}>
                {personDetails.location?.city}
              </Text>
            </View>
            <View style={styles.outerBoxView}>
              <Text style={styles.textViewStyle}>Country: </Text>
              <Text style={styles.textViewStyle}>
                {personDetails.location?.country}
              </Text>
            </View>
            <View style={styles.outerBoxView}>
              <Text style={styles.textViewStyle}>TimmeZone: </Text>
              <Text style={styles.textViewStyle}>
                {personDetails.location?.timezone}
              </Text>
            </View>
          </ScrollView>
        </>
      ) : 
      <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          style={styles.imageViewStyle}
          
          source={personDetails.picture?{ uri: personDetails.picture }:Assets.avatar}
        />
      
       <View style={{flexDirection:'row',flex:1,alignItems:'center',justifyContent:'center'}}>
        <View style={styles.outershadowBoxView}/>
        <View style={styles.outershadowBoxView}/>
        </View>
        <View style={styles.outershadowBoxView}/>
        <View style={styles.outershadowBoxView}/>
        <View style={styles.outershadowBoxView}/>
        <View style={styles.outershadowBoxView}/>
        <View style={styles.outershadowBoxView}/>
        <View style={styles.outershadowBoxView}/>
        <Text style={{fontFamily:'',fontWeight:'bold',fontSize:15,marginHorizontal:10,flex:1,textAlign:'center',marginVertical:30}}>
           If you want to see the previous user details then u please need to first tap on any user profile manually </Text>
       
      </ScrollView>
    </>
      }
    </MainView>
  );
};

interface stateProps {
  commonReducer: any;
}

const mapStateToProps = (state: stateProps) => {
  return {
    isLoading: state.commonReducer.isLoading,
    error: state.commonReducer.error,
    personDetails: state.commonReducer.personDetail,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    _showProgressBar: () => dispatch(actions.showProgressBar()),
    _getUserPosts: (id:Number,number:Number) => dispatch(actions.getUserList(id,number)),

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PersonDetails);

const styles = StyleSheet.create({
  constainerStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FEFE',
    marginVertical: 3,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  imageViewStyle: {
    marginLeft: 10,
    height: 150,
    width: 150,

    alignSelf: 'center',

    resizeMode: 'contain',
    margin: 5,
    borderRadius: 25,
  },
  textViewStyle: {
    justifyContent: 'space-around',
    textDecorationColor: 'cyan',
    textShadowRadius: 2,
    fontSize: 20,
  },
  textValueViewStyle: {
    textDecorationColor: 'cyan',
    textShadowRadius: 2,
    fontSize: 20,
  },
  outerBoxView: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderRadius: 8,
    justifyContent: 'space-between',
    padding: 10,
    borderColor: 'cyan',
  },
  outershadowBoxView: {
    flexDirection: 'row',
    borderRadius: 8,
    justifyContent: 'space-between',
    padding: 20,
    marginTop:10,
    backgroundColor:'lightgrey',
    marginHorizontal:20
  },
});
