import * as actionTypes from './actionTypes';

export const feedLoadingStart = () => {
    return {
        type:actionTypes.FEED_LOADING_START,
    }
};

export const feedLoadingSuccess = (posts) =>{
    return {
        type: actionTypes.FEED_LOADING_SUCCESS,
        posts:posts
    }
};

export const feedLoadingFailed = (error) =>{
    return {
        type: actionTypes.FEED_LOADING_SUCCESS,
        error : error
    }
}

export const loadFeed = () => {
    return dispatch => {
        dispatch(feedLoadingStart());
        let 
    }
}