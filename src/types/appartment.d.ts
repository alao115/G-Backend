export default interface Appartment {
  id: string;
  owner: string;
  tenant: string;
  createdBy: string;
  createdAt: string;
  location: string;
  rent: number;
  status: string;
  advancePayment: number;
  energyCommision: number;
  numberOffPrepaidMonths: number;
}