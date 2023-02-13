import { styled } from "@mui/system";
import React from "react";

interface TicketPlaceholderProps {
  series: [Number[]] | []
}

const TicketPlaceholder: React.FC<TicketPlaceholderProps> = ({ series }): React.ReactElement => {
  return (
    <TicketHolderSection>
      {series.map((s, ind) => {
        return (
          <div key={ind} className="ticket-row">
            {s.map((num, pos) => (
              <Block key={pos} sx={num === 0 ? { background: 'aliceblue' }: {}}>{num === 0 ? '': num.toString()}</Block>
            ))}
          </div>
        )
      })}
    </TicketHolderSection>
  )
}

const TicketHolderSection = styled('div')({
  boxSizing: 'border-box',
  border: '1px solid #dedede',
  '.ticket-row': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px solid #dedede'
  }
})

const Block = styled('span')({
  padding: '7px',
  textAlign: 'center',
  width: 'calc(100% / 9)',
  height: '40px',
  borderRight: '1px solid #dedede',
  fontWeight: 'bold'
})

export default TicketPlaceholder