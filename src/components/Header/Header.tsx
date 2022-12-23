/* eslint-disable @typescript-eslint/no-misused-promises */
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
import { AppState } from '../../app/state.type';
import { useAppDispatch } from '../../app/store';
import { getFollowerList, getFollowingList, getPostsByUserId, getUserById } from '../../pages/User/state/userActions';
import { logout } from '../../pages/Login/loginSlice';
import SingleDestination from '../../pages/Chat/components/SingleDestination/SingleDestination';

const Header = (): ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const listUser = useSelector((state: AppState) => state.login.listUser).filter(
    (user: any) => user.id !== currentUser.id
  );
  const handleChangeToProfilePage = async (): Promise<void> => {
    const actionGetFollowerList = getFollowerList(currentUser.id);
    await dispatch(actionGetFollowerList);

    const actionGetFollowingList = getFollowingList(currentUser.id);
    await dispatch(actionGetFollowingList);

    const actionGetUser = getUserById(currentUser.id);
    await dispatch(actionGetUser).unwrap();

    const actionGetPost = getPostsByUserId(currentUser.id);
    await dispatch(actionGetPost).unwrap();

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    navigate(`/user/${currentUser.id.toString()}`);
    setSearchValue('');
  };

  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (searchValue: string): void => {
    setSearchValue(searchValue);
    const searchUser = listUser.filter((user: any) => {
      if (user.name.toLowerCase().includes(searchValue.toLowerCase()) as boolean) {
        return user;
      }
      return null;
    });
    setUsers(searchUser);
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await dispatch(logout()).unwrap();
    } catch (error) {
      console.log(error);
    }
    navigate('/login');
  };

  const handleDirectToProfile = async (userId: string): Promise<void> => {
    const actionGetFollowerList = getFollowerList(userId);
    await dispatch(actionGetFollowerList);

    const actionGetFollowingList = getFollowingList(userId);
    await dispatch(actionGetFollowingList);

    const actionGetUser = getUserById(userId);
    await dispatch(actionGetUser).unwrap();

    const actionGetPost = getPostsByUserId(userId);
    await dispatch(actionGetPost).unwrap();
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
                {users.length !== 0 ? (
                  users.map((user: any, index: number) => (
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
                <a onClick={handleChangeToProfilePage} className="profile">
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
