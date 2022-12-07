import { IUserInfo } from './IUserInfo';

export interface IConversation {
  _id: string;
  name: string;
  members: IUserInfo[];
  detailMembers: IUserInfo[];
  avatar?: string;
  updatedAt: string;
  createdAt: string;
  createdBy: string;
}
