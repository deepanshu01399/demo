import * as React from 'react';
import { createNavigationContainerRef, NavigationContainerRef, StackActions } from '@react-navigation/native';


//export const navigationRef = createNavigationContainerRef();
export const navigationRef = React.createRef<any>();

export function getCurrentRouteName() {
	console.log("currentRouteName----------",navigationRef?.current)
	return navigationRef?.current?.getCurrentRoute()?.name;
}

export function navigate(name: string, params = {}) {
	console.log("navigation navigate =-------------",navigationRef?.current)
	navigationRef?.current?.navigate(name, params);
}
export function push(name: string, params = {}) {
	console.log("navigation push ==-----------",navigationRef?.current)
	navigationRef?.current?.dispatch(StackActions.push(name,params));
}
