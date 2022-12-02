import React, { ReactElement, useState } from 'react';
import './Header.scss';
import {
  HomeOutlined,
  AddCircleOutline,
  WhatsApp,
  AccountCircleOutlined,
  LocalDiningOutlined,
  SearchOutlined,
  Close
} from '@material-ui/icons';
import IMAGES from '../../assets/images/imageStore';
import { useNavigate, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logout } from '../../pages/auth/authSlice';
import { addActiveId } from '../../pages/user/profileSlice';
import { AppState } from '../../app/state.type';
import { useAppDispatch } from '../../app/store';
import SingleDestination from '../../pages/chat/components/SingleDestination/SingleDestination';

const Header = (): ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChangeToProfilePage = (): void => {
    const activeUserId = useSelector((state: AppState) => state.auth.currentUser.id);
    const action = addActiveId(activeUserId);
    dispatch(action);
  };

  // const [refresh, setFefresh] = useState(false);
  // const [numNotifications, setNumNotifications] = useState(0);
  const currentUser = useSelector((state: AppState) => state.auth.currentUser);
  const listUser = useSelector((state: AppState) => state.auth.listUser).filter(
    (user: any) => user.id !== currentUser.id
  );

  // const { listNotification } = useSelector((state: AppState) => state.home);

  // useEffect(() => {
  //   setNumNotifications(0);
  //   listNotification.forEach((item: any) => {
  //     if (item.isSeen === false) {
  //       console.log(item);
  //       setNumNotifications((prev) => {
  //         return prev + 1;
  //       });
  //     }
  //   });
  // }, [listNotification]);

  const [bruh, setBruh] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (searchValue: string): void => {
    setSearchValue(searchValue);
    const searchUser = listUser.filter((user: any) => {
      if (user.name.toLowerCase().includes(searchValue.toLowerCase()) as boolean) {
        return user;
      }
      return null;
    });
    setBruh(searchUser);
  };

  // const [isShowNotificationPanel] = useState(false);

  const handleLogout = async (): Promise<void> => {
    try {
      const result = await dispatch(logout()).unwrap();
    } catch (error) {
      console.log(error);
    }
    navigate('/auth/login');
  };

  // useEffect(async () => {
  //   socket.off('receive_notification').on('receive_notification', async ({ postId }) => {
  //     console.log('Nhận được thông báo');
  //     const action = getPostById({ postId });
  //     await dispatch(action).unwrap();

  //     const action2 = getNotification();
  //     await dispatch(action2).unwrap();

  //     setFefresh(!refresh);
  //   });
  // }, [socket]);

  // const showNotificationPanel = (): void => {
  //   setIsShowNotificationPanel((prev) => {
  //     return !prev;
  //   });
  // };

  // const domNode = Usecloseoutsidetoclose(() => {
  //   setIsShowNotificationPanel(false);
  // });

  // const handleSeenAll = async (): Promise<void> => {
  //   const action = seenAllNotification();
  //   await dispatch(action).unwrap();
  // };

  const handleDirectToProfile = async (userId: string): Promise<void> => {
    const action = addActiveId(userId);
    dispatch(action);
    navigate('/account');
    setSearchValue('');
  };

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
            onChange={(e) => handleSearch(e.target.value)}
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
                {bruh.length !== 0 ? (
                  bruh.map((user: any, index: number) => (
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    <div key={index} onClick={async () => await handleDirectToProfile(user.id)}>
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
            <WhatsApp />
          </NavLink>
          <NavLink to="/new">
            <AddCircleOutline />
          </NavLink>
        </div>

        <div className="header__profile">
          <span>{currentUser?.name}</span>
          <img src={currentUser?.avatar} alt="" />
          <div className="header__profile__list" id="header__profile__list">
            <ul>
              <li>
                <AccountCircleOutlined />
                <NavLink onClick={handleChangeToProfilePage} to="/account" className="profile">
                  Trang cá nhân
                </NavLink>
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
