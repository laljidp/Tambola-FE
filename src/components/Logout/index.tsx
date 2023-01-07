import Container from '@mui/material/Container'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../../Hooks/useAuth'
import PageSpinner from '../UI/Spinner'

const LogoutPage = () => {
  const { signout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    signout()
    setTimeout(() => {
      navigate('/login', { replace: true })
    }, 1500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container disableGutters sx={{ height: '100vh' }}>
      <PageSpinner />
    </Container>
  )
}

export default LogoutPage