import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import PrivateRoute from './PrivateRoute';
import SignUp from './components/Signup';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// import Contests from './components/Contests';
import './App.css';
import { Container } from '@mui/system';
import { useSnackbar } from './Hooks/useSnackbar';

const Contests = React.lazy(() => import('./components/Contests'))


function App() {

  const {snackbar, hideSnackbar} = useSnackbar()

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
      <Snackbar
        open={snackbar.show}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={hideSnackbar}
        message={snackbar.message}
      >
        <Alert onClose={hideSnackbar} severity="error" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
