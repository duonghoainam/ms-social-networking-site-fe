import { Gender } from '../../../constants/enums/gender.enum';

export interface RegisterParams {
  username: string;
  name: string;
  dateOfBirth: Date;
  gender: Gender;
  password: string;
}
