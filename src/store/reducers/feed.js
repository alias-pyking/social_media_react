import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';
const initialState = {
    posts:[],
    loading:true,
    error:null
}
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FEED_LOADING_START: return updateObject(state,{loading:true});
        case actionTypes.FEED_LOADING_SUCCESS: return updateObject(state, {posts:action.posts, loading:false});
        case actionTypes.FEED_LOADING_FAIL: return updateObject(state,{loading:false, error:action.error})
        default: return state;
    }
};
export default reducer;