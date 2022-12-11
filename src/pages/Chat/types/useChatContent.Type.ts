import { IConversation } from './IConversation';
import { IMessage } from './IMessage';

export interface IUseChatContent {
  messages: IMessage[];
  currentConversation: IConversation;
  conversationAvatar: string;
  conversationName: string;
  isTyping: boolean;
  showScrollButton: boolean;
  chatContentRef: any;
  ref: any;
  messageText: string;
  handleScroll: any;
  handleScrollBottom: any;
  handleChange: any;
  handleDeleteMessage: any;
  handleKeyDown: any;
  seenMess: any;
  handleReactMessage: any;
  handleUnReactMessage: any;
  handleSubmit: any;
}
