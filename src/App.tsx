import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import PrivateRoute from './PrivateRoute';
import SignUp from './components/Signup';
// import Contests from './components/Contests';
import './App.css';
import { Container } from '@mui/system';

const Contests = React.lazy(() => import('./components/Contests'))


function App() {
  return (
    <Container disableGutters>
      <Suspense fallback={'Loading....'}>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/' element={<PrivateRoute />}>
            <Route path='/contests' element={<Contests />} />
          </Route>
        </Routes>
      </Suspense>
    </Container>
  );
}

export default App;
