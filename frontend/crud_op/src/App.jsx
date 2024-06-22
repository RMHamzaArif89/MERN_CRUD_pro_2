import React from 'react'
import { useState } from 'react'
import './App.css'
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cards from './components/Cards'
import Form from './components/Form';
import Nav from './components/Nav'
import UpdateForm from './components/updateForm';
import Login from './components/Login';
import Logout from './components/Logout';
import Sign_up from './components/Sign_up';

function App() {


  return (
    <BrowserRouter>
   <Nav/>
   <Routes>
    
        <Route index element={<Cards />} />
        <Route path="cards" element={<Cards />} />
        <Route path="form" element={<Form />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Sign_up />} />
        <Route path="logout" element={<Logout />} />
        <Route path='/updateForm/:id' element={<UpdateForm />} />
    
        </Routes>
    
  </BrowserRouter>
  )
}

export default App
