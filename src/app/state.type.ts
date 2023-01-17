import { NotificationState } from '../components/Notification/state/notificationSlice';
import { ChatState } from '../pages/Chat/types/chatState.Type';

export interface AppState {
  login: any;
  register: any;
  home: any;
  chat: ChatState;
  user: any;
  notification: NotificationState;
}
