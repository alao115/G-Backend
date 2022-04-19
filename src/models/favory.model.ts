import { Schema, model, Model } from 'mongoose';
import moment from 'moment';
import Favory from '../types/favory';

const favorySchema = new Schema<Favory, Model<Favory>, Favory>({
  appartment: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  }
}, {
  timestamps: { currentTime: () => moment().unix() }
})

export default model<Favory>('favories', favorySchema)