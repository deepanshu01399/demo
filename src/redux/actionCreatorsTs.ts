import {Dispatch} from 'redux';
import networkApiHit from '../networkApi/UrlServices';
import Constants, {API_ENDPOINTS, BASE_URL, FILE_NAMES} from '../static/Constants';
import { GETCOMMENTS, GETPERSONDETAILS, GETPERSONSLIST, GETPOSTLIST, GETUSERSPOSTLIST, PROGRESSBAR} from './actionTypes';
import * as RootNavigation from "../navigation/RootNavigation"

export const showProgressBar = () => {
  console.log('Showprogressbar');
  return async (dispatch: any, getState: any) => {
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
  return async (dispatch: any, getState: any) => {
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
  return async (dispatch: any, getState: any) => {
    let url = BASE_URL + API_ENDPOINTS.USER_WITH_PAGINATION_LIMIt;
    await networkApiHit(url, 'GET', '')
      .then(response =>{
        dispatch({
          type: GETPERSONSLIST,
          payload: {
            personLists: response,
          },
        });
        //return response;
      }
      );
  };
};

export const getPersonDetail =  (id:Number) => {
  return async (dispatch: any, getState: any) => {
    let url = BASE_URL + API_ENDPOINTS.GET_USER_DETAIL+id;
    await networkApiHit(url, 'GET', '')
      .then(response =>{
        RootNavigation.navigate(FILE_NAMES.PERSONDETAIL_SCREEN)
        dispatch({
          type: GETPERSONDETAILS,
          payload: {
            personDetail: response,
          },
        });
        //return response;
      }
      );
  };
};

export const getPostList =  (pageNo:Number) => {
  return async (dispatch: any, getState: any) => {
    let url = BASE_URL + API_ENDPOINTS.GET_POST_LIST+pageNo;
    await networkApiHit(url, 'GET', '')
      .then(response =>{
        dispatch({
          type: GETPOSTLIST,
          payload: {
            postList: response,
          },
        });
        //return response;
      }
      );
  };
};

export const getUserList =  (id:Number,pageNo:Number) => {
  return async (dispatch: any, getState: any) => {
    let url = BASE_URL+'user/'+id+"/" +API_ENDPOINTS.GET_POST_LIST+pageNo;
    await networkApiHit(url, 'GET', '')
      .then(response =>{
       // RootNavigation.push(FILE_NAMES.POSTLIST_SCREEN,{callFor:"UserPost"});
        dispatch({
          type: GETUSERSPOSTLIST,
          payload: {
            userPostList: response,
          },
        });
      }
      );
  };
};


export const getCommentList =  (id:Number) => {
  return async (dispatch: any, getState: any) => {
    let url = BASE_URL + `post/${id}/comment?limit=10`;
    await networkApiHit(url, 'GET', '')
      .then(response =>{
        console.log("response====>",response)
        dispatch({
          type: GETCOMMENTS,
          payload: {
            comments: response,
          },
        });
        //return response;
      }
      );
  };
};

