import axios from 'axios';
const url='http://localhost:5000/posts/post';
const urlcreate='http://localhost:5000/posts/create';
const urlupdate='http://localhost:5000/posts/update';
const urldelete='http://localhost:5000/posts/delete';
 
 const urlike='http://localhost:5000/posts/like';


export const fetchPosts =()=> axios.get(url);

export const createpost =(newPost)=> axios.post(urlcreate,newPost);
export const updatepost=(id,updatepost)=>axios.patch(`${urlupdate}/${id}`,updatepost);
export const deletepost=(id)=>axios.delete(`${urldelete}/${id}`) 
export const likepost=(id)=>axios.patch(`${urlike}/${id}`);