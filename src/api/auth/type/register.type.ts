import { Gender } from '../../../constants/enums/gender.enum';

export interface RegisterParams {
  username: string;
  name: string;
  gender: Gender;
  dateOfBirth: Date;
  password: string;
}
