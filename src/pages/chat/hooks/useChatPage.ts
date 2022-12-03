import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { socket } from '../../../App';
import { AppState } from '../../../app/state.type';
// import { useSelector } from 'react-redux';
// import { AppState } from '../../../app/state.type';
import { useAppDispatch } from '../../../app/store';
import {
  addMessage,
  leaveConversation,
  newConversation,
  updateConversation,
  updateMessage
} from '../state/chatSlice';
import { IConversation } from '../Types/IConversation';
// import { getNotification } from '../../home/homeSlice';
// import { getPosts } from '../state/chatAction';
interface useChatPageType {
  isOpenSetting: boolean;
  setIsOpenSetting: React.Dispatch<React.SetStateAction<boolean>>;
  isShowPopup: boolean;
  setIsShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useChatPage = (): useChatPageType => {
  const dispatch = useAppDispatch();
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const currentUser = useSelector((state: AppState) => state.auth.currentUser);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'Inbox • Chats';
  }, []);

  useEffect(() => {
    if (!socket.connected) socket.connect();
    socket.on('newMessage', function (data: any) {
      console.log('received 1', data);
      dispatch(addMessage(data));
    });
    socket.on('updateMessage', function (data: any) {
      console.log('received update message', data);
      dispatch(updateMessage(data));
    });
    socket.on('updateConversation', function (data: any) {
      console.log('received update conversation', data);
      dispatch(updateConversation(data));
    });
    socket.on('newConversation', function (data: IConversation) {
      console.log('received newConversation', data);
      const memberIds = data.members.map((member) => member._id);
      if (memberIds.some((memberId) => memberId === currentUser._id))
        dispatch(newConversation(data));
    });
    socket.on('seenMessage', function (data: any) {
      console.log('received seenMessage', data);
      dispatch(updateConversation(data));
    });
    socket.on('leaveConversation', function (data: any) {
      console.log('received leaveConversation', data);
      if (data.members.findIndex((member: any) => member._id === currentUser._id) === -1) {
        navigate('/');
        dispatch(leaveConversation(data));
      }
    });
  }, [socket, params.id]);

  useEffect(() => {
    document.title = 'Inbox • Chats';
  }, []);

  useEffect(() => {
    (async () => {
      // const action2 = getNotification();
      // await dispatch(action2).unwrap();
    })().catch((error: any) => console.log(error));
  }, []);

  return {
    isOpenSetting,
    setIsOpenSetting,
    isShowPopup,
    setIsShowPopup
  };
};
