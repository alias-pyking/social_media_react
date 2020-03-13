import * as actionTypes from './actionTypes';
import axios from 'axios';

const explorePostsLoadingStart = () =>{
    return {
        type:actionTypes.EXPLORE_POSTS_LOADING_START
    }
};

const explorePostsLoadingFail= (error) => {
    return {
        type:actionTypes.EXPLORE_POSTS_LOADING_FAIL,
        error:error
    }
};

const explorePostsLoadingSuccess = (posts) => {
    return {
        type: actionTypes.EXPLORE_POSTS_LOADING_SUCCESS,
        posts:posts
    }
};

export const loadExplorePosts = (token) => {
    return dispatch => {
        dispatch(explorePostsLoadingStart());
        const url = 'http://127.0.0.1:8000/api/explore/';
        const header = {
            headers:{'Authorization': `token ${token}`},
        };
        axios.get(url, header)
        .then((response) => {
            console.log(response.data);
            dispatch(explorePostsLoadingSuccess(response.data.results));
        })
        .catch((error) =>{
            console.log(error);
            dispatch(explorePostsLoadingFail(error));
        });
        

    }
};