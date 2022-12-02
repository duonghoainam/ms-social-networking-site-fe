import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../../../App';
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
    // socket.emit('disconnect', params.id);
    // socket.emit('leaveRoom', params['*']);
    dispatch(getAllConversations())
      .unwrap()
      .then((resultValue) => {})
      .catch((rejectedValue) => {});
    setIsOpenSetting(false);
    navigate(`${id}`);
  }
  useEffect(() => {
    socket.on('connect', () => {
      // socket.on('afterCall', (mess) => {
      //   console.log('messsage', mess);
      // });

      // socket.emit('call', 'conversation.getConversationOfMine', function (err: any, res: any) {
      //   if (err != null) {
      //     console.error(err);
      //   } else {
      //     console.log('call success:', res);
      //   }
      // });
      socket.on('afterCall', (mess) => {
        console.log('messsage', mess);
      });

      // socket.emit('createMessage', { name: 'hello' }, function (err: any, res: any) {
      //   if (err != null) {
      //     console.error(err);
      //   } else {
      //     console.log('call success:', res);
      //   }
      // });
    });
  }, []);

  // useEffect(() => {
  //   // console.log(id);
  //   // console.log(params);
  //   // socket.on('recieveNotice', (member) => {
  //   //   dispatch(getAllConversations())
  //   //     .unwrap()
  //   //     .then((resultValue) => {})
  //   //     .catch((rejectedValue) => {});
  //   // });
  //   // socket.emit('message', { data: 'message' });
  //   // return () => {
  //   //   // socket.off('reieveNotice');
  //   //   console.log('client Off');
  //   // };
  // }, [socket]);

  useEffect(() => {
    dispatch(getAllConversations())
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
