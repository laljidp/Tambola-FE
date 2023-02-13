import React from "react";
import { Button, styled } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { TicketI } from "../../types/contests.types";

interface TicketsListsProps {
  tickets: TicketI[]
}

const TicketsLists: React.FC<TicketsListsProps> = (props): React.ReactElement => {
  const { tickets } = props
  return (
    <Section>
      {tickets.map((ticket) => (
        <div className="tk-ticket" key={ticket?._id}>
          <span>{ticket.name}</span>
          {ticket.user ? (
            <>
              <span>{ticket.user?.firstName || 'N/A'}</span>
              <Avatar sx={{ bgcolor: 'secondary.main' }} alt={ticket?.user?.firstName}></Avatar>
            </>
          ) :
            (
              <Button color="secondary" variant="outlined">
                Buy Ticket
              </Button>
            )
          }
        </div>
      ))}
    </Section>
  )
}

const Section = styled('div')({
  boxSizing: 'border-box',
  overflow: 'scroll',
  height: 'calc(100vh - 135px)',
  '.tk-ticket': {
    display: 'flex',
    fontWeight: 'bold',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    border: '1px solid #dedede',
    borderRadius: '4px',
    margin: '5px 1px'
  }
})

export default TicketsLists