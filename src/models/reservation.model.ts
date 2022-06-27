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
  startDate: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    // required: true,
  },
  endDate: {
    type: String,
  },
  endTime: {
    type: String,
  },
  archive: {
    type: Boolean,
    default: false
  },
  user: {
    type: String,
    required: true,
  },
  createdAt: String,
  status: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: { currentTime: () => moment().unix() }
})

export default model<Reservation>('reservations', reservationSchema)