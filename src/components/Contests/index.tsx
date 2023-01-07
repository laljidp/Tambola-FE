import React, { useEffect, useState } from 'react'
import { Container } from '@mui/system'
import { styled } from '@mui/system'
import axiosInstance, { endpoints } from '../../services/api.service'
import PageSpinner from '../UI/Spinner'
import Divider from '@mui/material/Divider/Divider'

const ContestCard = styled('div')({
  borderRadius: '10px',
  margin: '8px 10px',
  padding: '15px 10px',
  border: '1px solid #d4d0d0',
  '& .contest-card-top, .contest-card-bottom': {
    display: 'flex',
    justifyContent: 'space-between'
  }

})


const Contests: React.FC = (): React.ReactElement => {

  const [loading, setLoading] = useState(false)
  const [contests, setContesets] = useState([])

  const getContests = async () => {
    setLoading(true)
    const resp = await axiosInstance.get(endpoints.getActiveContest)
    const { data = [] } = resp.data
    setContesets(data)
    setLoading(false)
  }

  useEffect(() => {
    // Call API
    getContests()
  }, [])

  if (loading) return <PageSpinner />


  return (
    <Container disableGutters>
      {contests.map((contest: any) => (
        <ContestCard key={contest._id}>
          <div className='contest-card-top'>
            <h5>{contest?.name}</h5>
            <span><b>{contest.joiningAmount}₹</b></span>
          </div>
          <Divider />
          <div className='contest-card-bottom'>
            <span>Participants: {contest.maxParticipants}</span>
            <span>Price Pool: <b>{contest.maxParticipants * contest.joiningAmount / 2}₹</b></span>
          </div>
        </ContestCard>
      ))}
    </Container>
  )
}

export default Contests