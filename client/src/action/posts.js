import * as api from '../api';
//action creators

export const getPosts=()=> async (dispatch)=>{

try {
    //we are getting response from backend in this
    const {data} =await api.fetchPosts();
    dispatch ({type:'FETCH_ALL',payload:data});

} catch (error) {
    console.log(error.message);
}
}

export const createpost=(post)=> async (dispatch)=>{

    try {
        //we are getting response from backend in this
        const {data} =await api.createpost(post);
        dispatch ({type:'CREATE',payload:data});
    
    } catch (error) {
        console.log(error.message);
    }
    }
    
    