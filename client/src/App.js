
import React from 'react';
import { Container } from '@material-ui/core';
import Navbar from './componenets/navbar/navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './componenets/home/home';
import Auth from './componenets/auth/auth';
const App = () => {
  
  return (
    <BrowserRouter>
    <Container maxWidth="lg">
      <Navbar/>
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/auth" exact Component={Auth} />
      </Routes>
      
      
    </Container>
    </BrowserRouter>
  );
}
export default App;