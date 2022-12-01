import React, { ReactElement } from 'react';
import { Button } from 'react-bootstrap';
import { useUserHeader } from './useUserHeader';
import FollowList from '../FollowList';
import Dialog from '../Dialog';
import ChangeProfilePhotoPopup from '../ChangeProfilePhotoPopup';
import './style.scss';

const UserHeader = (): ReactElement => {
  const {
    current,
    showModal,
    setShowModal,
    setShowModalFollow,
    showModalFollow,
    isFollowed,
    isShowFollowers,
    isShowChangeAvataPopup,
    setIsShowChangeAvataPopup,
    authUserId,
    UserInfo,
    posts,
    totalFollower,
    totalFollowing,
    handleFollow,
    handleShowFollow,
    handleChangeAvt,
    handleGuiTinNhan
  } = useUserHeader();

  return (
    <div>
      {(Boolean(showModal)) && <Dialog showModal={showModal} setShowModal={setShowModal} />}
      {(Boolean(showModalFollow)) && (
        <FollowList
          showModal={showModalFollow}
          setShowModal={setShowModalFollow}
          isFollowers={isShowFollowers}
        />
      )}
      {(Boolean(isShowChangeAvataPopup)) && (
        <ChangeProfilePhotoPopup
          showModal={isShowChangeAvataPopup}
          setShowModal={setIsShowChangeAvataPopup}
        />
      )}
      <div className="header__container ">
        <div className="d-flex flex-row justify-content-center">
          <div className="p-2">
            <div
              className="avatar__container"
              onClick={() => handleChangeAvt()}
            >
              <img src={UserInfo.avatar} />
            </div>
          </div>
          <div className="p-2 ">
            <div className="d-flex flex-column user__info ">
              <div className="p-0 ">
                <div className="">
                  <div className="d-flex  flex-row ">
                    <div className="p-2 username ">{UserInfo.name}</div>

                    {UserInfo._id === current._id ? (
                      <></>
                    ) : (
                      <>
                        {' '}
                        <Button
                          variant="outline-success"
                          onClick={() => handleGuiTinNhan(current, UserInfo)}
                        >
                          Nhắn tin
                        </Button>
                        <Button
                          variant="outline-success"
                          onClick={() => handleFollow(UserInfo._id)}
                        >
                          {(Boolean(isFollowed)) ? 'Bỏ theo dõi' : 'Theo dõi'}
                        </Button>
                      </>
                    )}

                    {authUserId === UserInfo._id && (
                      <Button variant="outline-success"
                      onClick={() => setShowModal(true)}
                      >
                        Sửa thông tin
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-0 ">
                <div className="d-flex  flex-row">
                  <div className="p-2 numpost">
                    {' '}
                    <span>{posts?.length}</span>Bài viết
                  </div>
                  <div
                    className="p-2 follower"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleShowFollow(true)}
                    >
                    <span>{totalFollower}</span>Người theo dõi
                  </div>
                  <div
                    className="p-2 following"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleShowFollow(false)}
                    >
                    <span>{totalFollowing}</span>Đang theo dõi
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
