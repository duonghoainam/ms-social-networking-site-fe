import { IConversation } from './IConversation';
import { IImage } from './IImage.Type';
import { IMessage } from './IMessage';

export interface IUseChatContent {
  messages: IMessage[];
  images: IImage[];
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
  handleChangeImages: any;
  submitImageMessage: any;
  isOpenPopup: boolean;
  setIsOpenPopup: any;
  handleRemoveImage: any;
  handleClosePopup: any;
}
