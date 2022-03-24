import { Schema, model, Model } from 'mongoose';
import moment from 'moment';
import User from '../types/user';

const userSchema = new Schema<User, Model<User>, User>({
  id: {
    type: Schema.Types.ObjectId,
    default() {
      return this._id;
    }
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: Number,
    // required: true
    default: 1
  },
  createdAt: String,
  updatedAt: String
}, { timestamps: { currentTime: () => moment().unix() } })

userSchema.methods.isPasswordCorrect = () => { }


export default model<User>('users', userSchema)