import { Schema, model, Model } from 'mongoose';
import moment from 'moment';
import Visit from '../types/visit';

const visitSchema = new Schema<Visit, Model<Visit>, Visit>({
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
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: ''
  }
}, {
  timestamps: { currentTime: () => moment().unix() }
})

export default model<Visit>('visits', visitSchema)