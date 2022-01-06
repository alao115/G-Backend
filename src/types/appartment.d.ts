export default interface Appartment {
  id: string;
  mainImg: string;
  appartmentType: string;
  isFurnished: boolean;
  location: string;
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
    name: string;
    address: string;
    status: string;
    phone: string;
    email: string;
  };
  likes: number;
  favorite: number
}