import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import PrivateRoute from './PrivateRoute';
import SignUp from './components/Signup';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Container } from '@mui/system';
import { useSnackbar } from './Hooks/useSnackbar';
import PageSpinner from './components/UI/Spinner';
import './App.css';

const LogoutPage = React.lazy(() => import('./components/Logout'))
const Contests = React.lazy(() => import('./components/Contests'))

function App() {

  const {snackbar, hideSnackbar} = useSnackbar()

  return (
    <Container disableGutters>
      <Suspense fallback={<PageSpinner />}>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/logout' element={<LogoutPage />} />
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
        <Alert onClose={hideSnackbar} severity={snackbar.type} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
