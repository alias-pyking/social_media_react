import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart =() => {
    return {
        type: actionTypes.AUTH_START,
    }
};
export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId:userId,
    }
};

export const authFail = (error) => {
    return {
        type:actionTypes.AUTH_FAIL,
        error: error
    }
};
export const logoutStart = () => {
    return {
        type:actionTypes.LOGOUT_START,
    }
}
export const logoutSuccess = () => {
    return {
        type:actionTypes.LOGOUT_SUCCESS
    }
}
export const logoutFail = (error) =>{
    return {
        type:actionTypes.LOGOUT_FAIL,
        error:error
    }
}
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return {
        type:actionTypes.AUTH_LOGOUT
    }
};

export const auth = (username, email, password, isSignUp) => {
    return (dispatch) => {
        dispatch(authStart());
        let authData = {
            'content-type':'application/json',
            "username":username,
            "email":email,
            "password":password
        }
        let authUrl = 'http://127.0.0.1:8000/api/auth/register';
        if(!isSignUp) {
            authUrl = 'http://127.0.0.1:8000/api/auth/login';
            authData = {
                "username":username,
                "password":password
            }
        }
        axios.post(authUrl,authData)
        .then((response) =>{
            localStorage.setItem('token',response.data.token);
            localStorage.setItem('userId', response.data.user.id);
            dispatch(authSuccess(response.data.token, response.data.user.id));
        })
        .catch((error) => {
            console.log(error);
        });
    }
}
export const setAuthRedirect  = path => {
    return {
        type:actionTypes.SET_AUTH_REDIRECT,
        path:path
    }
}
export const authCheckState = () =>{
    return dispath => {
        const token = localStorage.getItem('token');
        if(!token) {
            logout();
        } else {
            const userId = localStorage.getItem('userId');
            dispath(authSuccess(token, userId));
        }
    }
}