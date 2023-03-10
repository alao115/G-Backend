type timeSlots = {
  day: String
  selectedTimes: string []
}

export default interface Appartment {
  id: string;
  createdBy: string;
  mainImg: string;
  firstImg: string;
  secondImg: string;
  thirdImg: string;
  fourthImg: string;
  appartmentType: string;
  isFurnished: boolean;
  forShortStay: boolean;
  location: string;
  geometry: {
    type: string;
    coordinates: [lng: number, lat: number]
  };
  rent: number;
  details: string;
  rooms: number;
  bathrooms: number;
  bedrooms: number;
  livingrooms: number;
  storageroom: number;
  kitchen: number;
  garage: number;
  keeper: boolean;
  terrace: number;
  garden: number;
  ac: boolean;
  pool: boolean;
  householdsTotal: number;
  groundLevel: number;
  conditions: {
    advancePayment: number;
    energyCommission: number;
    prepaidRentMonths: number;
    rent: number;
    paymentFrequency: number;
  },
  ownerInfos: {
    civility: number;
    firstname: string;
    lastname: string;
    address: string;
    isAlive: boolean;
    phone: string;
    email: string;
  };
  likes: number;
  favorite: number;
  rentStart: number;
  rentEnd: number;
  timeSlots: timeSlots[]
}