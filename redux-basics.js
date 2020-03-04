const redux = require('redux');

const createStore = redux.createStore;

const initialState = {
    counter : 0
}

// Reducer
const rootReducer = (state = initialState, action) => {
    if(action.type === 'INC') {
        let counter = state.counter;
        counter++;
        updatedState = {
            ...state,
            counter:counter
        }
        return updatedState;
    }
    if(action.type === 'ADD') {
        const updatedState = {
            ...state,
            counter:state.counter + action.value
        }
        return updatedState;
    }
    return state;
};





// Store
const store = createStore(rootReducer);
// console.log(store.getState());
store.subscribe(() => {
    console.log('[Subsription]', store.getState());
})
// Dispatch action 

store.dispatch({type:'INC'});
store.dispatch({type:'ADD', value:10});

// console.log(store.getState());

// Subscription
