import {
  addUserIntoCon,
  changeConversationAvatar,
  changeConversationName,
  createConversation,
  createMessage,
  deleteCon,
  deleteMessage,
  getAllConversations,
  getConversationMessages,
  getUserContact,
  removeUserInCon,
  seenAllMessages,
  seenMessage,
  reactMessage,
  unReactMessage,
  getMoreConversationMessages
} from './chatAction';

export const extraReducers = {
  [getAllConversations.pending.toString()]: (state: any, action: any) => {
    state.loading = true;
    state.error = false;
  },
  [getAllConversations.fulfilled.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.conversations = action.payload;
    state.error = false;
  },
  [getAllConversations.rejected.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = true;
  },
  [createConversation.pending.toString()]: (state: any, action: any) => {
    state.loading = true;
    state.error = false;
  },
  [createConversation.fulfilled.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = false;
    state.conversations.unshift(action.payload);
  },
  [createConversation.rejected.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = true;
  },
  [getUserContact.pending.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = false;
  },
  [getUserContact.fulfilled.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = false;
    state.userFollowing = action.payload;
  },
  [getUserContact.rejected.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = true;
  },
  [createMessage.pending.toString()]: (state: any, action: any) => {
    state.loading = true;
    state.error = false;
  },
  [createMessage.fulfilled.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = false;
  },
  [createMessage.rejected.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = true;
  },
  [getConversationMessages.pending.toString()]: (state: any, action: any) => {
    state.loading = true;
    state.error = false;
  },
  [getConversationMessages.fulfilled.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = false;
    state.messagesInConversation = action.payload;
  },
  [getConversationMessages.rejected.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = true;
  },
  [getMoreConversationMessages.pending.toString()]: (state: any, action: any) => {
    state.loading = true;
    state.error = false;
  },
  [getMoreConversationMessages.fulfilled.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = false;
    state.messagesInConversation = [...state.messagesInConversation, ...action.payload];
  },
  [getMoreConversationMessages.rejected.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = true;
  },
  [removeUserInCon.pending.toString()]: (state: any, action: any) => {
    state.loading = true;
    state.error = false;
  },
  [removeUserInCon.fulfilled.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = false;
    state.conversations = state.conversations.filter(
      (conversation: any) => conversation._id !== action.payload.newConversation._id
    );
  },
  [removeUserInCon.rejected.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = true;
  },
  [deleteCon.pending.toString()]: (state: any, action: any) => {
    state.loading = true;
    state.error = false;
  },
  [deleteCon.fulfilled.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = false;
    state.conversations = state.conversations.filter(
      (conversation: any) => conversation._id !== action.payload.conversation._id
    );
  },
  [deleteCon.rejected.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = true;
  },
  [reactMessage.pending.toString()]: (state: any, action: any) => {
    state.loading = true;
    state.error = false;
  },
  [reactMessage.fulfilled.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = false;
  },
  [reactMessage.rejected.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = true;
  },
  [unReactMessage.pending.toString()]: (state: any, action: any) => {
    state.loading = true;
    state.error = false;
  },
  [unReactMessage.fulfilled.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = false;
  },
  [unReactMessage.rejected.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = true;
  },
  [changeConversationName.pending.toString()]: (state: any, action: any) => {
    state.loading = true;
    state.error = false;
  },
  [changeConversationName.fulfilled.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = false;
    const conIndex = state.conversations.findIndex(
      (conversation: any) => conversation._id === action.payload._id
    );
    console.log('new con', conIndex, [...state.conversations]);
    state.conversations = state.conversations.map((con: any) => {
      if (con._id === action.payload._id) return { ...con, name: action.payload.name };
      else return con;
    });
  },
  [changeConversationName.rejected.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = true;
  },
  [changeConversationAvatar.pending.toString()]: (state: any, action: any) => {
    state.loading = true;
    state.error = false;
  },
  [changeConversationAvatar.fulfilled.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = false;
    const conIndex = state.conversations.findIndex(
      (conversation: any) => conversation._id === action.payload._id
    );
    state.conversations[conIndex].avatar = action.payload.avatar;
  },
  [changeConversationAvatar.rejected.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = true;
  },
  [deleteMessage.pending.toString()]: (state: any, action: any) => {
    state.loading = true;
    state.error = false;
  },
  [deleteMessage.rejected.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = true;
  },
  [deleteMessage.fulfilled.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = false;
  },
  [addUserIntoCon.pending.toString()]: (state: any, action: any) => {
    state.loading = true;
    state.error = false;
  },
  [addUserIntoCon.rejected.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = true;
  },
  [addUserIntoCon.fulfilled.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.conversations
      .filter((con: any) => {
        return con._id !== action.payload.newConversation._id;
      })
      .unshift();
    state.error = false;
  },
  [seenAllMessages.pending.toString()]: (state: any, action: any) => {
    state.loading = true;
    state.error = false;
  },
  [seenAllMessages.rejected.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = true;
  },
  [seenAllMessages.fulfilled.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = false;
  },
  [seenMessage.pending.toString()]: (state: any, action: any) => {
    state.loading = true;
    state.error = false;
  },
  [seenMessage.rejected.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = true;
  },
  [seenMessage.fulfilled.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = false;
  }
};
