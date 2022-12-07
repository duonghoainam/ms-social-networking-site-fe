import { ChatState } from '../pages/chat/Types/chatState.Type';

export interface AppState {
  login: any;
  register: any;
  home: any;
  chat: ChatState;
  user: any;
}
