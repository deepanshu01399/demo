import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import CommonFunctions from "../resources/commonFunctions";
import { commonStyling } from "../resources/styles";
import { COLORS } from "../resources/theme";
import ModalPicker from "react-native-modal-selector"
import DatePicker from 'react-native-datepicker';
import { Assets } from "../resources/Assets";

interface PressableProps {
    lable?: string;
    isActive?: boolean;
    callback?: any;
    isCheckbox?: boolean;
    isDisabled?: boolean;
    type?: string;
    iconAlignment?: string;
    backgroundColor: string;
    textColor: string;
    needtoShowIcon: boolean;


}
interface OptionsProps {
    key?: number;
    label?: string;
}

interface PickerProps {
    lable?: string;
    children: any;
    data: OptionsProps[];
    isRequired?: boolean;
    isDisabled?: boolean;
    callback: Function;
    type: string;
    fetchObject?: boolean;
    placeHolder?: string;
    isActive?: boolean;
    value?: string;
}

interface DatePickerProps {
    lable?: string;
    date: Date;
    isRequired?: boolean;
    callback: Function;
    maxDate: Date;
    minDate: Date;
    type: string;
    isDisabled: boolean;
}


const EditTextComponent = (props: any) => {
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        setValues(props?.value)
    }, [props?.value]);

    const getKeyboardType = (inputType: string, props: any) => {
        console.log(inputType, props)
        switch (inputType) {
            case 'NUMBER': // this also returns dot in android
                return 'number-pad';

            case 'CONTACT_NUMBER':
                return 'phone-pad';

            case 'EMAIL': // alphabet along with numbers and special characters
                return 'email-address';

            case 'ALPHABETS': // will only accepts alphabet characters
                return 'email-address';

            case 'ONLYNUMBER': // only number value not dot value
                return 'number-pad';

            case 'ALPHANUMBERIC':
            default:
                return 'default';
        }
    }

    const setValues = (data: string) => {
        switch (props.validationType) {
            case "DASH":
                let dashvalues: string = CommonFunctions.getDashValues(data);
                if (dashvalues !== undefined) {
                    console.log("-------dashvalue----", dashvalues)
                    setInputValue(dashvalues);
                    props.callback(dashvalues);
                }

                break;
            default:
                dashvalues = data;
                setInputValue(dashvalues);
                props.callback(dashvalues);

        }


    }

    return (
        <View style={{ ...styles.textInputFieldWrapper, backgroundColor: props.isDisabled ? COLORS.appLightGray : COLORS.white }}>
            <Text style={{ ...styles.textInputLable }}>
                {props.lable}
                {props.isRequired ? <Text style={{ color: COLORS.red }}>* </Text> : ''}
            </Text>
            <TextInput
                keyboardType={getKeyboardType(props?.inputType, props)}
                autoCapitalize="none"
                style={{ ...styles.textInputContent }}
                maxLength={props.maxLength}
                editable={!props.isDisabled}
                selectTextOnFocus={props.selectTextOnFocus}
                placeholder=''
                value={inputValue}
                onChangeText={text => {
                    if (props.inputType == 'ALPHABETS') {
                        let text1 = text.replace(/[^a-zA-Z]/g, '')
                        setInputValue(text1);
                        props.callback(text1 !== undefined ? text1 : '');

                    }
                    else if (props.inputType == 'ALPHANUMBERIC') {
                        let text1 = text.replace(/[^a-zA-Z0-9]/g, '')
                        setInputValue(text1);
                        props.callback(text1 !== undefined ? text1 : '');
                    }
                    else if (props.inputType == 'ONLYNUMBER') {
                        let text1 = text.replace(/[^0-9]/g, '')
                        setInputValue(text1);
                        props.callback(text1 !== undefined ? text1 : '');
                    }
                    else
                        setValues(text);
                }}

            >

            </TextInput>

        </View>
    )
}
const PressableComponent = (props: PressableProps) => {
    return (
        <TouchableOpacity
            style={{ ...styles.PressableComponent, backgroundColor: props.isDisabled ? COLORS.appLightGray : props.backgroundColor, }}
            onPress={() => {
                props.callback(!props.isDisabled);
            }}
            disabled={props.isDisabled}
        >
            {props.iconAlignment == "justRight" ?
                <View style={{ justifyContent: 'center', flexDirection: 'row' }}>

                    <Text
                        style={{
                            color: props.isDisabled ? COLORS.black : props.textColor,
                            fontFamily: 'Poppins-Regular',
                            fontSize: 12,
                        }}>
                        {props.lable}
                    </Text>
                    {props.needtoShowIcon ?

                        <Image
                            source={Assets.EditIcon}
                            style={{ marginHorizontal: commonStyling._sideScreenSpacing }} /> : null}

                </View>
                :
                props.iconAlignment == "alignEnd" ?
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: "center" }}>
                            <Text
                                style={{
                                    alignSelf: "center",
                                    color: props.isDisabled ? COLORS.lightGray3 : props.textColor,
                                    fontFamily: 'Poppins-Regular',
                                    fontSize: 12,
                                }}>
                                {props.lable}
                            </Text>
                        </View>
                        {props.needtoShowIcon ?
                            <Image
                                source={Assets.EditIcon}
                                style={{ marginHorizontal: commonStyling._sideScreenSpacing, justifyContent: 'flex-end' }} />
                            : null}
                    </View> : null}

        </TouchableOpacity>
    );
};

