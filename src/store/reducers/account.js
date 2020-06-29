import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const  initialState = {
    profile:null,
    profileLoading:true,
    posts:[],
    prev: null,
    next: null,
    page: 1,
    profilePostsLoading:true,
    error:null,
}
const reducer = (state = initialState, action) =>{
    switch(action.type) {
        case actionTypes.PROFILE_LOADING_START: 
            return updateObject(state,{profileLoading:true});
        case actionTypes.PROFILE_LOADING_FAIL: 
            return updateObject(state, {error:action.error, profileLoading:false});
        case actionTypes.PROFILE_LOADING_SUCCESS: 
            return updateObject(state, {profileLoading:false,profile:action.profile});
        case actionTypes.PROFILE_POSTS_LOADING_START: 
            return updateObject(state, {profilePostsLoading:true});
        case actionTypes.PROFILE_POSTS_LOADING_FAIL:
            return updateObject(state, {profilePostsLoading:false,error:action.error});
        case actionTypes.PROFILE_POSTS_LOADING_SUCCESS:
            return updateObject(state, {profilePostsLoading:false, posts:action.posts, prev:action.prev, next: action.next, page:action.page});
        default:
            return state;
    }
}
export default reducer;