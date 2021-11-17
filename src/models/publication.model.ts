import { Schema, model, Model } from 'mongoose';
import moment from 'moment';
import Publication from '../types/publication';

const publicationSchema = new Schema<Publication, Model<Publication>, Publication>({
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
  publisher: {
    type: String,
    required: true,
  },
  createdBy: String,
  createdAt: String,
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  }
}, {
  timestamps: { currentTime: () => moment().unix() }
})

export default model<Publication>('publications', publicationSchema)