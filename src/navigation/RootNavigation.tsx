import * as React from 'react';

export const navigationRef = React.createRef();

export function getCurrentRouteName() {
	return navigationRef?.current?.getCurrentRoute()?.name;
}

export function navigate(name: string, params = {}) {
	navigationRef?.current?.navigate(name, params);
}
export function push(name: string, params = {}) {
	navigationRef?.current?.push(name, params);
}
