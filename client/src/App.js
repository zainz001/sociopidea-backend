
import React from 'react';
import { Container } from '@material-ui/core';
import Navbar from './componenets/navbar/navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PostDetails from './componenets/postdetails/PostDetails';
import Home from './componenets/home/home';

import Auth from './componenets/auth/auth';
const App = () => {
  const user =JSON.parse(localStorage.getItem('profile'));
  return (
    <BrowserRouter>
    <Container maxWidth="xl">
      <Navbar/>
      <Routes>
        <Route path="/" exact Component={()=><Navigate to="/posts" />} />
        <Route path="posts" exact Component={Home} />
        <Route path="posts/search" exact Component={Home} />
        <Route path="posts/:id" exact Component={PostDetails} />
        <Route path="/auth" exact Component={() => (!user ? <Auth/> : <Navigate to="/posts" />)} />
      </Routes>
      
      
    </Container>
    </BrowserRouter>
  );
}
export default App;