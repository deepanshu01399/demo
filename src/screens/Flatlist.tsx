import React, { useEffect, useState } from 'react';
import {

  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,

} from 'react-native';
import { connect } from 'react-redux';
import CommonUIComponent from '../commonComponent/CommonUIComponent';
import * as actions from '../redux/actionCreatorsTs';
import CommonFunctions from '../resources/commonFunctions';
import { COLORS } from '../resources/theme';
import FieldGeneratorScreen from './FieldGeneratorScreen';
import MainView from './MainView';

const FlatlistScreen = (props: any) => {
  const [data, setdata] = useState<flateDataListInterface[]>([]);
  const [checked,setChecked]=useState<boolean>();

  interface termCondition {
    termCondition: string;
  }

  interface flateDataListInterface {
    id: number;
    name: string;
    emailId: string;
    isEmailVerified: boolean;
    isAgreeOnTerms:boolean;
    termConditions: termCondition[];
  }

  const flateDataList = [

    {
      id: 1,
      name: 'deepanshu',
      emailId: 'deepanshu@gmail.com',
      isEmailVerified: false,
      isAgreeOnTerms:false,
      termConditions: [
        { termCondition: "this is term Condition 1 for deepanshu" },
        { termCondition: "this is term Condition 2 for deepanshu" }
      ]
    },
    {
      id: 2,
      name: 'bhanu',
      emailId: 'bhanu@gmail.com',
      isEmailVerified: false,
      isAgreeOnTerms:true,
      termConditions: [
        { termCondition: "this is term Condition 1 for bhanu" },
        { termCondition: "this is term Condition 2 for bhanu" }
      ]
    },
    {
      id: 3,
      name: 'himanshu',
      emailId: 'himanshu@gmail.com',
      isEmailVerified: false,
      isAgreeOnTerms:true,
      termConditions: [
        { termCondition: "this is term Condition 1 for himanshu" },
        { termCondition: "this is term Condition 2 for himanshu" }
      ]
    },
    {
      id: 4,
      name: 'rinku',
      emailId: 'rinku@gmail.com',
      isEmailVerified: true,
      isAgreeOnTerms:false,
      termConditions: [
        { termCondition: "this is term Condition 1 for rinku" },
        { termCondition: "this is term Condition 2 for rinku" }
      ]
    }
  ]

  useEffect(() => {
    let datalist: flateDataListInterface[] = [];
    flateDataList.forEach((item, index) => {
      let dataitem: flateDataListInterface = {
        id: item.id,
        name: item.name,
        emailId: item.emailId,
        isAgreeOnTerms:item.isAgreeOnTerms,
        isEmailVerified: item.isEmailVerified,
        termConditions: item.termConditions,
      }
      datalist.push(dataitem)
    })
    setdata(datalist)

  }, [])

  const renderFlateListItem = (item: flateDataListInterface, index: number) => {
    return (
      <View style={{ marginTop: 10 }}>
        <CommonUIComponent
          type="cardComponent"
          backgroundColor='lightgrey'
          borderColor={item.isAgreeOnTerms?COLORS.appDefaultColor:COLORS.red}
          children={
            <View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between" }}>
                <CommonUIComponent
                  type="normalText"
                  label="Name"
                  textColor="black"
                />
                <CommonUIComponent
                  type="normalText"
                  label={item.name}
                />
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between" }}>
                <CommonUIComponent
                  type="normalText"
                  label="Email"
                  textColor="black"
                  
                />
                 <View style={{  flexDirection: 'row', justifyContent: "flex-end" }}>
                <CommonUIComponent
                  type="normalText"
                  label={item.emailId}
                />
                <Image
                source={require('../assets/EditIcon.png')}
                style={{height:20,width:20,marginLeft:10}}
                />
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between" }}>
                <CommonUIComponent
                  type="normalText"
                  label="Is email Verified"
                  textColor="black"
                />
                <CommonUIComponent
                  type="normalText"
                  label={item.isEmailVerified}
                  textColor={item.isEmailVerified ? COLORS.green : COLORS.red}
                />
              
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between" }}>
                <CommonUIComponent
                  type="normalText"
                  label="Agree on Terms & conditions"
                  textColor="black"
                />
                 <FieldGeneratorScreen
                 lable="check"
                    isActive={checked}
                    callBack={(data: boolean) => setChecked(data)}
                    type={"PressableCheck"}
                    isDisabled={false}
                    iconAlignment={"justLeft"}
                    needtoShowTextMsg={false}
          />

             
              </View>
              <CommonUIComponent
                  type="normalText"
                  label="Terms and Conditions:"
                  textColor="black"
                />
                <FlatList
                data={item.termConditions}
                keyExtractor={(item,index)=>index.toString()}
                renderItem={({item,index})=>
                    <CommonUIComponent
                    type="normalText"
                    label={`* ${index+1} : ${item.termCondition}`}
                  />
                }
                />
              
                  
                
               
            </View>
          }

        />
      </View>
    )

  }


  return (
    <MainView>
      <ScrollView style={{ marginBottom: 20, marginHorizontal: 8 }}>
        <CommonUIComponent
          type="headerText"
          label="Hello FlateList"
          textColor="red"
        />
        <CommonUIComponent
          type="normalText"
          label="Hello FlateList"
          textColor="black"
        />



        <FlatList
          data={data}
          renderItem={({ item, index }) => renderFlateListItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
        />
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


export default connect(mapStateToProps, mapDispatchToProps)(FlatlistScreen);

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
