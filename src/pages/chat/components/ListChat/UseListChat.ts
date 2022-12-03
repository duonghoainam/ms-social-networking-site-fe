import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../../../../app/state.type';
import { useAppDispatch } from '../../../../app/store';
import { getAllConversations } from '../../state/chatAction';
import { IConversation } from '../../Types/IConversation';
import { IUserInfo } from '../../Types/IUserInfo';

interface UseListChatR {
  handleClick: any;
  conversations: IConversation[];
  currentUser: IUserInfo;
}

export const useListChat = (setIsOpenSetting: any): UseListChatR => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const conversations = useSelector((state: AppState) => state.chat.conversations);
  const currentUser = useSelector((state: AppState) => state.auth.currentUser);
  // const params = useParams();

  function handleClick(id: string): void {
    dispatch(getAllConversations(currentUser._id))
      .unwrap()
      .then((resultValue) => {})
      .catch((rejectedValue) => {});
    setIsOpenSetting(false);
    navigate(`${id}`);
  }
  useEffect(() => {
    dispatch(getAllConversations(currentUser._id))
      .unwrap()
      .then((resultValue) => {})
      .catch((rejectedValue) => {});
  }, []);

  return {
    handleClick,
    conversations,
    currentUser
  };
};
