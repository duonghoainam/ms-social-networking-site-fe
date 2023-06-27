import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { socket } from '../../../../utils/api.util';
import { AppState } from '../../../../app/state.type';
import { useAppDispatch } from '../../../../app/store';
import {
  getConversationMessages,
  getMoreConversationMessages,
  seenAllMessages,
  seenMessage
} from '../../state/chatAction';
import { IConversation } from '../../types/IConversation';
import { IUseChatContent } from '../../types/useChatContent.Type';
import { IImage } from '../../types/IImage.Type'
import { TypeMessage } from '../../../../constants/enums/chat-type.enum';
import useImageUpload from '../../../../hooks/useMediaUpload';
import { addMessage, updateConversation, updateMessage } from '../../state/chatSlice';
export const useChatContent = (setIsOpenSetting: any): IUseChatContent => {
  const [messageText, setMessageText] = useState<string>('');
  const conversations = useSelector((state: AppState) => state.chat.conversations);
  const messages = useSelector((state: AppState) => state.chat.messagesInConversation);
  const initialCurrentConversation: IConversation = {
    _id: '',
    name: '',
    members: [],
    detailMembers: [],
    avatar: 'string',
    updatedAt: '',
    createdAt: '',
    createdBy: '',
    hasUnreadMessage: false
  };
  const [currentConversation, setCurrentConversation] = useState(initialCurrentConversation);
  const [conversationName, setConversationName] = useState('');
  const [conversationAvatar, setConversationAvatar] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  // const currentUser = useSelector((state: AppState) => state.auth.currentUser);
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isEnough, setIsEnough] = useState(false);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([] as IImage[]);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const params = useParams();
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const chatContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const conversation = conversations?.find(
      (conversation: IConversation) => conversation._id === params.id
    ) as IConversation;
    const avt = genConversationAvatar();
    const name = genConversationName();
    setCurrentConversation(conversation);
    setConversationAvatar(avt);
    setConversationName(name);
  }, [conversations]);

  const handleScroll = async (e: any): Promise<any> => {
    if (e.target.scrollTop === 0) {
      if (!isEnough) {
        const conId = params != null ? (params.id != null ? params.id.toString() : '') : '';
        const result = await dispatch(
          getMoreConversationMessages({ id: conId, page: page + 1 })
        ).unwrap();
        if (result == null || result.length === 0) {
          setIsEnough(true);
        } else {
          setPage(page + 1);
        }
      }
    } else {
      if (
        chatContentRef.current !== null && e.target.scrollTop < (e.target.scrollHeight - e.target.offsetHeight - 10)
      ) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    }
  };

  useEffect(() => {
    const initData = async (): Promise<void> => {
      setIsEnough(false);
      await getMessagesInCons();
      await seenAll();
      setIsOpenSetting(false);
      setPage(1);
      // socket.emit('sendNotice', [currentUser]);
      // return () => {
      //   socket.emit('leaveRoom', params.id);
      // };
    };
    initData().catch((error) => console.log(error));
  }, [params.id, conversations]);

  const getMessagesInCons = async (): Promise<void> => {
    try {
      // socket.emit('joinRoom', params.id);
      dispatch(getConversationMessages({ id: params.id as string, page }))
        .unwrap()
        .then((resultValue) => {
          handleScrollBottom();
        })
        .catch((rejectedValue) => { });
    } catch (error) {
      console.log(error);
    }
  };

  const seenAll = async (): Promise<void> => {
    try {
      await dispatch(seenAllMessages({ id: params.id as string, seenBy: currentUser.id })).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const seenMess = async (id: string): Promise<any> => {
    try {
      const result = await dispatch(seenMessage({ messId: id })).unwrap();
      return result.seenMessage;
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    if (
      event.currentTarget.value != null &&
      event.currentTarget.value !== '' &&
      event.currentTarget.value !== undefined
    ) {
      setIsTyping(true);
      setMessageText(event.currentTarget.value);
    } else {
      setIsTyping(false);
      // setText('');
      setMessageText(event.currentTarget.value);
    }
  };

  const handleKeyDown = (e: any): void => {
    if (e.keyCode === 13) {
      (async () => {
        await handleSubmit();
      })().catch((error) => console.log(error));
    }
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      socket.emit(
        'createMessage',
        {
          type: TypeMessage.TEXT,
          content: messageText,
          conversation: params.id as string,
          sender: currentUser.id
        }
      );
      setMessageText('');
      setIsTyping(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteMessage = async (id: string): Promise<void> => {
    // await dispatch(deleteMessage({ id, sender: currentUser.id })).unwrap();
    socket.emit(
      'updateMessage',
      'messages.deleteRest',
      { id, sender: currentUser.id }
    );
  };

  const handleScrollBottom = (): void => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReactMessage = (messageId: string, userId: string): void => {
    socket.emit(
      'updateMessage',
      'messages.reactMessage',
      { id: messageId, reactBy: userId }
    );
  };

  const handleUnReactMessage = (messageId: string, userId: string): void => {
    socket.emit(
      'updateMessage',
      'messages.unReactMessage',
      { id: messageId, reactBy: userId }
    );
  };

  const genConversationAvatar = (): string => {
    const conversation = conversations.find(
      (conversation: IConversation) => conversation._id === params.id
    );
    if (conversation != null) {
      if (
        conversation.avatar != null &&
        conversation.avatar !== '' &&
        conversation.avatar !== undefined
      ) {
        return conversation.avatar;
      } else if (conversation.members != null && conversation.members.length === 2) {
        const user = conversation.members.find((user: any) => user.id !== currentUser.id);
        if (user?.avatar != null) return user.avatar;
        else return 'https://cdn-icons-png.flaticon.com/512/134/134914.png';
      } else return 'https://cdn-icons-png.flaticon.com/512/134/134914.png';
    } else return 'https://cdn-icons-png.flaticon.com/512/134/134914.png';
  };

  const genConversationName = (): string => {
    const conversation = conversations.find(
      (conversation: IConversation) => conversation._id === params.id
    );
    if (conversation != null) {
      if (conversation.name != null) return conversation.name;
      else if (conversation.members != null) {
        const otherMembers = conversation.members.filter((mem: any) => mem._id !== currentUser.id);
        if (otherMembers.length === 0) return conversation.members[0].name;
        else {
          const otherNames = otherMembers.map((mem: any) => mem.name);
          return otherNames.join(', ');
        }
      } else return 'Cuộc trò chuyện';
    } else return 'Cuộc trò chuyện';
  };

  const handleChangeImages = (event: any): void => {
    const files = (event.target).files;
    const imageFiles: IImage[] = [];
    if (files != null) {
      Array.from(files).forEach((file: any) => {
        imageFiles.push({
          name: file.name,
          url: window.URL.createObjectURL(file),
          size: file.size,
          type: file.type
        });
      });
    }
    setImages(imageFiles);
    if (imageFiles.length > 0) { setIsOpenPopup(true); }
  };

  const submitImageMessage = async (): Promise<void> => {
    try {
      const urls = [];
      for (const img of images) {
        const blob = await fetch(img.url).then(async r => await r.blob())
        const url = await useImageUpload(blob)
        urls.push(url);
      }
      socket.emit(
        'createMessage',
        {
          type: TypeMessage.IMAGE,
          content: JSON.stringify(urls),
          conversation: params.id as string,
          sender: currentUser.id
        }
      );
      setIsOpenPopup(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleRemoveImage = (rmImg: IImage): void => {
    const newFiles = images.filter(img => img.url !== rmImg.url)
    setImages(newFiles);
  }

  const handleClosePopup = (): void => {
    setIsOpenPopup(false);
  }

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    socket.removeAllListeners('newMessage');
    socket.removeAllListeners('updateMessage');
    socket.removeAllListeners('seenMessage');

    socket.on('newMessage', function (data: any) {
      dispatch(addMessage(data));
      let hasUnreadMessage = true;
      if (currentConversation._id === data.conversation) {
        seenAll().catch(err => console.log(err));
        hasUnreadMessage = false;
      }
      if (data.sender !== currentUser.id) {
        const oldConversation = conversations.find(con => con._id === data.conversation)
        if (oldConversation != null && oldConversation !== undefined) {
          const newConversation = { ...oldConversation, hasUnreadMessage }
          dispatch(updateConversation(newConversation));
        }
      }
      setTimeout(() => {
        handleScrollBottom();
      }, 10)
    });

    socket.on('updateMessage', function (data: any) {
      dispatch(updateMessage(data));
    });
    socket.on('seenMessage', function (data: any) {
      dispatch(updateConversation(data));
    });
  }, [currentConversation])

  return {
    messages,
    currentConversation,
    conversationAvatar,
    conversationName,
    isTyping,
    showScrollButton,
    chatContentRef,
    ref,
    messageText,
    setMessageText,
    images,
    isOpenPopup,
    handleScroll,
    handleScrollBottom,
    handleChange,
    handleDeleteMessage,
    handleKeyDown,
    seenMess,
    handleReactMessage,
    handleUnReactMessage,
    handleSubmit,
    handleChangeImages,
    submitImageMessage,
    setIsOpenPopup,
    handleRemoveImage,
    handleClosePopup
  };
};
