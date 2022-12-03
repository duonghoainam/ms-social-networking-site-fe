import { createAsyncThunk } from '@reduxjs/toolkit';
import ChatAPI from '../../../api/chat/ChatApi';
import { IMessageCrt } from '../Types/IMessageCrt';

export const getAllConversations = createAsyncThunk('conversation/getAll', async (id: string) => {
  const response = await ChatAPI.getAllConversations(id);
  return response.data;
});

export const createConversation = createAsyncThunk('conversation/create', async (args: any) => {
  const response = await ChatAPI.createConversation(args);
  return response.data;
});

export const getUserContact = createAsyncThunk('user/getContact', async () => {
  const response = await ChatAPI.getUserContact();
  return response.data;
});

export const createMessage = createAsyncThunk('message/create', async (args: IMessageCrt) => {
  const response = await ChatAPI.createMessage(args);
  return response;
});

// export const getMessageInCons = createAsyncThunk('message/get', async (args, thunkAPI) => {
//   try {
//     const response = await ChatAPI.getMessageInCon(args);
//     return { messages: response.data };
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.toString());
//   }
// });

export const getConversationMessages = createAsyncThunk(
  'message/getall',
  async (args: { id: string; page: number }) => {
    const response = await ChatAPI.getMessageInCon(args.id, args.page);
    return response.data;
  }
);

export const getMoreConversationMessages = createAsyncThunk(
  'message/getMore',
  async (args: { id: string; page: number }) => {
    const response = await ChatAPI.getMessageInCon(args.id, args.page);
    return response.data;
  }
);

// export const getMessageInCons = createAsyncThunk('users/update', async (args: any) => {
//   const response = await ChatAPI.getMessageInCon(args);
//   return response.data as IApiResponse;
// });

export const getMembersInCon = createAsyncThunk('members/get', async (id: string) => {
  const response = await ChatAPI.getMembersInCon(id);
  return response;
});

export const deleteCon = createAsyncThunk('conversation/delete', async (args: any) => {
  const response = await ChatAPI.deleteCon(args);
  return response;
});

export const removeUserInCon = createAsyncThunk('conversation/removeUser', async (args: any) => {
  const response = await ChatAPI.removeUserInCon(args);
  return response;
});

export const reactMessage = createAsyncThunk(
  'message/tym',
  async (args: { id: string; reactBy: string }) => {
    const response = await ChatAPI.reactMessage(args);
    return response;
  }
);

export const unReactMessage = createAsyncThunk(
  'message/tym',
  async (args: { id: string; reactBy: string }) => {
    const response = await ChatAPI.unReactMessage(args);
    return response;
  }
);

export const changeConversationName = createAsyncThunk(
  'conversation/changeName',
  async (args: { id: string; newName: string }) => {
    const response = await ChatAPI.changeConName(args.id, args.newName);
    console.log(response.data);
    return response.data;
  }
);

export const changeConversationAvatar = createAsyncThunk(
  'conversation/changeAvatar',
  async (args: { id: string; newAvatar: string }) => {
    const response = await ChatAPI.changeConAvt(args.id, args.newAvatar);
    return response.data;
  }
);

export const deleteMessage = createAsyncThunk(
  'message/delete',
  async (args: { id: string; sender: string }) => {
    const response = await ChatAPI.deleteMessage(args);
    return response;
  }
);

export const addUserIntoCon = createAsyncThunk('conversation/addUser', async (args: any) => {
  const response = await ChatAPI.addUserIntoCon(args);
  return response;
});

export const seenAllMessages = createAsyncThunk(
  'message/seenAllMessage',
  async (args: { id: string; seenBy: string }) => {
    const response = await ChatAPI.seenAllMessages(args);
    return response;
  }
);

export const seenMessage = createAsyncThunk('message/seenMessage', async (args: any) => {
  const response = await ChatAPI.seenMessage(args);
  return response;
});
