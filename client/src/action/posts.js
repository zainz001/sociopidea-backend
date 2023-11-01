import {UPDATE,DELETE,FETCH_ALL,LIKE,CREATE} from '../containers/container'
import * as api from '../api';
//action creators

export const getPosts=()=> async (dispatch)=>{

try {
    //we are getting response from backend in this
    const {data} =await api.fetchPosts();
    dispatch ({type:FETCH_ALL,payload:data});

} catch (error) {
    console.log(error.message);
}
}

export const createpost=(post)=> async (dispatch)=>{

    try {
        //we are getting response from backend in this
        const {data} =await api.createpost(post);
        dispatch ({type:CREATE,payload:data});
    
    } catch (error) {
        console.log(error.message);
    }
    }
    
    export const updatepost=(id,post)=>async(dispatch)=>{

        try{
            const {data}=await api.updatepost(id,post)
            dispatch({type:UPDATE,payload:data})
        }
        catch(error){
            console.log(error);
        }
    }
    export const deletepost=(id)=>async(dispatch)=>{

        try{
            await api.deletepost(id)
            dispatch({type:DELETE,payload:id})
        }
        catch(error){
            console.log(error);
        }
    }
    export const likepost=(id)=>async(dispatch)=>{

        try{
            await api.likepost(id)
            dispatch({type:LIKE,payload:id})
        }
        catch(error){
            console.log(error);
        }
    }