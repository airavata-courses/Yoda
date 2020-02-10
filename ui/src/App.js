import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import MainRouter from './MainRouter';
import {BrowserRouter} from 'react-router-dom'


const App = () => (

  <BrowserRouter>
    <MainRouter />
  </BrowserRouter>

)

export default App;
