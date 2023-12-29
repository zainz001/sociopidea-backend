import { UPDATE, DELETE, COMMENT,FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, START_LOADING, END_LOADING, LIKE, CREATE } from '../containers/container'
import * as api from '../api';
//action creators

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
  export const getPost = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
  
      const { data } = await api.fetchPost(id);
  
      dispatch({ type: FETCH_POST, payload: { post: data } });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  

  export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
  
      dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };


export const createpost = (post,navigate) => async (dispatch) => {

    try {
        //we are getting response from backend in this
        const { data } = await api.createpost(post);
        
        dispatch({ type: CREATE, payload: data });
        navigate(`/posts/${data._id}`)
    } catch (error) {
        console.log(error.message);
    }
};

export const updatepost = (id, post) => async (dispatch) => {

    try {
        const { data } = await api.updatepost(id, post)
        dispatch({ type: UPDATE, payload: data })
    }
    catch (error) {
        console.log(error);
    }
};
export const deletepost = (id) => async (dispatch) => {

    try {
        await api.deletepost(id)
        dispatch({ type: DELETE, payload: id })
    }
    catch (error) {
        console.log(error);
    }
};
export const likepost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));
console.log(user);
  try {
    const { data } = await api.likepost(id, user?.token);
    console.log(data);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);

    dispatch({ type: COMMENT, payload: data });

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};