import { Schema, model, Model } from 'mongoose';
import moment from 'moment';
import AppartmentDetails from '../types/appartmentDetail';

const appartmentDetailSchema = new Schema<AppartmentDetails, Model<AppartmentDetails> ,AppartmentDetails>({
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
  createdBy: String,
  createdAt: String,
  groundLevel: {
    type: String,
    required: true,
  },
  isFurnished: {
    type: Boolean,
    required: true,
  },
  hasFloors: {
    type: Boolean,
    required: true,
  },
  numberOfFloors: {
    type: Number,
    required: true,
  },
  hasBedroom: {
    type: Boolean,
    required: true,
  },
  numberOfBedrooms: {
    type: Number,
    required: true,
  },
  hasLivingroom: {
    type: Boolean,
    required: true,
  },
  numberOfLivingrooms: {
    type: Number,
    required: true,
  },
  hasKitchen: {
    type: Boolean,
    required: true,
  },
  numberOfKitchen: {
    type: Number,
    required: true,
  },
  hasBathrooms: {
    type: Boolean,
    required: true,
  },
  numberOfBathrooms: {
    type: Number,
    required: true,
  },
  hasStorageroom: {
    type: Boolean,
    required: true,
  },
  numberOfStoragerooms: {
    type: Number,
    required: true,
  },
  hasGarage: {
    type: Boolean,
    required: true,
  },
  numberOfGarage: {
    type: Number,
    required: true,
  },
  hasGarden: {
    type: Boolean,
    required: true,
  },
  numberOfGarden: {
    type: Number,
    required: true,
  },
  hasAC: {
    type: Boolean,
    required: true,
  },
  numberOfACs: {
    type: Number,
    required: true,
  },
  hasPool: {
    type: Boolean,
    required: true,
  },
  numberOfPools: {
    type: Number,
    required: true,
  },
  hasKeeper: {
    type: Boolean,
    required: true,
  },
  totalOfHouseholds: {
    type: Number,
    required: true,
  }
}, {
  timestamps: { currentTime: () => moment().unix() }
})

export default model<AppartmentDetails>('appartmentDetails', appartmentDetailSchema)