export default interface Reservation {
  id: string
  appartment: string
  user: string
  createdBy: string
  createdAt: string
  status: number
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  archive: boolean
}