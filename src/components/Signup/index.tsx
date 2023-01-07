import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { matchIsValidTel, MuiTelInput, MuiTelInputInfo } from 'mui-tel-input'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useAuth } from '../../Hooks/useAuth';
import { useSnackbar } from '../../Hooks/useSnackbar';

const ValidationSchema = yup.object().shape({
  firstName: yup.string().required('Firstname is required').min(3, 'Firstname should be atleast 3 character'),
  lastName: yup.string().required('Lastname is required').min(2, 'Last name should be atleast 2 character')
})

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="">
        Tambola
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const SignUp: React.FC = (): React.ReactElement => {

  const [phoneNo, setPhoneNo] = useState({
    number: '',
    fullPhoneNumber: '',
    isValid: false
  })
  const [verifyOTPMode, setVerifyOTPMode] = useState(false)
  const [otp, setOtp] = useState('')
  const { signUp, verifyOTP, setLoggedInUser } = useAuth()
  const { showError } = useSnackbar()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: ''
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {


      if (verifyOTPMode) {
        //call API
        if (!otp.trim() || otp.trim().length !== 6) {
          showError('Invalid OTP !')
          return
        }
        const resp = await verifyOTP(phoneNo.number, otp)
        const { success, message, token, user } = resp.data
        if (success) {
          setLoggedInUser(user, token)
          navigate('/')
        } else {
          showError(message)
        }
        return
      }

      if (!phoneNo.isValid) {
        showError('Enter correct Phone number')
        return
      }
      
      const payload = {
        ...values,
        phoneNo: phoneNo.number,

      }
      const resp = await signUp(payload)
      const { success, message } = resp.data
      if (success) {
        setVerifyOTPMode(true)
      } else {
        showError(message)
      }
    }
  })

  const handleChangePhone = (value: string, info: MuiTelInputInfo) => {
    const number: string = info.nationalNumber || ''
    setPhoneNo({
      ...phoneNo,
      number: number,
      fullPhoneNumber: value,
      isValid: matchIsValidTel(value)
    })
  }

  const { values, errors, touched } = formik

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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="firstName"
                  size='small'
                  required
                  disabled={verifyOTPMode}
                  onChange={formik.handleChange}
                  value={values.firstName}
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={(touched.firstName && Boolean(errors.firstName))}
                  helperText={touched.firstName && errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  disabled={verifyOTPMode}
                  id="lastName"
                  onChange={formik.handleChange}
                  size='small'
                  value={values.lastName}
                  label="Last Name"
                  name="lastName"
                  error={(touched.lastName && Boolean(errors.lastName))}
                  helperText={touched.lastName && errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <MuiTelInput
                  onlyCountries={['IN']}
                  sx={{ width: '100%' }}
                  value={phoneNo.fullPhoneNumber}
                  defaultCountry='IN'
                  placeholder='Phone number *'
                  onChange={handleChangePhone}
                  forceCallingCode
                  disabled={verifyOTPMode}
                  size='small'
                  error={formik.submitCount > 0 && !phoneNo.isValid}
                  helperText={formik.submitCount > 0 && !phoneNo.isValid ? 'Invalid phone number' : ''}
                />
              </Grid>
              {verifyOTPMode && (
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    id="otp"
                    onChange={({ currentTarget }) => setOtp(currentTarget.value)}
                    size='small'
                    value={otp}
                    label="OTP"
                    type='number'
                    name="otp"
                  />
                </Grid>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignUp