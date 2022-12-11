import { Gender } from '../../../constants/enums/gender.enum';

export interface User {
  id: string
  name: string
  gender: Gender
  dateOfBirth: Date
  email: string
  phoneNumber: string
  address: string
  avatar: string
  followers: number
  followings: number
}
