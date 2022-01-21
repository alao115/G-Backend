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
    type: Number,
    default: moment().unix(),
    get(v: moment.MomentInput) {
      return moment(v).format('YYYY-MM-DD')
    }
    // required: true,
  },
  status: {
    type: String,
    default: ''
  },
  // isNew: {
  //   type: Boolean,
  //   default: true
  // },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: { currentTime: () => moment().unix() }
})

export default model<Publication>('publications', publicationSchema)