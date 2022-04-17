import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from './Constants';

var LocalStorage = {

	isJsonParsable: (res:any) => {
		try {
			JSON.parse(res);
		} catch (e) {
			return false;
		}

		return true;
	},

	getFromLocal: async (key:string) => {
		if (key !== undefined && key!==null) {
			let res = await AsyncStorage.getItem(key);
			if (res !== undefined ) {
				return LocalStorage.isJsonParsable(res) ? JSON.parse(res??'') : res;
			} else {
				return null;
			}
		}
	},

	storeToLocal: async (key:any, value:any) => {
		if (key !== undefined && value !== undefined) {
			await AsyncStorage.setItem(
				key,
				value !== undefined && typeof value === 'string'
					? value
					: JSON.stringify(value)
			);
		}
	},

	removeFromLocal: async (key:any) => {
		if (key !== undefined && key !== null) {
			await AsyncStorage.removeItem(key);
		}
	},

	emptyLocalStorage: async () => {
		AsyncStorage.getAllKeys().then((keys) => {
				keys = keys.filter(
					(el) =>
						el !== STORAGE_KEY.IS_FIRST_TIME_APP_LAUNCHES 
				);
			
			AsyncStorage.multiRemove(keys);
		});
	},
};

export default LocalStorage;
