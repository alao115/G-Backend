export default interface User {
  id?: string;
  email: string;
  password: string;
  emailVerified?: boolean;
  createdAt: string;
  updatedAt: string;
}