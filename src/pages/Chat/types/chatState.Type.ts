import { IConversation } from './IConversation';
import { IMessage } from './IMessage';

export interface ChatState {
  conversations: IConversation[];
  userFollowing: any[];
  messagesInConversation: IMessage[];
  tags: any[];
  loading: boolean;
  error: boolean;
}
