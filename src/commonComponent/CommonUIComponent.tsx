import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,

} from 'react-native';
import { COLORS } from '../resources/theme';

interface HeaderComponent{
    label:string,
    textColor?:string,

}

interface NormalTextComponent{
    label:string,
    textColor?:string,
    fontSize?:number

}

interface CardComponent{
    children:any
    backgroundColor?:string;
    borderColor?:string;

}

const HeaderComponent=(props:HeaderComponent)=>{
    return(
        <Text style={{...styles.headerStyle,color:props.textColor}}>{props.label}</Text>
    )

}
const NormalTextComponent=(props:NormalTextComponent)=>{
    return(
        <Text style={{...styles.textStyle,color:props.textColor,fontSize:props.fontSize}}>{props.label+""}</Text>
    )

}


const CardComponent=(props:CardComponent)=>{
    return(
        <View  style={{backgroundColor:props.backgroundColor,padding:10,borderRadius:5,
            borderColor:props.borderColor,borderWidth:2,}}>
            {props.children}
            {console.log(props)}
        </View>
    )

}
const CommonUIComponent=(props:any)=>{
    switch(props.type){
        case "headerText":
        return(
            <HeaderComponent
            label={props?.label}
            textColor={props?.textColor}
            />
        )
        case "normalText":
            return(
                <NormalTextComponent
                label={props?.label}
                textColor={props?.textColor}
                fontSize={props?.fontSize}

                />
            )
            case "cardComponent":
            return(
                <CardComponent
                backgroundColor={props?.backgroundColor}
                children={props?.children}
                borderColor={props?.borderColor}
                />
            )
        default:
            return <View></View>
    }
   
}

export default CommonUIComponent;

const styles = StyleSheet.create({
    constainerStyle: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'white',
      marginVertical: 3,
      borderRadius: 10,
    },
    headerStyle: { flex: 1, color: 'black', fontWeight: '700', fontSize: 20, alignSelf: "center", marginVertical: 15 },
    textStyle: {color: 'black', fontWeight: '400', fontSize: 14,  }

  });