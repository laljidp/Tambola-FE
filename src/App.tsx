import React from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';
import HomePage from './components/Home';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import PrivateRoute from './PrivateRoute';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SignUp from './components/Signup';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/home' element={<PrivateRoute component={<HomePage />} />} />
    </Routes>
  );
}

export default App;
