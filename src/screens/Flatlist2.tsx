import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,

} from 'react-native';
import { connect } from 'react-redux';
import CommonUIComponent from '../commonComponent/CommonUIComponent';
import * as actions from '../redux/actionCreatorsTs';
import { COLORS } from '../resources/theme';
import FieldGeneratorScreen from './FieldGeneratorScreen';
import MainView from './MainView';

const FlatlistScreen2 = (props: any) => {
  const [data, setdata] = useState<flateDataListInterface[]>([]);
  const [checked, setChecked] = useState<boolean>();
  const [currentEditUser, setCurrentEditUser] = useState<number>();
  const [lable5, setlable5] = useState('');
  const [name, setNameValue] = useState<string>('');
  const [isEmailVerified, setEmailVerified] = useState<boolean | undefined>(false);
  const [isAgreeOnTerms, setisAggreeOnTerms] = useState<boolean>(false);
  const [termCondition1, setTermCon1] = useState<string>('');
  const [additem, setShowAddItem] = useState<boolean>(false)
  const [termCondition2, setTermCon2] = useState<string>('');
  const [email, setEmail] = useState('');

  interface termCondition {
    termCondition: string;
  }

  interface flateDataListInterface {
    id: number | undefined;
    name: string;
    emailId: string;
    isEmailVerified: boolean | undefined;
    isAgreeOnTerms: boolean | undefined;
    termConditions: termCondition[];
  }

  const flateDataList: flateDataListInterface[] = [

    // {
    //   id: 1,
    //   name: 'deepanshu',
    //   emailId: 'deepanshu@gmail.com',
    //   isEmailVerified: false,
    //   isAgreeOnTerms: false,
    //   termConditions: [
    //     { termCondition: "this is term Condition 1 for deepanshu" },
    //     { termCondition: "this is term Condition 2 for deepanshu" }
    //   ]
    // },

  ]

  useEffect(() => {
    let datalist: flateDataListInterface[] = [];
    flateDataList.forEach((item, index) => {
      let dataitem: flateDataListInterface = {
        id: item.id,
        name: item.name,
        emailId: item.emailId,
        isAgreeOnTerms: item.isAgreeOnTerms,
        isEmailVerified: item.isEmailVerified,
        termConditions: item.termConditions,
      }
      datalist.push(dataitem)
    })
    setdata(datalist)

  }, [])

  const submitList = () => {
    console.log(data)
  }
  const addItemToList = () => {

    const item: flateDataListInterface =

    {
      id: data.length,
      name: name,
      emailId: email,
      isEmailVerified: isEmailVerified,
      isAgreeOnTerms: isAgreeOnTerms,
      termConditions: [
        { termCondition: `this is term Condition 1 ${termCondition1}` },
        { termCondition: `this is term Condition 2 ${termCondition2}` },
      ]
    }
    setdata((olddata) => [...olddata, item])
    setShowAddItem(false)
  }

  const addmoreItems = () => {
    setNameValue('');
    setEmail('');
    setisAggreeOnTerms(false);
    setEmailVerified(undefined);
    setTermCon1('');
    setTermCon2('');
    setShowAddItem(true);

  }

  const Editclicked = (data: flateDataListInterface, email: string) => {
    if (email) {
      setlable5(email)
    }
    setCurrentEditUser(data.id)

  }

  const setEditEmailValue = (data: string) => {
    setlable5(data)

  }
  const setEditEmailOk = (data: flateDataListInterface, index: number, id: number, value: string) => {
    updateUserDataList("updateEmail", index, id, value);
    setCurrentEditUser(undefined);

  }
  const setCheckBox = (data: flateDataListInterface, index: number, id: number, value: string) => {
    updateUserDataList("updateCheckItem", index, id, value);

  }

  const updateUserDataList = (key: string, index: number, id: number, value: string) => {
    let abc: (any[]) = [];
    let preVdata: flateDataListInterface[] = [...data];

    switch (key) {
      case "updateEmail":
        preVdata[index] = { ...data[index], emailId: value };
        setdata(preVdata)

        break;
      case 'updateCheckItem':
        preVdata[index] = { ...data[index], isAgreeOnTerms: value == "true" ? true : false };
        setdata(preVdata)

        break;

      default:
        return data;
    }


  }
  const AddItem = () => {
    return (
      <View style={{ marginTop: 10 }}>
        <CommonUIComponent
          type="cardComponent"
          backgroundColor='lightgrey'
          borderColor={COLORS.red}
          children={
            <View>
              <View style={{ flex: 1, marginVertical: 10, flexDirection: 'row', justifyContent: "space-between" }}>
                <CommonUIComponent
                  type="normalText"
                  label="Name"
                  textColor="black"
                />
                <View style={{ flexDirection: 'row', justifyContent: "flex-end", alignItems: 'center' }}>

                  <TextInput
                    autoCapitalize="none"
                    placeholder='Name'
                    style={{ borderColor: COLORS.lightGray, borderWidth: 2, width: '90%', height: 35 }}
                    value={name}
                    onChangeText={text => { setNameValue(text) }}
                  />

                </View>

              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                <CommonUIComponent
                  type="normalText"
                  label="Email"
                  textColor="black"

                />

                <View style={{ flexDirection: 'row', justifyContent: "flex-end", alignItems: 'center' }}>

                  <TextInput
                    autoCapitalize="none"
                    maxLength={props.maxLength}
                    editable={!props.isDisabled}
                    selectTextOnFocus={props.selectTextOnFocus}
                    placeholder=''
                    style={{ borderColor: COLORS.lightGray, borderWidth: 2, width: '90%', height: 35 }}
                    value={email}
                    onChangeText={text => { setEmail(text) }}
                  />

                </View>
              </View>
              <View style={{ flex: 1, marginTop: 10, flexDirection: 'row', justifyContent: "space-between" }}>
                <CommonUIComponent
                  type="normalText"
                  label="Is email Verified"
                  textColor="black"
                />


                <FieldGeneratorScreen
                  lable="isEmailVerified"
                  isActive={isEmailVerified}
                  callBack={(data: boolean) => { setEmailVerified(data) }}
                  type={"PressableCheck"}
                  isDisabled={false}
                  needtoShowTextMsg={false}
                />

              </View>
              <View style={{ flex: 1, marginTop: 10, flexDirection: 'row', justifyContent: "space-between" }}>
                <CommonUIComponent
                  type="normalText"
                  label="Agree on Terms & conditions"
                  textColor="black"
                />
                <FieldGeneratorScreen
                  lable="check"
                  isActive={isAgreeOnTerms}
                  callBack={(data: boolean) => { setisAggreeOnTerms(data) }}
                  type={"PressableCheck"}
                  isDisabled={false}
                  needtoShowTextMsg={false}
                />

              </View>
              <CommonUIComponent
                type="normalText"
                label="Terms and Conditions:"
                textColor="black"
              />

              <TextInput
                autoCapitalize="none"
                placeholder='termCondition1'
                style={{ marginTop: 10, borderColor: COLORS.lightGray, borderWidth: 2, width: '100%', height: 35 }}
                value={termCondition1}
                onChangeText={text => setTermCon1(text)}
              />

              <TextInput
                autoCapitalize="none"
                placeholder='termCondition2'
                style={{ marginVertical: 10, borderColor: COLORS.lightGray, borderWidth: 2, width: '100%', height: 35 }}
                value={termCondition2}
                onChangeText={text => setTermCon2(text)}
              />
              <FieldGeneratorScreen
                lable={"OK add item to list"}
                callBack={() => addItemToList()}
                type={"PressableBtn"}
                isDisabled={false}
                iconAlignment={"alignEnd"}
                needtoShowIcon={false}
                backgroundColor={COLORS.appDefaultColor}
                textColor={COLORS.white}
              />
            </View>
          }
        />
      </View>
    )

  }

  const renderFlateListItem = (item: flateDataListInterface, index: number) => {
    return (
      <View style={{ marginTop: 10 }}>
        <CommonUIComponent
          type="cardComponent"
          backgroundColor='lightgrey'
          borderColor={item.isAgreeOnTerms ? COLORS.appDefaultColor : COLORS.red}
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
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                <CommonUIComponent
                  type="normalText"
                  label="Email"
                  textColor="black"

                />
                {currentEditUser != item.id ?
                  <View style={{ flexDirection: 'row', justifyContent: "flex-end", alignItems: "center" }}>
                    <CommonUIComponent
                      type="normalText"
                      label={item.emailId}
                    />
                    <TouchableOpacity
                      onPress={() => { Editclicked(item, item.emailId) }}>
                      <Image
                        source={require('../assets/EditIcon.png')}
                        style={{ height: 20, width: 20, marginLeft: 10 }}
                      />
                    </TouchableOpacity>
                  </View>
                  :
                  <View style={{ flexDirection: 'row', justifyContent: "flex-end", alignItems: 'center' }}>

                    <TextInput
                      autoCapitalize="none"
                      maxLength={props.maxLength}
                      editable={!props.isDisabled}
                      selectTextOnFocus={props.selectTextOnFocus}
                      placeholder=''
                      style={{ borderColor: COLORS.lightGray, borderWidth: 2, width: '70%', height: 35 }}
                      value={lable5}
                      onChangeText={text => setEditEmailValue(text)}
                    />
                    <TouchableOpacity
                      onPress={() => { setEditEmailOk(item, index, item.id!, lable5) }}>
                      <Image
                        source={require('../assets/checked.png')}
                        style={{ height: 20, width: 20, marginLeft: 10 }}
                      />
                    </TouchableOpacity>
                  </View>

                }
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between" }}>
                <CommonUIComponent
                  type="normalText"
                  label="Is email Verified"
                  textColor="black"
                />
                <CommonUIComponent
                  type="normalText"
                  label={item.isEmailVerified ? item.isEmailVerified : 'false'}
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
                  isActive={item.isAgreeOnTerms}
                  callBack={(data: boolean) => { setCheckBox(item, index, item.id!, data ? 'true' : 'false') }}
                  type={"PressableCheck"}
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
                renderItem={({ item, index }) =>
                  <CommonUIComponent
                    type="normalText"
                    label={`* ${index + 1} : ${item.termCondition}`}
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

        <FlatList
          data={data}
          renderItem={({ item, index }) => renderFlateListItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
        />
        {additem ?
         <View style={{ marginTop: 10 }}>
          <CommonUIComponent
            type="cardComponent"
            backgroundColor='lightgrey'
            borderColor={COLORS.red}
            children={
              <View>
                <View style={{ flex: 1, marginVertical: 10, flexDirection: 'row', justifyContent: "space-between" }}>
                  <CommonUIComponent
                    type="normalText"
                    label="Name"
                    textColor="black"
                  />
                  <View style={{ flexDirection: 'row', justifyContent: "flex-end", alignItems: 'center' }}>

                    <TextInput
                      autoCapitalize="none"
                      placeholder='Name'
                      style={{ borderColor: COLORS.lightGray, borderWidth: 2, width: '90%', height: 35 }}
                      value={name}
                      onChangeText={text => { setNameValue(text) }}
                    />

                  </View>

                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                  <CommonUIComponent
                    type="normalText"
                    label="Email"
                    textColor="black"

                  />

                  <View style={{ flexDirection: 'row', justifyContent: "flex-end", alignItems: 'center' }}>

                    <TextInput
                      autoCapitalize="none"
                      maxLength={props.maxLength}
                      editable={!props.isDisabled}
                      selectTextOnFocus={props.selectTextOnFocus}
                      placeholder=''
                      style={{ borderColor: COLORS.lightGray, borderWidth: 2, width: '90%', height: 35 }}
                      value={email}
                      onChangeText={text => { setEmail(text) }}
                    />

                  </View>
                </View>
                <View style={{ flex: 1, marginTop: 10, flexDirection: 'row', justifyContent: "space-between" }}>
                  <CommonUIComponent
                    type="normalText"
                    label="Is email Verified"
                    textColor="black"
                  />


                  <FieldGeneratorScreen
                    lable="isEmailVerified"
                    isActive={isEmailVerified}
                    callBack={(data: boolean) => { setEmailVerified(data) }}
                    type={"PressableCheck"}
                    isDisabled={false}
                    needtoShowTextMsg={false}
                  />

                </View>
                <View style={{ flex: 1, marginTop: 10, flexDirection: 'row', justifyContent: "space-between" }}>
                  <CommonUIComponent
                    type="normalText"
                    label="Agree on Terms & conditions"
                    textColor="black"
                  />
                  <FieldGeneratorScreen
                    lable="check"
                    isActive={isAgreeOnTerms}
                    callBack={(data: boolean) => { setisAggreeOnTerms(data) }}
                    type={"PressableCheck"}
                    isDisabled={false}
                    needtoShowTextMsg={false}
                  />

                </View>
                <CommonUIComponent
                  type="normalText"
                  label="Terms and Conditions:"
                  textColor="black"
                />

                <TextInput
                  autoCapitalize="none"
                  placeholder='termCondition1'
                  style={{ marginTop: 10, borderColor: COLORS.lightGray, borderWidth: 2, width: '100%', height: 35 }}
                  value={termCondition1}
                  onChangeText={text => setTermCon1(text)}
                />

                <TextInput
                  autoCapitalize="none"
                  placeholder='termCondition2'
                  style={{ marginVertical: 10, borderColor: COLORS.lightGray, borderWidth: 2, width: '100%', height: 35 }}
                  value={termCondition2}
                  onChangeText={text => setTermCon2(text)}
                />
                <FieldGeneratorScreen
                  lable={"OK add item to list"}
                  callBack={() => addItemToList()}
                  type={"PressableBtn"}
                  isDisabled={false}
                  iconAlignment={"alignEnd"}
                  needtoShowIcon={false}
                  backgroundColor={COLORS.appDefaultColor}
                  textColor={COLORS.white}
                />
              </View>
            }
          />
        </View> 
        : null}
        <View style={{ flex: 1, marginTop: 20, flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
          <FieldGeneratorScreen
            lable={"Add More list"}
            callBack={() => addmoreItems()}
            type={"PressableBtn"}
            isDisabled={false}
            iconAlignment={"alignEnd"}
            needtoShowIcon={false}
            backgroundColor={COLORS.appDefaultColor}
            textColor={COLORS.white}
          />

          <FieldGeneratorScreen
            lable={"submit list"}
            callBack={() => submitList()}
            type={"PressableBtn"}
            isDisabled={false}
            iconAlignment={"alignEnd"}
            needtoShowIcon={false}
            backgroundColor={COLORS.appDefaultColor}
            textColor={COLORS.white}
          />
        </View>

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


export default connect(mapStateToProps, mapDispatchToProps)(FlatlistScreen2);

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
