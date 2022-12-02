import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { socket } from '../../../../App';
import { AppState } from '../../../../app/state.type';
import { useAppDispatch } from '../../../../app/store';
import useImageUpload from '../../../../hooks/useImageUpload';
import { removeUserInCon } from '../../state/chatAction';
import { IConversation } from '../../Types/IConversation';

interface useChatSettingReturn {
  conversationAvt: string;
  isClosePopup: boolean;
  isTyping: boolean;
  text: string;
  image: string;
  isShowMessagePopup: boolean;
  uploadImage: any;
  handleFileChange: any;
  handleKeyDown: any;
  handleClosePopup: any;
  handleOpenPopup: any;
  handleChange: any;
  handleDeleteCon: any;
  setIsShowMessagePopup: any;
  handleSubmit: any;
}

export const useChatSetting = (currentConversation: IConversation): useChatSettingReturn => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state: AppState) => state.auth.currentUser);
  const [conversationAvt, setConversationAvt] = useState('');
  const [isClosePopup, setIsClosePopup] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [isShowMessagePopup, setIsShowMessagePopup] = useState(false);
  const uploadImage = useImageUpload();

  async function handleDeleteCon(): Promise<void> {
    try {
      await dispatch(
        removeUserInCon({
          conversationId: params.id,
          userId: currentUser._id
        })
      )
        .unwrap()
        .then((resultValue) => console.log(resultValue))
        .catch((rejectedValue) => console.log(rejectedValue));
      //   const newMessage = await dispatch(
      //     createMessage({
      //       content: `${currentUser.name} đã rời khỏi cuộc trò chuyện`,
      //       conversationId: params.id
      //     })
      //   ).unwrap();
      //   socket.emit('sendNotice', currentConversation?.members);
      //   socket.emit('sendMessage', newMessage.newMessage);
      navigate('/messenger');
    } catch (error) {
      console.log({ error });
    }
  }

  function handleClosePopup(): void {
    setIsClosePopup(true);
  }

  function handleOpenPopup(): void {
    setIsClosePopup(false);
  }

  function handleChange(e: React.FormEvent<HTMLInputElement>): void {
    if (
      e.currentTarget.value != null &&
      e.currentTarget.value !== '' &&
      e.currentTarget.value !== undefined
    ) {
      setIsTyping(true);
      setText(e.currentTarget.value);
    } else {
      setIsTyping(false);
      setText('');
    }
  }

  function handleSubmit(): void {
    // dispatch(changeConversationName({ id: params.id as string, newName: text }))
    //   .unwrap()
    //   .catch((error: any) => console.error(error));
    // (async () => {
    //   //   socket.emit('sendMessage', newMessage.newMessage);
    //   //   socket.emit('sendNotice', currentConversation?.members);
    //   //   setText('');
    //   //   setIsTyping(false);
    //   //   setIsOpenSetting(false);
    // })().catch((error: any) => console.log(error));
    socket.emit(
      'updateConversation',
      'conversation.updateConversationName',
      { id: params.id as string, newName: text },
      function (err: any, res: any) {
        if (err != null) {
          console.error(err);
        } else {
          console.log('deleted message success:', res);
        }
      }
    );
  }

  function handleKeyDown(e: any): void {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  }

  function handleFileChange(e: any): void {
    setImage(window.URL.createObjectURL(e.target.files[0]));
    setConversationAvt(window.URL.createObjectURL(e.target.files[0]));
    uploadImage(e.target.files[0])
      .then((value: any) => {
        socket.emit(
          'updateConversation',
          'conversation.updateConversationAvatar',
          {
            id: params.id as string,
            newAvatar: value
          },
          function (err: any, res: any) {
            if (err != null) {
              console.error(err);
            } else {
              console.log('deleted message success:', res);
            }
          }
        );
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  //   function genConversationName(
  //     conversation: { name: string; members: any[] },
  //     currentUserId: string
  //   ): string {
  //     if (conversation != null) {
  //       if (conversation.name != null) return conversation.name;
  //       else if (conversation.members != null) {
  //         const otherMembers = conversation.members.filter((mem: any) => mem._id !== currentUser._id);
  //         if (otherMembers.length === 0) return conversation.members[0].name;
  //         else {
  //           const otherNames = otherMembers.map((mem: any) => mem.name);
  //           return otherNames.join(', ');
  //         }
  //       } else return 'Cuộc trò chuyện';
  //     } else return 'Cuộc trò chuyện';
  //   }

  useEffect(() => {
    const avt = genConversationAvatar();
    setConversationAvt(avt);
  }, []);

  const genConversationAvatar = (): string => {
    if (currentConversation != null) {
      if (
        currentConversation.avatar != null &&
        currentConversation.avatar !== '' &&
        currentConversation.avatar !== undefined
      )
        return currentConversation.avatar;
      else if (currentConversation.members != null && currentConversation.members.length === 2) {
        const user = currentConversation.members.find((user: any) => user._id !== currentUser._id);
        if (user?.avatar != null) return user.avatar;
        else return 'https://cdn-icons-png.flaticon.com/512/134/134914.png';
      } else return 'https://cdn-icons-png.flaticon.com/512/134/134914.png';
    } else return 'https://cdn-icons-png.flaticon.com/512/134/134914.png';
  };

  return {
    conversationAvt,
    isClosePopup,
    isTyping,
    text,
    image,
    isShowMessagePopup,
    handleSubmit,
    uploadImage,
    handleFileChange,
    handleKeyDown,
    handleClosePopup,
    handleOpenPopup,
    handleChange,
    handleDeleteCon,
    setIsShowMessagePopup
  };
};
