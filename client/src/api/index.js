import axios from 'axios';
const url='http://localhost:5000/postsmessage';

export const fetchPosts =()=> axios.get(url);

export const createpost =(newPost)=> axios.post(url,newPost);
export const updatepost=(id,updatepost)=>axios.patch(`${url}/${id}`,updatepost);