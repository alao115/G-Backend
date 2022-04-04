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
  visitorInfos: {
    firstname: {
      type: String,
      default: ''
    },
    lastname: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
  },
  date: {
    type: String,
    required: true,
    get: (v: any ) => moment.unix(v).format("YYYY-MM-DD")
  },
  status: {
    type: String,
    default: ''
  }
}, {
  timestamps: { currentTime: () => moment().unix() }
})

export default model<Visit>('visits', visitSchema)