import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { socket } from '../../../utils/api.util';
import { useAppDispatch } from '../../../app/store';
import {
  leaveConversation,
  newConversation,
  updateConversation
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
    if (!socket.connected) socket.connect();
    socket.removeAllListeners('updateConversation');
    socket.removeAllListeners('newConversation');
    socket.removeAllListeners('leaveConversation');

    socket.on('updateConversation', function (data: any) {
      dispatch(updateConversation(data));
    });
    socket.on('newConversation', function (data: IConversation) {
      const memberIds = data.members.map((member) => member.id);
      if (memberIds.some((memberId) => memberId === currentUser.id)) {
        dispatch(newConversation(data));
      }
    });
    socket.on('leaveConversation', function (data: any) {
      if (data.members.findIndex((member: any) => member.id === currentUser.id) === -1) {
        navigate('/messenger');
        dispatch(leaveConversation(data));
      }
    });
  }, [socket, params.id]);

  return {
    isOpenSetting,
    setIsOpenSetting,
    isShowPopup,
    setIsShowPopup
  };
};
