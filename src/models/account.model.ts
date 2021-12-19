import { Schema, model, Model } from 'mongoose';
import moment from 'moment';
import Account from '../types/account';

enum UserType {
  ADMIN,
  PUBLISHER,
  SIMPLE,
  OWNER
}

const accountSchema = new Schema<Account, Model<Account>, Account>({
  id: {
    type: String,
    default() {
      return this._id;
    }
  },
  user: {
    type: String,
    required: true
  },
  userType: {
    type: Number,
    // required: true
    default: 0
  },
  status: {
    type: String,
    // required: true
  },
  createdAt: String,
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  civility: {
    type: String,
    // required: true
  },
  phone: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    required: true
  },
  adminType: {
    type: String,
    // required: true
  },
  updatedAt: String,
}, { timestamps: { currentTime: () => moment().unix() } })

export default model<Account>('accounts', accountSchema)