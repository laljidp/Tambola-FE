import { Divider } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

interface ContestProps {
  contest: {
    _id: string
    name: string
    joiningAmount: number
    maxParticipants: number
  }
  handleClick: (id: string) => void
}

const Contest: React.FC<ContestProps> = ({ contest, handleClick }): React.ReactElement => {
  return (
    <ContestCard key={contest._id} onClick={() => handleClick(contest._id)}>
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
  )
}

const ContestCard = styled('div')({
  borderRadius: '10px',
  margin: '15px 10px',
  background: 'var(--bs-light)',
  color: 'var(--bs-blue)',
  padding: '15px 10px',
  cursor: 'pointer',
  border: '1px solid #d4d0d0',
  boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
  '& .contest-card-top, .contest-card-bottom': {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 0'
  }
})


export default Contest