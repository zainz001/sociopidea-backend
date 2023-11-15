import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000' });
//const APIsign =  'http://localhost:5000/user/signup' ;
const urlcreate = 'http://localhost:5000/posts/create';
const urlupdate = 'http://localhost:5000/posts/update';
const urldelete = 'http://localhost:5000/posts/delete';

const urlike = 'http://localhost:5000/posts/like';

API.interceptors.request.use((req)=>{
if(localStorage.getItem('profile')){
    req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('prfile')).token}`;
}
return req;
});
export const fetchPosts = () => API.get('/posts/post');

export const createpost = (newPost) => API.post(urlcreate, newPost);
export const updatepost = (id, updatepost) => API.patch(`${urlupdate}/${id}`, updatepost);
export const deletepost = (id) => API.delete(`${urldelete}/${id}`)
export const likepost = (id) => API.patch(`${urlike}/${id}`);

export const signin = (FormData) => API.post('/user/signin', FormData);

export const signup = (FormData) => API.post('user/signup', FormData);