import * as actionTypes from './actionTypes';
import axios from 'axios';
const feedLoadingStart = () => {
    return {
        type:actionTypes.FEED_LOADING_START,
    }
};

const feedLoadingSuccess = (posts) =>{
    return {
        type: actionTypes.FEED_LOADING_SUCCESS,
        posts:posts
    }
};

const feedLoadingFailed = (error) =>{
    return {
        type: actionTypes.FEED_LOADING_FAIL,
        error : error
    }
}

export const loadFeed = (token) => {
    return dispatch => {
        dispatch(feedLoadingStart());
        const url = 'http://127.0.0.1:8000/api/home/';
        const header = {
            headers:{'Authorization': `token ${token}`},
        };
        axios.get(url, header)
        .then((response) => {
            console.log('ok im here');
            console.log(response.data);
            dispatch(feedLoadingSuccess(response.data.results));
        })
        .catch((error) =>{
            console.log(error);
            dispatch(feedLoadingFailed(error));
        });
        

    }
};