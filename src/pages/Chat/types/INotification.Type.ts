import { TypeNotify } from '../../../constants/enums/notify-type.enum';
import { IUserInfo } from './IUserInfo';

export interface INotification {
  _id: string
  from: IUserInfo
  to: IUserInfo
  content: string
  link: string
  type: TypeNotify
  updatedAt: Date
  createdAt: Date
  read: boolean
  deleted: boolean
}
