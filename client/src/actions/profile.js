import axios from 'axios';
import { setAlert } from './alert'

import {
    GET_PROFILE,
    PROFILE_ERROR
} from './types';


//  Get current user's profile
export const getCurrentProfile = () => async (dispatch) => {
    try {
        
        let response = await axios.get('/api/profile/mine');

        dispatch({
            type: GET_PROFILE,
            payload: response.data
        });

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.data.statusText, status: error.response.status }
        });
    }
};


//  Create or update a profile
export const createProfile = (profileData, history, edit = false) => async (dispatch) => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        let response = await axios.post('/api/profile/mine', profileData, config);

        dispatch({
            type: GET_PROFILE,
            payload: response.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        if(!edit){
            history.push('/dashboard');
        }

    } catch (error) {
        const errors = error.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.data.statusText, status: error.response.status }
        });
    }

}


// add experience
const addExperience = (formData, history) => async (dispatch) => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        let response = await axios.put('/api/profile/experience', profileData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: response.data
        });

        dispatch(setAlert('Experience Added.', 'success'));

        
        history.push('/dashboard');

    } catch (error) {
        const errors = error.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.data.statusText, status: error.response.status }
        });
    }

}


// add education
const addEducation = (formData, history) => async (dispatch) => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        let response = await axios.put('/api/profile/education', profileData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: response.data
        });

        dispatch(setAlert('Education Added.', 'success'));

        
        history.push('/dashboard');

    } catch (error) {
        const errors = error.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.data.statusText, status: error.response.status }
        });
    }

}