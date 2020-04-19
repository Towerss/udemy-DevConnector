import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, POST_ERROR } from './types';

//  Get posts
export const getPosts = () => async (dispatch) => {

    try {
        const response = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.data.statusText, status: error.response.status }
        })
    }

}

//  Add post
export const addPost = () => async (dispatch) => {

    try {
        // const response = await axios.get('/api/posts');

        // dispatch({
        //     type: GET_POSTS,
        //     payload: response.data
        // })
    } catch (error) {
        // dispatch({
        //     type: POST_ERROR,
        //     payload: { msg: error.response.data.statusText, status: error.response.status }
        // })
    }

}


//  Delete post
export const deletePost = () => async (dispatch) => {

    try {
        // const response = await axios.get('/api/posts');

        // dispatch({
        //     type: GET_POSTS,
        //     payload: response.data
        // })
    } catch (error) {
        // dispatch({
        //     type: POST_ERROR,
        //     payload: { msg: error.response.data.statusText, status: error.response.status }
        // })
    }

}


//  Add like
export const addLike = () => async (dispatch) => {

    try {
        // const response = await axios.get('/api/posts');

        // dispatch({
        //     type: GET_POSTS,
        //     payload: response.data
        // })
    } catch (error) {
        // dispatch({
        //     type: POST_ERROR,
        //     payload: { msg: error.response.data.statusText, status: error.response.status }
        // })
    }

}


//  Remove like
export const removeLike = () => async (dispatch) => {

    try {
        // const response = await axios.get('/api/posts');

        // dispatch({
        //     type: GET_POSTS,
        //     payload: response.data
        // })
    } catch (error) {
        // dispatch({
        //     type: POST_ERROR,
        //     payload: { msg: error.response.data.statusText, status: error.response.status }
        // })
    }

}