import { createSlice } from '@reduxjs/toolkit';
import { ChatState } from '../Types/chatState.Type';
import { IMessage } from '../Types/IMessage';
import { extraReducers } from './chatReducer';

const initialState: ChatState = {
  conversations: [],
  loading: false,
  error: false,
  userFollowing: [],
  tags: [],
  messagesInConversation: []
};

const ChatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    createTag: (state: ChatState, action: any) => {
      state.tags.push(action.payload);
    },
    deleteTag: (state: ChatState, action: any) => {
      state.tags = state.tags.filter((tag: any) => {
        return tag._id !== action.payload;
      });
    },
    resetTag: (state: ChatState) => {
      state.tags = [];
    },
    addMessage: (state: ChatState, action: any) => {
      state.loading = false;
      state.error = false;
      const isValid = state.messagesInConversation.some(
        (mess: IMessage) => mess.conversation === action.payload.conversation
      );
      if (!isValid) return;
      const index = state.messagesInConversation.findIndex(
        (mess: IMessage) => mess._id === action.payload._id
      );
      if (index === -1) state.messagesInConversation.unshift(action.payload);
      else state.messagesInConversation[index] = action.payload;
    },
    updateMessage: (state: ChatState, action: any) => {
      state.loading = false;
      state.error = false;
      const conIndex = state.messagesInConversation.findIndex(
        (mess: any) => mess._id === action.payload._id
      );
      state.messagesInConversation[conIndex] = action.payload;
    },
    updateConversation: (state: ChatState, action: any) => {
      state.loading = false;
      state.error = false;
      const conIndex = state.conversations.findIndex(
        (conversation: any) => conversation._id === action.payload._id
      );
      state.conversations[conIndex] = action.payload;
    },
    leaveConversation: (state: ChatState, action: any) => {
      state.loading = false;
      state.error = false;
      const newConversations = state.conversations.filter(
        (conversation: any) => conversation._id !== action.payload._id
      );
      state.conversations = newConversations;
    },
    newConversation: (state: ChatState, action: any) => {
      state.loading = false;
      state.error = false;
      const exist = state.conversations.some(
        (conversation: any) => conversation._id === action.payload._id
      );
      if (!exist) state.conversations.unshift(action.payload);
    },
    seenAllMessages: (state: ChatState, action: any) => {
      state.loading = false;
      state.error = false;
      const messages = state.messagesInConversation.map((mess: IMessage) => {
        if (!mess.seenBy.some((userId: string) => userId === action.data._id))
          mess.seenBy.push(action.payload._id);
        mess.seenByDetail.push(action.payload);
        return mess;
      });
      state.messagesInConversation = messages;
    }
  },
  extraReducers
});

const { reducer: ChatReducer, actions } = ChatSlice;

export const {
  createTag,
  deleteTag,
  resetTag,
  addMessage,
  updateMessage,
  updateConversation,
  newConversation,
  leaveConversation
} = actions;

export default ChatReducer;
