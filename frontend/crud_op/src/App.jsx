import React from 'react'
import { useState } from 'react'
import './App.css'
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cards from './components/Cards'
import Form from './components/Form';
import Nav from './components/Nav'

function App() {


  return (
    <BrowserRouter>
   <Nav/>
   <Routes>
    
        <Route index element={<Cards />} />
        <Route path="cards" element={<Cards />} />
        <Route path="form" element={<Form />} />
    
        </Routes>
    
  </BrowserRouter>
  )
}

export default App
