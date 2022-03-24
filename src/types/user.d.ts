export default interface User {
  id?: string;
  email: string;
  password: string;
  userType: number;
  emailVerified?: boolean;
  createdAt: string;
  updatedAt: string;
}