import * as actionTypes from './actionTypes';
import axios from '../../axios-insta';
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
const loadingProfilePostsSuccess = (posts, prev, next, page) =>{
    return {
        type: actionTypes.PROFILE_POSTS_LOADING_SUCCESS,
        posts:posts,
        prev: prev,
        next: next,
        page: page
    }
};

export const loadProfile = (token) => {
    return dispatch =>{
        dispatch(loadingProfileStart());
        const profileUrl = 'profile';
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
export const loadProfilePosts = (userId, token, page) =>{
    return dispatch => {
        dispatch(loadingProfilePostsStart());
        const postsUrl = 'auth/accounts/'+userId+'/posts';
        const headers = {
            headers :{
                Authorization:`token ${token}`,
            }
        }
        axios.get(postsUrl,headers)
        .then(response =>{
            const {results, previous, next} = response.data;
            dispatch(loadingProfilePostsSuccess(results, previous, next, page));
        })
        .catch(error =>{
            console.log(error);
            dispatch(loadingProfilePostsFail(error));
        });
    }
}
