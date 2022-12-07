import { Gender } from '../../../constants/enums/gender.enum';

export interface User {
  id: string;
  name: string;
  email: string;
  dateOfBirth: Date;
  gender: Gender;
}
