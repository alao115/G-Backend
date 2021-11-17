export default interface Account {
  id: string;
  user: string;
  userType: UserType;
  status: string;
  createdAt: string;
  firstname: string
  lastname: string;
  civility: string;
  phone: string;
  email: string;
  adminType: string;
  updatedAt: string;
}

enum UserType {
  ADMIN,
  PUBLISHER,
  SIMPLE,
  OWNER
}