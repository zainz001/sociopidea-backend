import { AUTH } from '../containers/container'
import * as api from '../api/index.js';
//action creators
export const signin = (formData, Navigate) => async (dispatch) => {

    try {
        const { data } = await api.signin(formData);
        dispatch({ type: AUTH, data });
        Navigate('/');
    } catch (error) {
        console.log(error);
    }


}
export const signup = (formData, Navigate) => async (dispatch) => {

    try {
        const { data } = await api.signup(formData);
        dispatch({ type: AUTH, data });


        Navigate('/')
    } catch (error) {
        console.log(error);
    }


} 