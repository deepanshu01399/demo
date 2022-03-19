import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SplashScreen from "../screens/SplashScreen";
import { FILE_NAMES } from '../static/Constants';

const SplashStack=()=>{
    const Stack = createNativeStackNavigator();
    return(
        <Stack.Navigator>
            <Stack.Screen  component={SplashScreen} name={FILE_NAMES.SPLASH_SCREEN} options={{headerShown:false}}/>
        </Stack.Navigator>
    )

}
export default SplashStack;