import React from 'react'
import { styled } from '@mui/material'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { TicketI } from '../../types/contests.types';
import TicketPlaceholder from './TicketPlaceHolder';

interface TicketViewerProps {
  ticket: TicketI | null
  open: boolean
  onClose: () => void
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const TicketViewerDialog: React.FC<TicketViewerProps> = ({ ticket, open, onClose }): React.ReactElement => {
  return (
    <TicketViewSection>
     <Dialog
        open={open}
        fullScreen
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{ticket?.name}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TicketPlaceholder series={ticket?.series || []} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </TicketViewSection>
  )
}

const TicketViewSection = styled('div')({
  padding: '10px'
})

export default TicketViewerDialog