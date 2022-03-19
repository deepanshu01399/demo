import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../redux/actionCreatorsTs';
import MainView from './MainView';

const PersonDetails = (props: any) => {
  console.log('PersonDetailsProps: ==>', props);
  const personDetails = props.personDetails ?? [];

  return (
    <MainView>
      {personDetails != null || personDetails != undefined ? (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image
              style={styles.imageViewStyle}
              source={{uri: personDetails.picture}}
            />
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
                {personDetails.dateOfBirth}
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
      ) : null}
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
});
