import { Schema, model, Model } from 'mongoose';
import moment from 'moment';
import Appartment from '../types/appartment';

const appartmentSchema = new Schema<Appartment, Model<Appartment>, Appartment>({
  id: {
    type: String,
    default() {
      return this._id;
    }
  },
  owner: {
    type: String,
    required: true,
  },
  tenant: {
    type: String,
    required: true,
  },
  createdBy: String,
  createdAt: String,
  location: {
    type: String,
    required: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  advancePayment: {
    type: Number,
    required: true,
  },
  energyCommision: {
    type: Number,
    required: true,
  },
  numberOffPrepaidMonths: {
    type: Number,
    required: true,
  },
}, {
  timestamps: { currentTime: () => moment().unix() }
})

export default model<Appartment>('appartments', appartmentSchema)