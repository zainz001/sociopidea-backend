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
export const signup = (formData, Navigate) => async (dispatch) => {
    try {
      const { data } = await api.signUp(formData);
      dispatch({ type: AUTH, data });
      Navigate('/');
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === 'user already exists'
      ) {
        dispatch({ type: 'SIGNUP_ERROR', data: 'User already exists. Please log in.' });
      } else {
        dispatch({ type: 'SIGNUP_ERROR', data: 'Signup failed. Please try again later.' });
        console.error('Signup failed:', error);
      }
    }
  };