export interface TicketI {
  name: string
  _id: string
  series: [number[]]
  userID: string
}

export interface PrizesI {
  firstRow: number
  fullHousie: number
  quickFive: number
  secondFullHousie: number
  secondRow: number
  thirdRow: number
}

export interface contestData {
  _id: string
  name: string
  maxParticipants: number
  joiningAmount: number
  prizes: PrizesI
  isFinished: boolean
  isPlaying: boolean
  isActive: boolean
  startDateTime: string
  tickets: TicketI[]
  createdAt: string
  updatedAt: string
}