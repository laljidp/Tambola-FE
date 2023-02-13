import React, { useEffect, useState } from 'react'
import TicketsLists from './TicketLists';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, Container, styled } from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import axiosInstance, { endpoints } from '../../services/api.service'
import { useSnackbar } from '../../Hooks/useSnackbar'
import PageSpinner from '../UI/Spinner'
import { contestData } from '../../types/contests.types'

const ContestDetails: React.FC = (): React.ReactElement => {

  const [loading, setLoading] = useState(false)
  const [contest, setContest] = useState<contestData | null>(null)
  const { showError } = useSnackbar()
  const navigate = useNavigate()
  const { id: ID = '' } = useParams<{ id: string }>()

  const fetchContestDetails = async () => {
    setLoading(true)
    const resp = await axiosInstance.get(endpoints.contestDetails.concat(ID))
    const { success, message, data } = resp?.data
    if (success) {
      setContest(data)
    } else {
      showError(message || 'Bad request ! Please try again')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchContestDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container disableGutters>
      {loading && (
        <PageSpinner />
      )}
      {!loading && (
        <Title>
          <Button onClick={() => navigate(-1)}><ArrowBackIosIcon /></Button>
          <span className='t-name'>
            {contest?.name}
          </span>
          <Button color='primary' variant='outlined'>Join contest</Button>
        </Title>
      )}
      <TicketBody>
        <TicketsLists tickets={contest?.tickets || []} />
      </TicketBody>
    </Container>
  )
}

const Title = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  background: 'aliceblue',
  '.t-name': {
    fontSize: '20px',
    color: '#1e88e5',
    fontWeight: 'bold'
  }
})

const TicketBody = styled('div')({
  padding: '5px'
})

export default ContestDetails