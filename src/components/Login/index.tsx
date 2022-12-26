import * as React from 'react';
import { useNavigate } from 'react-router';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../Copyright';
import { MuiTelInput, MuiTelInputInfo, matchIsValidTel } from 'mui-tel-input';
import { useAuth } from '../../Hooks/useAuth';
import { Alert, TextField } from '@mui/material';


const theme = createTheme();

const SignIn = () => {

  const [payload, setPayload] = React.useState({
    phoneNo: '',
    otp: '',
    fullPhoneNumber: '',
    isPhoneValid: false
  })

  const [otp, setOpt] = React.useState('')
  const [verifyOTPMode, setVerifyOTPMode] = React.useState(false)
  const [showErrorAlert, setShowErrorAlert] = React.useState('')
  const navigate = useNavigate()
  const { signinViaPhone, verifyOTP, setUser, setAccessToken, setIsAuthenticated } = useAuth()

  const handleChangePhone = (value: string, info: MuiTelInputInfo) => {
    const number: string = info.nationalNumber || ''
    setPayload({
      ...payload,
      phoneNo: number,
      fullPhoneNumber: value,
      isPhoneValid: matchIsValidTel(value)
    })
    setShowErrorAlert('')
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (verifyOTPMode) {
      const resp = await verifyOTP(payload.phoneNo, otp)
      const { success, message, user, token } = resp.data
      if (success) {
        setUser(user)
        setIsAuthenticated(true)
        setAccessToken(token)
        navigate('/')
      } else {
        setShowErrorAlert(message)
      }
      return
    }


    if (!payload.isPhoneValid) {
      setShowErrorAlert('Please enter a valid phone number')
      return
    }

    // Call API to sign in
    try {
      const resp = await signinViaPhone(payload.phoneNo, '+91') // supporting IN only for now
      const { success, message } = resp.data
      if (success) {
        // Go for OTP screen
        setVerifyOTPMode(true)
      } else {
        setShowErrorAlert(message)
        // show error message
      }
    } catch (err: any) {
      const { error = '' } = err?.response?.data
      console.log('call API...', err)
      setShowErrorAlert(error.toString())
    }
  };

  const { phoneNo, isPhoneValid } = payload

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {showErrorAlert && <Alert variant="filled" severity="error">{showErrorAlert}</Alert>}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <MuiTelInput
              onlyCountries={['IN']}
              sx={{ width: '100%' }}
              value={payload.fullPhoneNumber}
              defaultCountry='IN'
              helperText={!isPhoneValid && phoneNo.length > 0 ? 'Invalid Phone number' : ''}
              error={!isPhoneValid && phoneNo.length > 0}
              onChange={handleChangePhone}
              forceCallingCode

              size='small'
            />

            {verifyOTPMode && (
              <TextField
                sx={{ marginTop: '25px' }}
                placeholder='Enter OTP'
                type='number'
                name='otp'
                variant="standard"
                onChange={({ currentTarget }) => { setOpt(currentTarget.value) }}
              />
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {verifyOTPMode ? 'Verify OTP' : 'Sign In'}
            </Button>
            {!verifyOTPMode && (
              <>
                <p>OR (Create Account)</p>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color='secondary'
                  onClick={() => navigate('/signup')}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign up
                </Button>
              </>
            )}

          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignIn