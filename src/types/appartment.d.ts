export default interface Appartment {
  id: string;
  // owner: string;
  // tenant: string;
  // createdBy: string;
  // createdAt: string;
  // location: string;
  // rent: number;
  // status: string;
  // advancePayment: number;
  // energyCommision: number;
  // numberOffPrepaidMonths: number;
  mainImg: string;
  appartmentType: number;
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
    prepaidRentMonths: number
  },
  ownerInfos: string;
  likes: number;
  favorite: number
}