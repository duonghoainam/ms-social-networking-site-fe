import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ChatAPI from '../../api/ChatApi';

export const getAllConversations = createAsyncThunk(
  'conversation/getAll',
  async (args, thunkAPI) => {
    try {
      const response = await ChatAPI.getAllConversations();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(`error`);
    }
  }
);

export const createConversation = createAsyncThunk(
  'conversation/create',
  async (args, thunkAPI) => {
    try {
      const response = await ChatAPI.createConversation(args);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(`error `);
    }
  }
);

export const getUserContact = createAsyncThunk('user/getContact', async (args, thunkAPI) => {
  try {
    const response = await ChatAPI.getUserContact();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(`error`);
  }
});

export const createMessage = createAsyncThunk('message/create', async (args, thunkAPI) => {
  try {
    const response = await ChatAPI.createMessage(args);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(`error`);
  }
});

export const getMessageInCons = createAsyncThunk('message/get', async (args, thunkAPI) => {
  try {
    const response = await ChatAPI.getMessageInCon(args);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(`error`);
  }
});

export const getMembersInCon = createAsyncThunk('members/get', async (args, thunkAPI) => {
  try {
    const response = await ChatAPI.getMembersInCon(args);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(`error`);
  }
});

export const deleteCon = createAsyncThunk('conversation/delete', async (args, thunkAPI) => {
  try {
    const response = await ChatAPI.deleteCon(args);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(`error`);
  }
});

export const removeUserInCon = createAsyncThunk(
  'conversation/removeUser',
  async (args, thunkAPI) => {
    try {
      const response = await ChatAPI.removeUserInCon(args);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(`error`);
    }
  }
);

export const tymMessage = createAsyncThunk('message/tym', async (args, thunkAPI) => {
  try {
    const response = await ChatAPI.tymMessage(args);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(`error`);
  }
});

export const unTymMessage = createAsyncThunk('message/tym', async (args, thunkAPI) => {
  try {
    const response = await ChatAPI.unTymMessage(args);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(`error`);
  }
});

export const changeConversationName = createAsyncThunk(
  'conversation/changeName',
  async (args, thunkAPI) => {
    try {
      const response = await ChatAPI.changeConName(args);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(`error`);
    }
  }
);

export const changeConversationAvatar = createAsyncThunk(
  'conversation/changeAvatar',
  async (args, thunkAPI) => {
    try {
      const response = await ChatAPI.changeConAvt(args);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(`error`);
    }
  }
);

export const deleteMessage = createAsyncThunk('message/delete', async (args, thunkAPI) => {
  try {
    const response: any = await ChatAPI.deleteMessage(args);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(`error`);
  }
});

export const addUserIntoCon = createAsyncThunk('conversation/addUser', async (args, thunkAPI) => {
  try {
    const response = await ChatAPI.addUserIntoCon(args);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(`error`);
  }
});

export const seenAllMessages = createAsyncThunk(
  'message/seenAllMessages',
  async (args, thunkAPI) => {
    try {
      const response = await ChatAPI.seenAllMessages(args);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(`error`);
    }
  }
);

export const seenMessage = createAsyncThunk('message/seenMessage', async (args, thunkAPI) => {
  try {
    const response: any = await ChatAPI.seenMessage(args);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(`error`);
  }
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    conversations: [],
    loading: false,
    error: false,
    userFollowing: [],
    tags: [],
    messagesInConversation: []
  },
  reducers: {
    createTag: (state: any, action: any) => {
      state.tags.push(action.payload);
    },
    deleteTag: (state, action) => {
      state.tags = state.tags.filter((tag: any) => {
        if (tag._id !== action.payload) {
          return tag;
        }
        return null;
      });
    },
    resetTag: (state, action) => {
      state.tags = [];
    }
  },
  extraReducers: {
    [getAllConversations.pending.toString()]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [getAllConversations.fulfilled.toString()]: (state, action) => {
      state.loading = false;
      state.conversations = action.payload.conversation;
      state.error = false;
    },
    [getAllConversations.rejected.toString()]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [createConversation.pending.toString()]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [createConversation.fulfilled.toString()]: (state: any, action: any) => {
      state.loading = false;
      state.error = false;
      state.conversations.unshift(action.payload.conversation);
    },
    [createConversation.rejected.toString()]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [getUserContact.pending.toString()]: (state, action) => {
      state.loading = false;
      state.error = false;
    },
    [getUserContact.fulfilled.toString()]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.userFollowing = action.payload.contactUsers;
    },
    [getUserContact.rejected.toString()]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [createMessage.pending.toString()]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [createMessage.fulfilled.toString()]: (state, action) => {
      state.loading = false;
      state.error = false;
    },
    [createMessage.rejected.toString()]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [getMessageInCons.pending.toString()]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [getMessageInCons.fulfilled.toString()]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.messagesInConversation = action.payload.messages;
    },
    [getMessageInCons.rejected.toString()]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [removeUserInCon.pending.toString()]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [removeUserInCon.fulfilled.toString()]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.conversations = state.conversations.filter(
        (conversation: any) => conversation._id !== action.payload.newConversation._id
      );
    },
    [removeUserInCon.rejected.toString()]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [deleteCon.pending.toString()]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [deleteCon.fulfilled.toString()]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.conversations = state.conversations.filter(
        (conversation: any) => conversation._id !== action.payload.conversation._id
      );
    },
    [deleteCon.rejected.toString()]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [tymMessage.pending.toString()]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [tymMessage.fulfilled.toString()]: (state, action) => {
      state.loading = false;
      state.error = false;
    },
    [tymMessage.rejected.toString()]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [unTymMessage.pending.toString()]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [unTymMessage.fulfilled.toString()]: (state, action) => {
      state.loading = false;
      state.error = false;
    },
    [unTymMessage.rejected.toString()]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [changeConversationName.pending.toString()]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [changeConversationName.fulfilled.toString()]: (state: any, action) => {
      state.loading = false;
      state.error = false;
      const conIndex = state.conversations.findIndex(
        (conversation: any) => conversation._id === action.payload.newConversation._id
      );
      state.conversations[conIndex].name = action.payload.newConversation.name;
    },
    [changeConversationName.rejected.toString()]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [changeConversationAvatar.pending.toString()]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [changeConversationAvatar.fulfilled.toString()]: (state: any, action) => {
      state.loading = false;
      state.error = false;
      const conIndex = state.conversations.findIndex(
        (conversation: any) => conversation._id === action.payload.newConversation._id
      );
      state.conversations[conIndex].avatar = action.payload.newConversation.avatar;
    },
    [changeConversationAvatar.rejected.toString()]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [deleteMessage.pending.toString()]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [deleteMessage.rejected.toString()]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [deleteMessage.fulfilled.toString()]: (state, action) => {
      state.loading = false;
      state.error = false;
    },
    [addUserIntoCon.pending.toString()]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [addUserIntoCon.rejected.toString()]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [addUserIntoCon.fulfilled.toString()]: (state, action) => {
      state.loading = false;
      state.conversations
        .filter((con: any) => {
          return con._id !== action.payload.newConversation._id;
        })
        .unshift();
      state.error = false;
    },
    [seenAllMessages.pending.toString()]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [seenAllMessages.rejected.toString()]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [seenAllMessages.fulfilled.toString()]: (state, action) => {
      state.loading = false;
      state.error = false;
    },
    [seenMessage.pending.toString()]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [seenMessage.rejected.toString()]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [seenMessage.fulfilled.toString()]: (state, action) => {
      state.loading = false;
      state.error = false;
    }
  }
});

export default chatSlice;
export const { createTag, deleteTag, resetTag } = chatSlice.actions;
