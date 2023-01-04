import React, { useEffect } from "react";
import { useNavigate } from 'react-router';
import { Container } from "@mui/material";
import { getMyProfile } from "../../services/Apicall.service";
import PageSpinner from "../UI/Spinner";

const LandingPage: React.FC = (): React.ReactElement => {

  const navigate = useNavigate()

  const checkProfile = async () => {
    try {
      const resp = await getMyProfile()
      const { success } = resp.data
      if (success) {
        navigate('/contests')
      } else {
        navigate('/login')
      }
    } catch (err: any) {
        console.log('err', err)
        const { status } = err?.response
        if(status === 401) {
          navigate('/login')
        }
    }
  }

  useEffect(() => {
    checkProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container disableGutters sx={{ height: '100vh' }}>
      <PageSpinner />
    </Container>
  )
}



export default LandingPage