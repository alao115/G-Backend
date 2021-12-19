import { Schema, model, Model } from 'mongoose';
import moment from 'moment';
import Reservation from '../types/reservations';

const reservationSchema = new Schema<Reservation, Model<Reservation>, Reservation>({
  id: {
    type: String,
    default() {
      return this._id;
    }
  },
  appartment: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  createdBy: String,
  createdAt: String,
  status: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  }
}, {
  timestamps: { currentTime: () => moment().unix() }
})

export default model<Reservation>('reservations', reservationSchema)