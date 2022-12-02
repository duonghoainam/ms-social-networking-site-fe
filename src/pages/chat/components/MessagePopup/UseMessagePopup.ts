// import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../app/state.type';
import { useAppDispatch } from '../../../../app/store';
import { resetTag } from '../../state/chatSlice';

interface useMessagePopupRes {
  handleClick: any;
  handleClosePopup: any;
  handleAdd: any;
  tags: any[];
}

export const useMessagePopup = (setIsShowPopup: any): useMessagePopupRes => {
  // const currentUser = useSelector((state: AppState) => state.auth.current);
  // const userContact = useSelector((state: AppState) => state.chat.userFollowing);
  const dispatch = useAppDispatch();
  const tags = useSelector((state: AppState) => state.chat.tags);
  // const conversations = useSelector((state: AppState) => state.chat.conversations);
  // const [searchValue, setSearchValue] = useState('');
  // const [bruh, setBruh] = useState([]);

  function handleClick(): void {
    // let exist = [];
    // if (conversations.length !== 0) {
    //   exist = conversations.filter((conversation: any) => {
    //     const condition1 = conversation.members.length - 1 === tags.length;
    //     if (condition1) {
    //       const tagIds = tags.map((tag: any) => tag._id);
    //       const condition2 = tagIds.every((tagId: any) => {
    //         return conversation.members.some((member) => {
    //           return member._id === tagId;
    //         });
    //       });
    //       if (condition2) {
    //         return true;
    //       } else {
    //         return false;
    //       }
    //     } else {
    //       return false;
    //     }
    //   });
    // }
    // if (exist.length !== 0) {
    //   navigate(`${exist[0]._id}`);
    // } else {
    //   dispatch(createConversation({ users: tags }))
    //     .unwrap()
    //     .then((resultValue) => {
    //       navigate(`${resultValue.conversation._id}`);
    //     })
    //     .catch((rejectedValue) => console.log(rejectedValue));
    // }
    // handleClosePopup();
  }

  function handleClosePopup(): void {
    dispatch(resetTag());
    setIsShowPopup(false);
  }

  // useEffect(() => {
  //   dispatch(getUserContact())
  //     .unwrap()
  //     .then((resultValue) => console.log(resultValue))
  //     .catch((rejectedValue) => console.log(rejectedValue));
  //   console.log(tags);
  // }, []);

  // const handleSearch = (value) => {
  //   setSearchValue(value);
  //   const searchUser = listUser.filter((user) => {
  //     console.log(user);
  //     if (user.name.toLowerCase().includes(value.toLowerCase())) {
  //       return user;
  //     }
  //   });
  //   console.log(searchUser);
  //   setBruh(searchUser);
  // };

  function handleAdd(): void {
    (async () => {
      // try {
      //   const usersId = tags.map((tag) => tag._id);
      //   const result = await dispatch(
      //     addUserIntoCon({ usersId, conversationId: params.id })
      //   ).unwrap();
      //   const memberNames = tags.map((tag) => tag.name).join(', ');
      //   const newMessage = await dispatch(
      //     createMessage({
      //       content: `${currentUser.name} đã thêm ${memberNames} vào cuộc trò chuyện`,
      //       conversationId: params.id
      //     })
      //   ).unwrap();
      //   socket.emit('sendMessage', newMessage.newMessage);
      //   socket.emit('sendNotice', result.newConversation.members);
      //   setIsOpenSetting(false);
      //   handleClosePopup();
      // } catch (error) {
      //   throw error;
      // }
    })().catch((error: any) => console.log(error));
  }

  return {
    handleClick,
    handleClosePopup,
    handleAdd,
    tags
  };
};
