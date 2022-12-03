export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  gender: string;
  dateofbirth: Date;
  role: string;
  mobile: string;
  address: string;
  followers: any[];
  following: any[];
  createdAt: Date;
}
