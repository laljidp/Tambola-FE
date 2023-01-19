import React, { useEffect, useState } from 'react'
import { Container } from '@mui/system'
import axiosInstance, { endpoints } from '../../services/api.service'
import PageSpinner from '../UI/Spinner'
import Contest from './Contest'
import { useNavigate } from 'react-router'


const Contests: React.FC = (): React.ReactElement => {

  const [loading, setLoading] = useState(false)
  const [contests, setContesets] = useState([])
  const navigate = useNavigate()
  const getContests = async () => {
    setLoading(true)
    const resp = await axiosInstance.get(endpoints.getActiveContest)
    const { data = [] } = resp.data
    setContesets(data)
    setLoading(false)
  }

  const handleNavigate = (id: string) => {
    navigate(`/contests/${id}`)
  }

  useEffect(() => {
    // Call API
    getContests()
  }, [])

  if (loading) return <PageSpinner />


  return (
    <Container disableGutters>
      {contests.map((contest: any) => (
        <Contest contest={contest} key={contest._id} handleClick={handleNavigate} />
      ))}
    </Container>
  )
}

export default Contests