import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000' });
// const APIsign =  'http://localhost:5000/user/signup' ;
// const APIsignin =  'http://localhost:5000/user/signin' ;
const urldetail = 'http://localhost:5000/posts/post'
const urlcreate = 'http://localhost:5000/posts/create';
const urlupdate = 'http://localhost:5000/posts/update';
const urldelete = 'http://localhost:5000/posts/delete';

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});
export const fetchPost = (id) => API.get(`${urldetail}/${id}`);
export const fetchPosts = (page) => API.get(`/posts/post?page=${page}`);
export const fetchPostsBySearch=(searchQuery)=>API.get(`/posts/search?searchQuery=${searchQuery.search|| 'none'}&tags=${searchQuery.tags}`);
export const createpost = (newPost) => API.post(urlcreate, newPost);
export const updatepost = (id, updatepost) => API.patch(`/${urlupdate}/${id}`, updatepost);
export const deletepost = (id) => API.delete(`${urldelete}/${id}`)
export const likepost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value,id) => API.post(`/posts/comment/${id}`,{value});

export const signIn = (FormData) => API.post('/user/signin', FormData);

export const signUp = (FormData) => API.post('/user/signup', FormData);