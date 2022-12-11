// import { useState } from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { socket } from '../../../../App';
import { AppState } from '../../../../app/state.type';
import { useAppDispatch } from '../../../../app/store';
import { getUserContact } from '../../state/chatAction';
import { resetTag } from '../../state/chatSlice';
import { IConversation } from '../../types/IConversation';

interface useMessagePopupRes {
  handleClick: any;
  handleClosePopup: any;
  handleAdd: any;
  tags: any[];
  searchValue: string;
  handleSearchChange: any;
  userContact: any;
  renderContact: any[];
}

export const useMessagePopup = (
  setIsShowPopup: any,
  type: string,
  listUserId: any[]
): useMessagePopupRes => {
  // const currentUser = useSelector((state: AppState) => state.auth.currentUser);
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const userContact = useSelector((state: AppState) => state.chat.userFollowing);
  const conversations = useSelector((state: AppState) => state.chat.conversations);
  const intRenderContact: any[] = [];
  const [renderContact, setRenderContact] = useState(intRenderContact);
  const dispatch = useAppDispatch();
  const tags = useSelector((state: AppState) => state.chat.tags);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  function handleSearchChange(e: any): any {
    setSearchValue(e.target.value);
  }
  const params = useParams();
  function handleClick(): void {
    let exist: IConversation[] = [];
    const tagIds = tags.map((tag: any) => tag.id);
    if (conversations != null && conversations !== undefined && conversations.length !== 0) {
      exist = conversations.filter((conversation: IConversation) => {
        if (conversation.members.length - 1 === tags.length) {
          return tagIds.every((tag) => conversation.members.some((member) => member.id === tag));
        }
        return false;
      });
    }
    console.log(exist);
    if (exist.length !== 0) {
      navigate(`${exist[0]._id}`);
    } else {
      tagIds.push(currentUser.id);
      socket.emit('createConversation', {
        name: '',
        members: tagIds,
        createdBy: currentUser.id,
        avatar: ''
      });
    }
    handleClosePopup();
  }

  function handleClosePopup(): void {
    dispatch(resetTag());
    setIsShowPopup(false);
  }

  useEffect(() => {
    genContact(type, listUserId);
  }, [searchValue, userContact]);

  useEffect(() => {
    dispatch(getUserContact(currentUser.id))
      .unwrap()
      .then((resultValue) => console.log(resultValue))
      .catch((rejectedValue) => console.log(rejectedValue));
  }, []);

  function handleAdd(): void {
    tags.forEach((tag) => {
      socket.emit('updateConversation', 'conversations.addMemberToConversation', {
        conversation: params.id,
        member: tag.id
      });
      socket.emit('createMessage', {
        content: `Đã thêm ${tag.name as string} vào cuộc trò chuyện`,
        conversation: params.id as string
      });
    });
    handleClosePopup();
  }

  function genContact(type: string, listUserId: any[]): void {
    if (type === 'create') {
      if (searchValue === '') {
        setRenderContact(userContact);
      } else {
        const searchUser = userContact.filter((user: any) =>
          user.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setRenderContact(searchUser);
      }
    } else if (type === 'add') {
      if (searchValue === '') {
        const afterFilter = userContact.filter(
          (item: any) => !listUserId.some((id) => id === item.id)
        );
        setRenderContact(afterFilter);
      } else {
        const searchUser = userContact.filter(
          (user: any) =>
            user.name.toLowerCase().includes(searchValue.toLowerCase()) === true &&
            !listUserId?.some((id) => id === user._id)
        );
        setRenderContact(searchUser);
      }
    } else {
      setRenderContact([]);
    }
  }

  return {
    handleClick,
    handleClosePopup,
    handleAdd,
    tags,
    searchValue,
    userContact,
    handleSearchChange,
    renderContact
  };
};
