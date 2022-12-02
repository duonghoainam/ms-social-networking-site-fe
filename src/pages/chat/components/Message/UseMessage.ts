import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppState } from '../../../../app/state.type';
import { IConversation } from '../../Types/IConversation';
import { IMessage } from '../../Types/IMessage';

interface UseMessageReturn {
  currentUser: any;
  currentConversation: IConversation;
  isClosePopup: boolean;
  handleClosePopup: any;
  handleDeleteMsg: any;
  setIsClosePopup: any;
}

export const UseMessage = (message: IMessage, handleDeleteMessage: any): UseMessageReturn => {
  const currentUser = useSelector((state: AppState) => state.auth.currentUser);
  const params = useParams();
  const currentConversation = useSelector((state: any) => state.chat.conversations).find(
    (item: any) => item._id === params.id
  );
  const [isClosePopup, setIsClosePopup] = useState(true);

  function handleClosePopup(): void {
    setIsClosePopup(true);
  }

  function handleDeleteMsg(): any {
    handleDeleteMessage(message._id);
    setIsClosePopup(true);
  }

  return {
    currentUser,
    currentConversation,
    isClosePopup,
    handleClosePopup,
    handleDeleteMsg,
    setIsClosePopup
  };
};
