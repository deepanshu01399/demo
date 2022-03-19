import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Share,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {connect} from 'react-redux';
import MainView from './MainView';

const Checkboxes = (props: any) => {

    const viewForHolder = (
        item:any,
        index:number,
      ) => {
        return (
          <View>
            <View
              style={{
                ...styles.row, //, backgroundColor: COLORS.lightGray3
              }}>
              <Text style={{...styles.tabletext, fontSize: 16}}>
                Joint Holder {index + 1}
              </Text>
            
            </View>
            <View style={styles.row}>
              <Text style={styles.tabletext}>Name</Text>
              <Text style={styles.tabletext1}>
                {item.first_name ?? ''} {item.last_name ?? ''}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.tabletext}>Email</Text>
              {!editMail ? (
                <View
                  style={{
                    borderBottomColor: 'blue',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      ...styles.tabletext1,
                      // width: '60%'
                    }}>
                    {item.email_address}
                  </Text>
                  {!isChecked(item.id) ? (
                    <TouchableOpacity onPress={() => clickOnEditMail(item.id)}>
                      <Image style={{marginLeft: 5}} source={} />
                    </TouchableOpacity>
                  ) : null}
                </View>
              ) : item.id === currentlyItem ? (
                <View style={{flexDirection: 'row'}}>
                  <TextInput
                    onChangeText={text => setEmail(text)}
                    style={{
                      borderBottomWidth: 1,
                      borderColor: 'blue',
                      borderWidth: 1,
                      color:'blue'
                    }}
                    value={email != '' ? email : item.email_address}></TextInput>
                  <TouchableOpacity onPress={() => updateEmail(item)}>
                    <Image source={Assets.checkbutton} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => cancelUpdateEmail(item)}>
                    <Image source={Assets.crossButton} />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      color: 'blue',
                      fontFamily: 'Poppins-Medium',
                      fontSize: 14,
                    }}>
                    {item.email_address}
                  </Text>
                  <TouchableOpacity onPress={() => clickOnEditMail(item.id)}>
                      <Image style={{marginLeft: 5}} source={Assets.editIcon} />
                    </TouchableOpacity>
                </View>
              )}
            </View>
          
            <View style={styles.row}>
              <Text style={styles.tabletext}>Is joint holder a minor?</Text>
              <Switch
                onValueChange={res => toggleChecked(item, res)}
                value={isChecked(item.id)}
                trackColor={{
                  false: 'grey',
                  true: Colors.blue,
                }}
                thumbColor={'white'}
                ios_backgroundColor={'grey'}></Switch>
            </View>
          </View>
        );
      };
      
    return (
      <MainView //style={{backgroundColor: 'cyan'}}
      >
        <FlatList
          keyExtractor={(item, index: any) => index}
          renderItem={({item, index}) => viewForHolder(item, index)}
          data={}
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

export default Checkboxes;

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
  
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  
    tableTotal: {
      fontFamily: 'Poppins-Medium',
      paddingRight: 20,
      color: 'grey',
      paddingVertical: 10,
      fontSize: 15,
    },
    totalFeeCurrency: {
      fontFamily: 'Poppins-Medium',
      paddingRight: 3,
      color: 'grey',
      paddingVertical: 10,
      fontSize: 15,
    },
    cancel: {
      borderColor: "cyan",
      borderWidth: 1,
      width: '70%',
      alignSelf: 'center',
      height: 30,
      marginTop: 20,
    },
  
    textContainer: {
      marginTop: 20,
      marginHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    flatList: {
      borderBottomWidth: 1,
      flexDirection: 'row',
      paddingHorizontal: 20,
      alignItems: 'center',
      borderBottomColor:'red',
      paddingVertical: 15,
    },
    Buy: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    text2: {
      fontSize: 14,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    table: {
      backgroundColor: '#fff',
      paddingVertical: 15,
    },
    table2: {
      backgroundColor: '#fff',
    },
    row: {
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 5,
      paddingHorizontal: 20,
      alignItems: 'center',
      borderBottomColor:'red',
    },
    row2: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    rowText: {
      paddingVertical: 10,
      fontSize: 15,
      fontFamily: 'Poppins-Medium',
      paddingHorizontal: 20,
      color: "cyan",
    },
    rowText1: {
      fontSize: 17,
      fontWeight: 'bold',
      paddingVertical: 10,
    },
    tabletext: {
      color: '#616161',
      fontSize: 14,
      fontFamily: 'Poppins-Medium',
      paddingVertical: 10,
    },
    StockName: {
      color: '#616161',
      fontSize: 14,
      fontFamily: 'Poppins-Medium',
      paddingBottom: 10,
    },
    boxText: {
      color: '#616161',
      fontSize: 14,
      fontFamily: 'Poppins-Medium',
    },
    tabletext1: {
      color: 'grey',
      fontFamily: 'Poppins-Medium',
      fontSize: 14,
    },
    Currency: {
      paddingRight: 3,
      color: 'grey',
      fontFamily: 'Poppins-Medium',
      fontSize: 14,
      paddingVertical: 10,
    },
    newImageIcon: {
      width: 15,
      height: 15,
      resizeMode: 'contain',
      marginRight: 5,
    },
    text3: {
      color: 'grey',
      fontSize: 15,
      fontFamily: 'Poppins-Medium',
    },
    Date: {
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    Time: {
      color: 'grey',
      fontFamily: 'Poppins-Medium',
    },
    box: {
      backgroundColor: 'orange',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    row1: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 2,
    },
    bold: {
      color: 'grey',
      fontFamily: 'Poppins-Medium',
    },
    orderDetails: {
      color: 'grey',
      fontSize: 18,
      fontFamily: 'Poppins-Medium',
      paddingHorizontal: 20,
    },
  
    totalOrder: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#e7e4eb',
      paddingHorizontal: 20,
    },
    totalFee: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'orange',
    },
    processedOrder: {
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
  
    table3: {
      backgroundColor: '#fff',
      marginTop: 10,
      paddingVertical: 10,
    },
  
    table3Text1: {
      fontSize: 14,
      color: '#616161',
    },
  
    table5: {
      flexDirection: 'row',
      // justifyContent:"space-between",
      paddingHorizontal: 30,
      paddingVertical: 10,
      backgroundColor: 'orange',
    },
    submitButtonContainer: {
      backgroundColor: 'grey',
      width: '100%',
      paddingVertical: 11,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      marginBottom: 15,
    },
    cancelButtonContainer: {
      width: '100%',
      paddingVertical: 11,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      marginBottom: 20,
      backgroundColor: 'orange',
      borderWidth: 2,
      borderColor: "cyan",
    },
    submitButtonInnerContainer1: {
      width: '100%',
      backgroundColor: 'orange',
      paddingHorizontal: 15,
  
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
  
      // paddingBottom:20
    },
    button: {
      alignContent: 'center',
      color: '#fff',
      fontSize: 15,
      fontFamily: 'Poppins-Medium',
    },
    button2: {
      textAlign: 'center',
      color: 'grey',
      fontSize: 15,
      fontFamily: 'Poppins-Medium',
    },
    cancleButtonInnerContainer1: {
      paddingTop: 15,
      paddingHorizontal: 15,
      width: '100%',
      paddingBottom: 30,
    },
    cancleButtonContainer: {
      backgroundColor: '#fff',
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      borderColor: "cyan",
      borderWidth: 1,
      borderRadius: 5,
    },
    footerContainer: {
      // paddingTop: 15,
    },
    date: {
      color: "cyan",
      flex: 1,
      fontSize: 15,
      fontFamily: 'Poppins-Medium',
    },
    time: {
      color: "cyan",
      flex: 1,
      fontSize: 15,
      fontFamily: 'Poppins-Medium',
    },
    orderDesc: {
      color: "cyan",
      flex: 1.4,
      fontSize: 14,
      // marginRight:10,
      fontFamily: 'Poppins-Medium',
    },
    price: {
      color: "cyan",
      flex: 1,
      fontSize: 15,
      fontFamily: 'Poppins-Medium',
    },
    fee: {
      color: "cyan",
      flex: 1,
      fontSize: 15,
      fontFamily: 'Poppins-Medium',
    },
    quantity: {
      color: "cyan",
      flex: 1.4,
      fontSize: 14,
      // marginRight:10,
      fontFamily: 'Poppins-Medium',
    },
    amount: {
      color: "cyan",
      flex: 1,
      fontSize: 14,
      // marginRight:10,
      fontFamily: 'Poppins-Medium',
    },
    separatorLine: {
      width: '100%',
      height: 1,
      backgroundColor:'blue',
    },
    container3: {
      // alignItems: 'center',
      // justifyContent: 'space-evenly',
      backgroundColor: 'white',
      marginHorizontal: 26,
      borderRadius: 20,
      maxHeight: 400,
    },
    mainContainer: {
      flex: 1,
      backgroundColor: '#000000AA',
      justifyContent: 'center',
      paddingEnd: 5,
    },
  
});
