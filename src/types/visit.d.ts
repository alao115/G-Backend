export default interface Visit {
  id: string;
  appartment: string;
  visitorInfos: {
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
  };
  date: string;
  status: string;
}