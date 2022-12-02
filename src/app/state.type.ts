import { ChatState } from '../pages/chat/Types/chatState.Type';

export interface AppState {
  auth: any;
  home: any;
  chat: ChatState;
  user: any;
}
