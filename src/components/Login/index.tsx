import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../Copyright';
import { useNavigate } from 'react-router';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MuiTelInput, MuiTelInputInfo, matchIsValidTel } from 'mui-tel-input';
import { useAuth } from '../../Hooks/useAuth';
import { useSnackbar } from '../../Hooks/useSnackbar';

const theme = createTheme();

const SignIn = () => {

  const { showError, showSuccessMsg } = useSnackbar()
  const [payload, setPayload] = React.useState({
    phoneNo: '',
    otp: '',
    fullPhoneNumber: '',
    isPhoneValid: false
  })

  const [otp, setOpt] = React.useState('')
  const [verifyOTPMode, setVerifyOTPMode] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const navigate = useNavigate()
  const { signinViaPhone, verifyOTP, setLoggedInUser } = useAuth()

  const handleChangePhone = (value: string, info: MuiTelInputInfo) => {
    const number: string = info.nationalNumber || ''
    setPayload({
      ...payload,
      phoneNo: number,
      fullPhoneNumber: value,
      isPhoneValid: matchIsValidTel(value)
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (verifyOTPMode) {
      setIsSubmitting(true)
      try {
        const resp = await verifyOTP(payload.phoneNo, otp)
        const { success, message, user, token } = resp.data
        if (success) {   
          setLoggedInUser(user, token)       
          setIsSubmitting(false)
          navigate('/')
        } else {
          showError(message)
          setIsSubmitting(false)
        }
      } catch (err: any) {
        setIsSubmitting(false)
        const { data } = err.response
        showError(data?.error?.toString())
        console.log('data', data)
      }
      return
    }

    if (!payload.isPhoneValid) {
      showError('Please enter a valid phone number')
      return
    }

    // Call API to sign in
    try {
      setIsSubmitting(true)
      const resp = await signinViaPhone(payload.phoneNo, '+91') // supporting IN only for now
      const { success, message } = resp.data
      if (success) {
        // Go for OTP screen
        setVerifyOTPMode(true)
        setIsSubmitting(false)
        showSuccessMsg(message)
      } else {
        showError(message)
        setIsSubmitting(false)
        // show error message
      }
    } catch (err: any) {
      setIsSubmitting(false)
      const { error = '' } = err?.response?.data
      console.log('call API...', err)
      showError(error.toString())
    }
  };

  const { phoneNo, isPhoneValid } = payload

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
              placeholder={'Phone number'}
              defaultCountry='IN'
              helperText={!isPhoneValid && phoneNo.length > 0 ? 'Invalid Phone number' : ''}
              error={!isPhoneValid && phoneNo.length > 0}
              onChange={handleChangePhone}
              forceCallingCode              
              size='small'
              disabled={verifyOTPMode}
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
              disabled={isSubmitting}
            >
              {verifyOTPMode ? 'Verify OTP' : 'Sign In'}
            </Button>
            {verifyOTPMode && (
              <Button onClick={() => setVerifyOTPMode(false)}>
                <ArrowBackIosNewIcon />Back</Button>
            )}
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