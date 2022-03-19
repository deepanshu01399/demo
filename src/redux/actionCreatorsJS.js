import {Dispatch} from 'redux';
import networkApiHit from '../networkApi/UrlServices';
import {API_ENDPOINTS, BASE_URL} from '../static/Constants';
import {GETPERSONSLIST, PROGRESSBAR} from './actionTypes';

export const showProgressBar = () => {
  console.log('Showprogressbar');
  return async (dispatch, getState) => {
    dispatch({
      type: PROGRESSBAR,
      payload: {
        needToShowProgressBar: true,
        //2nd parameter
      },
    });
  };
};

export const hideProgressBar = () => {
  console.log('hide progressbar');
  return async (dispatch, getState) => {
    dispatch({
      type: PROGRESSBAR,
      payload: {
        needToShowProgressBar: false,
        //2nd parameter
      },
    });
  };
};

export const getPersonsList =  () => {
  return async (dispatch, getState) => {
    let url = BASE_URL + API_ENDPOINTS.USER_WITH_PAGINATION_LIMIt;
    await networkApiHit(url, 'GET', '')
      .then((response) =>
        {
        dispatch({
          type: GETPERSONSLIST,
          payload: {
            personLists: response?.data,
          },
        })
       // return response;
      }
      ).catch(error=>{
        console.log("error:==>",err)
      });
  };
};