const PickerComponent = (props: PickerProps) => {
    return (<View style={{ ...styles.pickerWrapper, backgroundColor: props.isDisabled ? COLORS.appLightGray : COLORS.white, }}>
        {props?.lable !== undefined ? (
            <Text style={styles.textInputLable}>
                {props.lable}
                {props.isRequired ? <Text style={{ color: COLORS.red }}>*</Text> : ""}
            </Text>
        ) : null}

        <ModalPicker
            data={props.data}
            cancelText="Cancel"
            backdropPressToClose={true}
            initValue="Select one Option!"
            animationType='fade'

            overlayStyle={{
                justifyContent: 'flex-end',
                paddingTop: 50,
                paddingBottom: 50

            }}
            disabled={props?.isDisabled ?? false}
            onChange={option => {
                props.callback(option?.label)
            }}>
            {props?.children}
        </ModalPicker>

    </View>
    )
}
const DatePickerComponent = (props: DatePickerProps) => {
    return (
        <View style={{ ...styles.pickerWrapper, backgroundColor: props.isDisabled ? COLORS.appLightGray : COLORS.white, }}>
            <Text style={styles.textInputLable}>
                {props.lable}
                {props.isRequired ? <Text style={{ color: COLORS.red }}>*</Text> : ""}
            </Text>

            <DatePicker
                style={{ background: 'red', width: '100%' }}
                date={props.date}
                showIcon={true}
                mode='date'
                placeholder="Select Date"
                format="DD-MM-YYYY"
                maxDate={props.maxDate}
                minDate={props.minDate}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateIcon: {
                        alignSelf: 'center',
                    },
                    dateInput: {
                        flex: 1,
                        alignItems: 'flex-start',
                        borderRadius: 5,
                        borderWidth: 0,
                    },
                    datePicker: {
                        backgroundColor: "red"
                    }
                }}
                onDateChange={date => {
                    props.callback(date);

                }}
            >
            </DatePicker>

        </View>
    )
}

const FieldGeneratorScreen = (props: any) => {
    switch (props.type) {
        case 'TEXT_INPUT':
            return (
                <EditTextComponent
                    lable={props?.lable}
                    placeholder={props?.placeholder}
                    value={props.value}
                    isRequired={props?.isRequired}
                    isDisabled={props?.isDisabled}
                    callback={(data: string) => props?.callBack(data)}
                    type={props?.type}
                    maxLength={props?.maxLength}
                    minLength={props?.minLenght}
                    validationType={props?.validationType}
                    selectTextOnFocus={props.selectTextOnFocus}
                    inputType={props?.inputType}

                />
            )

        case "Pressable":
            return (
                <PressableComponent
                    lable={props?.lable}
                    isDisabled={props?.isDisabled}
                    callback={(data: string) => props?.callBack(data)}
                    type={props?.type}
                    iconAlignment={props?.iconAlignment}
                    backgroundColor={props?.backgroundColor}
                    textColor={props?.textColor}
                    needtoShowIcon={props?.needtoShowIcon}
                />)
        case "picker":
            return (
                <PickerComponent
                    lable={props?.lable}
                    isDisabled={props?.isDisabled}
                    callback={(data: string) => props?.callBack(data)}
                    type={props?.type}
                    isRequired={props?.isRequired}
                    data={props?.data}
                    children={props?.children}
                    value={props?.value}
                    placeHolder={props?.placeHolder}
                />)

        case "Date_picker":
            return (
                <DatePickerComponent
                    lable={props?.lable}
                    isDisabled={props?.isDisabled}
                    callback={(data: string) => props?.callBack(data)}
                    type={props?.type}
                    isRequired={props?.isRequired}
                    maxDate={props?.maxDate}
                    minDate={props.minDate}
                    date={props?.date}
                />
            )

        default:
            return (
                <View />
            )

    }

}

export default FieldGeneratorScreen;

const styles = StyleSheet.create({
    textInputFieldWrapper: {
        flex: 1,
        marginHorizontal: commonStyling._sideScreenSpacing,
        marginTop: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.lightGrayColor,
        minHeight: commonStyling._fieldHeight,
    },

    pickerWrapper: {
        flex: 1,
        marginTop: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.lightGrayColor,
        minHeight: commonStyling._fieldHeight,
        justifyContent: 'center',
        marginHorizontal: commonStyling._sideScreenSpacing,
        paddingHorizontal: commonStyling._textLeftSpacing
    },
    PressableComponent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderRadius: 5,
        borderColor: COLORS.dimAppBlue,
        marginTop: 15,
        minHeight: commonStyling._fieldHeight,
        justifyContent: 'center',
        marginHorizontal: commonStyling._sideScreenSpacing,
        paddingHorizontal: commonStyling._textLeftSpacing
    },
    textInputLable: {
        position: 'absolute',
        top: -10,
        left: 5,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 4,
        fontFamily: 'Poppins-Regular',
        fontSize: commonStyling._fieldLable,
    },

    textInputContent: {
        color: COLORS.black,
        flex: 1,
        paddingTop: 1,
        justifyContent: 'center',
        paddingHorizontal: commonStyling._textLeftSpacing
    },
})