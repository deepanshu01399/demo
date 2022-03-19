import * as actions from '../actionTypes';

const initialState = {
  isLoading: false,
  error: '',
  personLists: [],
  personDetails: {},
  postList: [],
  commentList: [],
  userPostList:[],
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.PROGRESSBAR:
      return {
        ...state,
        isLoading: action.payload.needToShowProgressBar,
      };
    case actions.GETPERSONSLIST:
      return {
        ...state,
        personLists: action.payload.personLists,
        isLoading: false,
      };
    case actions.GETPERSONDETAILS:
      return {
        ...state,
        personDetail: action.payload.personDetail,
        isLoading: false,
      };
    case actions.GETPOSTLIST:
      return {
        ...state,
        postList: action.payload.postList,
        isLoading: false,
      };
      case actions.GETUSERSPOSTLIST:
      return {
        ...state,
        userPostList: action.payload.userPostList,
        isLoading: false,
      };
    case actions.GETCOMMENTS:
      return {
        ...state,
        commentList: action.payload.comments,
        isLoading: false,
      };
      case actions.RESETCOMMENT:
      return {
        ...state,
        commentList:[],
      };
    default:
      return state;
  }
};

export default commonReducer;
