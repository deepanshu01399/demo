import {Alert} from 'react-native';
import Constants from '../static/Constants';

const networkApiHit = async (
  url: string,
  method: string,
  dataToServer: any,
) => {
  let request = {};

  let headers = new Headers({
    'app-id': '61ecbcadcb293383d58dbafc',
  });

  switch (method) {
    case 'GET':
      request = {
        method: method,
        headers: headers,
      };
      break;
    case 'POST':
    case 'PUT':
    case 'DELETE':
      request = {
        method: method,
        headers: headers,
        body:
          dataToServer instanceof FormData
            ? dataToServer
            : JSON.stringify(dataToServer),
      };
      break;
  }
  console.log('request', request);
  let response: any = await fetch(url, request).then(res => {
    if (!res.ok) checkStatusCode(res);
    else return res.json();
  });

  return response;
};

const checkStatusCode = (res: any) => {
  Alert.alert(res.status + ' error !', 'error msg');
  return res.json();
};

export default networkApiHit;

// let HeaderData1 = new Headers({
//     ClientVersion: Constants.CLINET_VERSION,
//     AcceptLanguage: Constants.HEADER_LANGUAGAE,
//     Accept:
//       dataToServer instanceof FormData
//         ? 'application/x-www-form-urlencoded'
//         : 'application/json',
//     'Content-type':
//       dataToServer instanceof FormData
//         ? 'application/x-www-form-urlencoded'
//         : 'application/json',
//   });
