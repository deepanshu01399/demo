import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import CommonUIComponent from '../commonComponent/CommonUIComponent';
import * as actions from '../redux/actionCreatorsTs';
import {COLORS} from '../resources/theme';
import FieldGeneratorScreen from './FieldGeneratorScreen';
import MainView from './MainView';

const FlatlistScreen = (props: any) => {
  const [data, setdata] = useState<flateDataListInterface[]>([]);
  const [currentEditUser, setCurrentEditUser] = useState<number>();
  const [lable5, setlable5] = useState('');

  interface termCondition {
    termCondition: string;
  }

  interface flateDataListInterface {
    id: number;
    name: string;
    emailId: string;
    isEmailVerified: boolean;
    isAgreeOnTerms: boolean;
    termConditions: termCondition[];
    isChecked: boolean;
  }

  const flateDataList = [
    {
      id: 1,
      name: 'deepanshu',
      emailId: 'deepanshu@gmail.com',
      isEmailVerified: false,
      isAgreeOnTerms: false,
      termConditions: [
        {termCondition: 'this is term Condition 1 for deepanshu'},
      ],
    },
    {
      id: 2,
      name: 'bhanu',
      emailId: 'bhanu@gmail.com',
      isEmailVerified: false,
      isAgreeOnTerms: true,
      termConditions: [
        {termCondition: 'this is term Condition 1 for bhanu'},
        {termCondition: 'this is term Condition 2 for bhanu'},
      ],
    },
    {
      id: 3,
      name: 'himanshu',
      emailId: 'himanshu@gmail.com',
      isEmailVerified: false,
      isAgreeOnTerms: true,
      termConditions: [
        {termCondition: 'this is term Condition 1 for himanshu'},
        {termCondition: 'this is term Condition 2 for himanshu'},
      ],
    },
    {
      id: 4,
      name: 'rinku',
      emailId: 'rinku@gmail.com',
      isEmailVerified: true,
      isAgreeOnTerms: false,
      termConditions: [{termCondition: 'this is term Condition 1 for rinku'}],
    },
    ,
    {
      id: 3,
      name: 'ankit',
      emailId: 'ankit@gmail.com',
      isEmailVerified: false,
      isAgreeOnTerms: true,
      termConditions: [
        {termCondition: 'this is term Condition 1 for ankit'},
        {termCondition: 'this is term Condition 2 for ankit'},
      ],
    },
    {
      id: 4,
      name: 'aarav',
      emailId: 'aarav@gmail.com',
      isEmailVerified: true,
      isAgreeOnTerms: false,
      termConditions: [{termCondition: 'this is term Condition 1 for aarav'}],
    },
  ];

  useEffect(() => {
    let datalist: flateDataListInterface[] = [];
    flateDataList.forEach((item: any, index) => {
      let dataitem: flateDataListInterface = {
        id: item?.id,
        name: item?.name,
        emailId: item?.emailId,
        isAgreeOnTerms: item?.isAgreeOnTerms,
        isEmailVerified: item?.isEmailVerified,
        termConditions: item?.termConditions,
        isChecked: false,
      };
      datalist.push(dataitem);
    });
    setdata(datalist);
  }, []);

  const renderFlateListItem = (item: flateDataListInterface, index: number) => {
    return (
      <TouchableOpacity
        style={{marginTop: 10}}
        onPress={() => {
          clickedOnItem(item, index);
        }}>
        <CommonUIComponent
          type="cardComponent"
          backgroundColor={
            item.isChecked ? COLORS.appDefaultColor : 'lightgrey'
          }
          borderColor={
            item.isAgreeOnTerms ? COLORS.appDefaultColor : COLORS.red
          }
          children={
            <View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <CommonUIComponent
                  type="normalText"
                  label="Name"
                  textColor="black"
                />
                <CommonUIComponent type="normalText" label={item.name} />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <CommonUIComponent
                  type="normalText"
                  label="Email"
                  textColor="black"
                />
                {currentEditUser != item.id ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}>
                    <CommonUIComponent type="normalText" label={item.emailId} />
                    <TouchableOpacity
                      onPress={() => {
                        Editclicked(item, item.emailId);
                      }}>
                      <Image
                        source={require('../assets/EditIcon.png')}
                        style={{height: 20, width: 20, marginLeft: 10}}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}>
                    <TextInput
                      autoCapitalize="none"
                      maxLength={props.maxLength}
                      editable={!props.isDisabled}
                      selectTextOnFocus={props.selectTextOnFocus}
                      placeholder=""
                      style={{
                        borderColor: COLORS.lightGray,
                        borderWidth: 2,
                        width: '70%',
                        height: 35,
                      }}
                      value={lable5}
                      onChangeText={text => setEditEmailValue(text)}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setEditEmailOk(item, index, item.id, lable5);
                      }}>
                      <Image
                        source={require('../assets/checked.png')}
                        style={{height: 20, width: 20, marginLeft: 10}}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
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
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <CommonUIComponent
                  type="normalText"
                  label="Agree on Terms & conditions"
                  textColor="black"
                />
                <FieldGeneratorScreen
                  lable="check"
                  isActive={item.isAgreeOnTerms}
                  callBack={(data: boolean) => {
                    setCheckBox(item, index, item.id, data ? 'true' : 'false');
                  }}
                  type={'PressableCheck'}
                  isDisabled={false}
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
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <CommonUIComponent
                    type="normalText"
                    label={`* ${index + 1} : ${item.termCondition}`}
                  />
                )}
              />
            </View>
          }
        />
      </TouchableOpacity>
    );
  };

  const submitList = () => {
    let checkedItems = data.filter(item => {
      if (item.isChecked) {
        return item;
      }
    });

    console.log('checked items==>', checkedItems);
    return checkedItems;
  };

  const clickedOnItem = (item: flateDataListInterface, index: number) => {
    let item1 = data[index];
    item1.isChecked = !item1.isChecked;
    data[index] = item1;
    setdata([...data]);
    setlable5('email');
  };

  const Editclicked = (data: flateDataListInterface, email: string) => {
    console.log('on edit---------->');
    if (email) {
      setlable5(email);
    }
    setCurrentEditUser(data.id);
  };

  const setEditEmailValue = (data: string) => {
    console.log('on editemail value---------->', data);
    setlable5(data);
  };
  const setEditEmailOk = (
    data: flateDataListInterface,
    index: number,
    id: number,
    value: string,
  ) => {
    console.log('on edit---------->');
    updateUserDataList('updateEmail', index, id, value);
    setCurrentEditUser(0);
  };
  const setCheckBox = (
    data: flateDataListInterface,
    index: number,
    id: number,
    value: string,
  ) => {
    console.log('on edit---------->');
    updateUserDataList('updateCheckItem', index, id, value);
  };

  const updateUserDataList = (
    key: string,
    index: number,
    id: number,
    value: string,
  ) => {
    let abc: any[] = [];
    let preVdata: flateDataListInterface[] = [...data];

    switch (key) {
      case 'updateEmail':
        // abc= data.map((item)=>
        //   item.id===id?{...item,emailId:value}:{item}
        // )

        preVdata[index] = {...data[index], emailId: value};
        console.log('2===========', preVdata[index]);

        setdata(preVdata);

        break;
      case 'updateCheckItem':
        // abc= data.map((item)=>
        //   item.id===id?{...item,isAgreeOnTerms:value}:{item}
        // )

        preVdata[index] = {
          ...data[index],
          isAgreeOnTerms: value == 'true' ? true : false,
        };
        console.log('22===========', preVdata[index]);

        setdata(preVdata);

        //setdata(abc)

        break;
      default:
        return data;
    }
  };

  return (
    <MainView>
      <ScrollView style={{marginHorizontal: 8}}>
        <CommonUIComponent
          type="headerText"
          label="Hello FlateList"
          textColor="red"
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CommonUIComponent
            type="normalText"
            label="Hello FlateList"
            textColor="black"
          />

          <FieldGeneratorScreen
            lable={'submit list'}
            callBack={() => submitList()}
            type={'PressableBtn'}
            isDisabled={false}
            iconAlignment={'alignEnd'}
            needtoShowIcon={false}
          />
        </View>
        <FlatList
          data={data}
          style={{marginBottom: 20}}
          renderItem={({item, index}) => renderFlateListItem(item, index)}
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
  headerStyle: {
    flex: 1,
    color: 'black',
    fontWeight: '700',
    fontSize: 20,
    alignSelf: 'center',
    marginVertical: 15,
  },
});
