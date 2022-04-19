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
  mainImg: {
    type: String,
    default: ''
  },
  firstImg: {
    type: String,
    default: ''
  },
  secondImg: {
    type: String,
    default: ''
  },
  thirdImg: {
    type: String,
    default: ''
  },
  fourthImg: {
    type: String,
    default: ''
  },
  appartmentType: {
    type: String,
    required: true
  },
  isFurnished: {
    type: Boolean,
    default: false
  },
  location: {
    type: String,
    // required: true
  },
  rent: {
    type: Number,
    required: true
  },
  details: {
    type: String,
    default: ''
  },
  rooms: {
    type: Number,
    default: 0
  },
  bathrooms: {
    type: Number,
    default: 0
  },
  bedrooms: {
    type: Number,
    default: 0
  },
  livingrooms: {
    type: Number,
    default: 0
  },
  storageroom: {
    type: Number,
    default: 0
  },
  kitchen: {
    type: Number,
    default: 0
  },
  garage: {
    type: Number,
    default: 0
  },
  keeper: {
    type: Boolean,
    default: false
  },
  terrace: {
    type: Number,
    default: 0
  },
  garden: {
    type: Number,
    default: 0
  },
  ac: {
    type: Boolean,
    default: false
  },
  pool: {
    type: Boolean,
    default: false
  },
  householdsTotal: {
    type: Number,
    default: 0
  },
  rentStart: {
    type: Number,
    // required: true
    default: 0
  },
  rentEnd: {
    type: Number,
    // required: true
    default: 0
  },
  groundLevel: {
    type: Number,
    default: 0
  },
  conditions: {
    advancePayment: {
      type: Number,
      default: 0
    },
    energyCommission: {
      type: Number,
      default: 0
    },
    prepaidRentMonths: {
      type: Number,
      default: 0
    },
    rent: {
      type: Number,
      default: 0
    },
    paymentFrequency: {
      type: Number,
      default: 0
    }
  },
  ownerInfos: {
    civility: {
      type: Number,
      required: true
    },
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    address: {
      type: String,
    },
    isAlive: {
      type: Boolean,
      default: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
    },
  },
  likes: {
    type: Number,
    default: 0
  },
  favorite: {
    type: Number,
    default: 0
  },
}, {
  timestamps: { currentTime: () => moment().unix() }
})

export default model<Appartment>('appartments', appartmentSchema)