import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { socket } from '../../../../App';
import useImageUpload from '../../../../hooks/useImageUpload';
import { IConversation } from '../../types/IConversation';

interface useChatSettingReturn {
  conversationAvt: string
  isClosePopup: boolean
  isTyping: boolean
  text: string
  image: string
  isShowMessagePopup: boolean
  uploadImage: any
  handleFileChange: any
  handleKeyDown: any
  handleClosePopup: any
  handleOpenPopup: any
  handleChange: any
  handleDeleteCon: any
  setIsShowMessagePopup: any
  handleSubmit: any
}

export const useChatSetting = (currentConversation: IConversation): useChatSettingReturn => {
  const params = useParams();
  // const currentUser = useSelector((state: AppState) => state.auth.currentUser);
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const [conversationAvt, setConversationAvt] = useState('');
  const [isClosePopup, setIsClosePopup] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [isShowMessagePopup, setIsShowMessagePopup] = useState(false);

  function handleDeleteCon (): void {
    socket.emit('leaveConversation', { conversation: params.id, member: currentUser.id });
    handleClosePopup();
    socket.emit(
      'createMessage',
      {
        content: 'Đã rời khỏi cuộc trò chuyện',
        conversation: params.id as string
      },
      function (err: any, res: any) {
        if (err != null) {
          console.error(err);
        } else {
          console.log('call success:', res);
        }
      }
    );
  }

  function handleClosePopup (): void {
    setIsClosePopup(true);
  }

  function handleOpenPopup (): void {
    setIsClosePopup(false);
  }

  function handleChange (e: React.FormEvent<HTMLInputElement>): void {
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

  function handleSubmit (): void {
    socket.emit(
      'updateConversation',
      'conversations.updateConversationName',
      { id: params.id as string, newName: text },
      function (err: any, res: any) {
        if (err != null) {
          console.error(err);
        } else {
          console.log('deleted message success:', res);
        }
      }
    );
    socket.emit(
      'createMessage',
      {
        content: `Đã thay đổi ảnh tên cuộc trò chuyện thành ${text}`,
        conversation: params.id as string
      },
      function (err: any, res: any) {
        if (err != null) {
          console.error(err);
        } else {
          console.log('call success:', res);
        }
      }
    );
  }

  function handleKeyDown (e: any): void {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  }

  function handleFileChange (e: any): void {
    setImage(window.URL.createObjectURL(e.target.files[0]));
    setConversationAvt(window.URL.createObjectURL(e.target.files[0]));
    useImageUpload(e.target.files[0])
      .then((value: any) => {
        socket.emit(
          'updateConversation',
          'conversations.updateConversationAvatar',
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

        socket.emit(
          'createMessage',
          {
            content: 'Đã thay đổi ảnh đại diện của nhóm',
            conversation: params.id as string
          },
          function (err: any, res: any) {
            if (err != null) {
              console.error(err);
            } else {
              console.log('call success:', res);
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
  //         const otherMembers = conversation.members.filter((mem: any) => mem._id !== currentUser.id);
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
      ) { return currentConversation.avatar; } else if (currentConversation.members != null && currentConversation.members.length === 2) {
        const user = currentConversation.members.find((user: any) => user._id !== currentUser.id);
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
    handleFileChange,
    handleKeyDown,
    handleClosePopup,
    handleOpenPopup,
    handleChange,
    handleDeleteCon,
    setIsShowMessagePopup
  };
};
