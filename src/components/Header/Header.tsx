/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { ReactElement, useEffect, useState, useRef } from 'react';
import './Header.scss';
import {
  HomeOutlined,
  AddCircleOutline,
  AccountCircleOutlined,
  LocalDiningOutlined,
  SearchOutlined,
  Close,
  Phone
} from '@material-ui/icons';
import IMAGES from '../../assets/images/imageStore';
import { useNavigate, NavLink } from 'react-router-dom';
import SingleDestination from '../../pages/Chat/components/SingleDestination/SingleDestination';

import userAPI from '../../api/user/UserApi';
import Notification from '../Notification/notification';
import { socket } from '../../utils/api.util';
import { getAllConversations } from '../../pages/Chat/state/chatAction';
import { IConversation } from '../../pages/Chat/types/IConversation';
import { addMessage, newConversation, updateConversation } from '../../pages/Chat/state/chatSlice';
import { useSelector } from 'react-redux';
import { AppState } from '../../app/state.type';
import { useAppDispatch } from '../../app/store';

const Header = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const currentUserId: string = currentUser.id;
  const conversations = useSelector((state: AppState) => state.chat.conversations);
  const [unReadConversations, setUnReadConversations] = useState(0);

  const navigateToProfile = (): void => {
    navigate(`/user/${currentUserId}`);
    setSearchValue('');
  };

  const directToTargetUser = (userId: string): void => {
    navigate(`/user/${userId}`);
  };

  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout>>()

  const handleSearchValueChange = (searchValue: string): void => {
    setSearchValue(searchValue);
    if (typingTimeoutRef.current != null) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      // Fetch new users data to update users state
      void fetchNewUsers(searchValue);
    }, 500);
  };

  const fetchNewUsers = async (input: string): Promise<void> => {
    if (input === '') return;
    const result = await userAPI.searchUsers(input);
    setUsers(result.data);
  };

  const handleLogout = async (): Promise<void> => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  useEffect(() => {
    if (socket.connected) {
      socket.emit('call', 'rooms.join', { join: currentUser.id });
    } else {
      socket.on('connect', function () {
        socket.emit('call', 'rooms.join', { join: currentUser.id });
      });
      socket.connect();
    }

    dispatch(getAllConversations(currentUser.id))
      .unwrap()
      .then((resultValue) => {})
      .catch((rejectedValue) => {});
  }, []);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    socket.removeAllListeners('updateConversation');
    socket.removeAllListeners('newConversation');
    socket.removeAllListeners('newMessage');

    socket.on('updateConversation', function (data: any) {
      dispatch(updateConversation(data));
    });
    socket.on('newConversation', function (data: IConversation) {
      const memberIds = data.members.map((member) => member.id);
      if (memberIds.some((memberId) => memberId === currentUser.id)) {
        dispatch(newConversation(data));
      }
    });
    socket.on('newMessage', function (data: any) {
      dispatch(addMessage(data));
      if (data.sender !== currentUser.id) {
        const currentConversation = conversations.find(con => con._id === data.conversation)
        if (currentConversation != null && currentConversation !== undefined) {
          const newConversation = { ...currentConversation, hasUnreadMessage: true }
          dispatch(updateConversation(newConversation));
        }
      }
    });

    conversations.forEach(conversation => {
      socket.emit('call', 'rooms.join', { join: conversation._id });
    });

  }, [conversations]);

  useEffect(() => {
    const numOfReadConversations = conversations.filter(c => c.hasUnreadMessage).length;
    setUnReadConversations(numOfReadConversations);
  }, [conversations])


  return (
    <>
      <header className="header">
        <div className="header__logo" onClick={() => navigate('/')}>
          <img src={IMAGES.logo} alt="" />
        </div>
        <div className="header__search">
          <SearchOutlined className="concho" />
          <input
            type="text"
            placeholder="search..."
            onChange={(e) => handleSearchValueChange(e.target.value)}
            value={searchValue}
          />
          {searchValue !== '' && (
            <>
              <div
                style={{
                  backgroundColor: '#c7c7c7',
                  position: 'absolute',
                  right: 15,
                  height: '25px',
                  width: '25px',
                  borderRadius: '50%',
                  padding: '5px',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer'
                }}
                onClick={() => setSearchValue('')}>
                <Close fontSize="large" htmlColor="white" />
              </div>
              <div className="header__search__triangleUp"></div>
              <div className="header__search__resultContainer">
                {users.length !== 0 ? (
                  users.map((user: any, index: number) => (
                    <div key={index} onClick={() => directToTargetUser(user.id)}>
                      <SingleDestination follow={user} forRenderSearch={true} key={index} />
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      textAlign: 'center',
                      width: '100%',
                      marginBottom: '15px',
                      color: 'grey',
                      fontStyle: 'italic'
                    }}>
                    Không tìm thấy kết quả phù hợp
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="header__icons">
          <NavLink to="/">
            <HomeOutlined />
          </NavLink>
          <NavLink to="/messenger">
            <div style={{ position: 'relative' }}>
              <Phone />
              {unReadConversations > 0 ? (
              <div className="notification__number">{unReadConversations}</div>
              ) : (
              <></>
              )}
            </div>
          </NavLink>
          <NavLink to="/new">
            <AddCircleOutline />
          </NavLink>
          <Notification />
        </div>

        <div className="header__profile">
          <span>{currentUser?.name}</span>
          <img src={currentUser?.avatar} alt="" />
          <div className="header__profile__list" id="header__profile__list">
            <ul>
              <li>
                <AccountCircleOutlined />
                <a onClick={navigateToProfile} className="profile">
                  Trang cá nhân
                </a>
              </li>
              <li id="logout" onClick={handleLogout}>
                <LocalDiningOutlined />
                <i> Đăng xuất</i>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
