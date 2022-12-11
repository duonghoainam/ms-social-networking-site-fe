import { IConversation } from './IConversation';
import { IUserInfo } from './IUserInfo';

export interface IMessage {
  _id: string;
  conversation: string;
  conversationDetails?: IConversation;
  sender: string;
  senderDetail?: IUserInfo;
  content: string;
  seenBy: [string];
  seenByDetail: IUserInfo[];
  reactBy: [string];
  reactByDetail: IUserInfo[];
  updatedAt: string;
  createdAt: string;
  isDeleted: boolean;
}
