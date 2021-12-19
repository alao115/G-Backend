import { Schema, model, Model } from 'mongoose';
import moment from 'moment';
import AppartmentType from '../types/appartmentType';

const appartmentTypeSchema = new Schema<AppartmentType, Model<AppartmentType> ,AppartmentType>({
  id: {
    type: String,
    default() {
      return this._id;
    }
  },
  label: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: ''
  }
}, {
  timestamps: { currentTime: () => moment().unix() }
})

export default model<AppartmentType>('appartmentTypes', appartmentTypeSchema)