import TimeAgo from 'javascript-time-ago';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatAPI from '../../../../api/chat/ChatApi';
import { socket } from '../../../../App';
import { IConversation } from '../../Types/IConversation';
import { IMessage } from '../../Types/IMessage';

export const useSingleChat = (
  conversation: IConversation,
  handleClick: any,
  currentUser: any
): useSingleChatType => {
  const [active, setActive] = useState(false);
  const [messages, setMessages] = useState();
  const [conversationName, setConversationName] = useState('');
  const [conversationAvatar, setConversationAvatar] = useState('');
  const params = useParams();
  // console.log({ param: params }, { conId: conversation._id });
  const timeAgo = new TimeAgo('en-US');

  function handleClickSingleChat(): void {
    setActive(true);
    handleClick(conversation._id);
  }

  useEffect(() => {
    socket.on('newMessage', function (data: any) {
      if (data.conversation === conversation._id) {
        setMessages(data);
      }
    });

    socket.on('seenMessage', function (data: any) {
      if (data.conversation === conversation._id) {
        setMessages(data);
        (async () => {
          const response = await ChatAPI.getLastMessageInCon(conversation._id);
          setMessages(response.data);
        })().catch((error: any) => console.log(error));
      }
    });

    (async () => {
      const response = await ChatAPI.getLastMessageInCon(conversation._id);
      setMessages(response.data);
    })().catch((error: any) => console.log(error));
  }, [conversation]);

  useEffect(() => {
    setActive(false);
    if (params['*'] === conversation._id) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [params]);

  useEffect(() => {
    if (socket.connected) {
      socket.emit('call', 'rooms.join', { join: conversation._id });
    } else {
      socket.on('connect', function () {
        socket.emit('call', 'rooms.join', { join: conversation._id });
      });
      socket.connect();
    }
  }, []);

  const genConversationName = (): string => {
    if (conversation != null) {
      if (conversation.name != null && conversation.name !== '' && conversation.name !== undefined)
        return conversation.name;
      else if (conversation.members != null) {
        const otherMembers = conversation.members.filter((mem: any) => mem.id !== currentUser.id);
        if (otherMembers.length === 0) return conversation.members[0].name;
        else {
          const otherNames = otherMembers.map((mem: any) => mem.name);
          return otherNames.join(', ');
        }
      } else return 'Cuộc trò chuyện';
    } else return 'Cuộc trò chuyện';
  };

  const genConversationAvatar = (): string => {
    if (conversation != null) {
      if (
        conversation.avatar != null &&
        conversation.avatar !== '' &&
        conversation.avatar !== undefined
      )
        return conversation.avatar;
      else if (conversation.members != null && conversation.members.length === 2) {
        const user = conversation.members.find((user) => user.id !== currentUser.id);
        if (user?.avatar != null) return user.avatar;
        else return 'https://cdn-icons-png.flaticon.com/512/134/134914.png';
      } else return 'https://cdn-icons-png.flaticon.com/512/134/134914.png';
    } else return 'https://cdn-icons-png.flaticon.com/512/134/134914.png';
  };

  useEffect(() => {
    const name = genConversationName();
    const avt = genConversationAvatar();
    setConversationName(name);
    setConversationAvatar(avt);
  }, [conversation]);

  return {
    active,
    messages,
    timeAgo,
    handleClickSingleChat,
    conversationName,
    conversationAvatar
  };
};

interface useSingleChatType {
  active: boolean;
  messages?: IMessage;
  timeAgo: TimeAgo;
  handleClickSingleChat: any;
  conversationName: string;
  conversationAvatar: string;
}
