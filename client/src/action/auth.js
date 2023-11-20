import { AUTH } from '../containers/container'
import * as api from '../api/index.js';
//action creators
export const signin = (FormData, Navigate) => async (dispatch) => {

    try {
        const { data } = await api.signIn(FormData);
        dispatch({ type: AUTH, data });
        Navigate('/');
    } catch (error) {
        console.log(error);
        if (error.response) {
            console.error('Response Data:', error.response.data);
             return Promise.reject('Invalid email or password.');
        }
    }


}
export const signup = (FormData, Navigate) => async (dispatch) => {

    try {
        const { data } = await api.signUp(FormData);
        dispatch({ type: AUTH, data });


        Navigate('/')
    } catch (error) {
        console.log(error);
        if (error.response) {
            console.error('Response Data:', error.response.data);
        }
    }


} 