import React from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';
import HomePage from './components/Home';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import PrivateRoute from './PrivateRoute';
import SignUp from './components/Signup';
import Contests from './components/Contests';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/home' element={<PrivateRoute component={<HomePage />} />} />
      <Route path='/contests' element={<PrivateRoute component={<Contests />} />} />
    </Routes>
  );
}

export default App;
