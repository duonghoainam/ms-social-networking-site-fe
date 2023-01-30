import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { socket } from '../../../App';
import { useAppDispatch } from '../../../app/store';
import {
  addMessage,
  leaveConversation,
  newConversation,
  updateConversation,
  updateMessage
} from '../state/chatSlice';
import { IConversation } from '../types/IConversation';
interface useChatPageType {
  isOpenSetting: boolean
  setIsOpenSetting: React.Dispatch<React.SetStateAction<boolean>>
  isShowPopup: boolean
  setIsShowPopup: React.Dispatch<React.SetStateAction<boolean>>
}

export const useChatPage = (): useChatPageType => {
  const dispatch = useAppDispatch();
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const [isShowPopup, setIsShowPopup] = useState(false);
  // const currentUser = useSelector((state: AppState) => state.auth.currentUser);
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'Inbox • Chats';
  }, []);

  useEffect(() => {
    if (!socket.connected) socket.connect();
    socket.on('newMessage', function (data: any) {
      dispatch(addMessage(data));
    });
    socket.on('updateMessage', function (data: any) {
      dispatch(updateMessage(data));
    });
    socket.on('updateConversation', function (data: any) {
      dispatch(updateConversation(data));
    });
    socket.on('newConversation', function (data: IConversation) {
      const memberIds = data.members.map((member) => member.id);
      if (memberIds.some((memberId) => memberId === currentUser.id)) {
        dispatch(newConversation(data));
      }
    });
    socket.on('seenMessage', function (data: any) {
      dispatch(updateConversation(data));
    });
    socket.on('leaveConversation', function (data: any) {
      if (data.members.findIndex((member: any) => member.id === currentUser.id) === -1) {
        navigate('/messenger');
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
