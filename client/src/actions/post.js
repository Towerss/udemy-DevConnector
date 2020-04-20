import axios from 'axios';
import { setAlert } from './alert';
import { 
    GET_POSTS, 
    GET_POST,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST
 } from './types';

//  Get all posts
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
export const addPost = (formData) => async (dispatch) => {

    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const response = await axios.post('/api/posts', formData, config);

        dispatch({
            type: ADD_POST,
            payload: response.data
        })

        dispatch(setAlert('Post Created','success'));

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.data.statusText, status: error.response.status }
        })
    }

}


//  Delete post
export const deletePost = (id) => async (dispatch) => {

    try {
        
        await axios.delete(`/api/posts/${id}`);

        dispatch({  
            type: DELETE_POST,
            payload: id
        });

        dispatch(setAlert('Post Deleted','success'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.data.statusText, status: error.response.status }
        })
    }

}


//  Add like
export const addLike = (id) => async (dispatch) => {

    try {
        const response = await axios.put(`/api/posts/like/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id , likes: response.data }
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.data.statusText, status: error.response.status }
        })
    }
}


//  Remove like
export const removeLike = (id) => async (dispatch) => {

    try {
        const response = await axios.put(`/api/posts/unlike/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id , likes: response.data }
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.data.statusText, status: error.response.status }
        })
    }

}

//  Get a single post
export const getPost = (id) => async (dispatch) => {

    try {
        const response = await axios.get(`/api/posts/${id}`);

        dispatch({
            type: GET_POST,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.data.statusText, status: error.response.status }
        })
    }

}


//  Add Comment
export const addComment = (formData) => async (dispatch) => {

    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        // const response = await axios.post('/api/posts', formData, config);

        // dispatch({
        //     type: ADD_POST,
        //     payload: response.data
        // })

        // dispatch(setAlert('Post Created','success'));

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.data.statusText, status: error.response.status }
        })
    }

}


//  Delete comment  
export const deleteComment = (id) => async (dispatch) => {

    try {
        
        // await axios.delete(`/api/posts/${id}`);

        // dispatch({  
        //     type: DELETE_POST,
        //     payload: id
        // });

        // dispatch(setAlert('Post Deleted','success'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.data.statusText, status: error.response.status }
        })
    }

}