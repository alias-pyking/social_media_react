import * as actionTypes from './actionTypes';
import axios from 'axios';
const loadingProfileStart = () =>{
    return {
        type:actionTypes.PROFILE_LOADING_START,
    }
};
const loadingProfileFail = (error) =>{
    return {
        type:actionTypes.PROFILE_LOADING_FAIL,
        error:error
    }
};
const loadingProfileSuccess = (profile) =>{
    return {
        type:actionTypes.PROFILE_LOADING_SUCCESS,
        profile:profile
    }
};

const loadingProfilePostsStart = () =>{
    return {
        type:actionTypes.PROFILE_POSTS_LOADING_START,
    }
};

const loadingProfilePostsFail = (error) => {
    return {
        type: actionTypes.PROFILE_POSTS_LOADING_FAIL,
        error:error
    }
};
const loadingProfilePostsSuccess = (posts) =>{
    return {
        type: actionTypes.PROFILE_POSTS_LOADING_SUCCESS,
        posts:posts
    }
};

export const loadProfile = (token) => {
    return dispatch =>{
        dispatch(loadingProfileStart());
        const url = 'http://127.0.0.1:8000/api';
        const profileUrl = url+'/profile';
        const headers = {
            headers :{
                Authorization:`token ${token}`,
            }
        }
        axios.get(profileUrl,headers)
        .then(response =>{
            console.log(response.data);
            dispatch(loadingProfileSuccess(response.data));
        })
        .catch(error =>{
            console.log(error);
            dispatch(loadingProfileFail(error));
        });
    }
}
export const loadProfilePosts = (userId, token) =>{
    return dispatch => {
        dispatch(loadingProfilePostsStart());
        const url = 'http://127.0.0.1:8000/api';
        const postsUrl = url+'/auth/accounts/'+userId+'/posts';
        const headers = {
            headers :{
                Authorization:`token ${token}`,
            }
        }
        axios.get(postsUrl,headers)
        .then(response =>{
            console.log(response.data);
            dispatch(loadingProfilePostsSuccess(response.data.results));
        })
        .catch(error =>{
            console.log(error);
            dispatch(loadingProfilePostsFail(error));
        });
    }
}
