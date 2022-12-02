import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { AppState } from '../../../app/state.type';
import { useAppDispatch } from '../../../app/store';
// import { getNotification } from '../../home/homeSlice';
// import { getPosts } from '../state/chatAction';
interface useChatPageType {
  isOpenSetting: boolean;
  setIsOpenSetting: React.Dispatch<React.SetStateAction<boolean>>;
  isShowPopup: boolean;
  setIsShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useChatPage = (): useChatPageType => {
  const dispatch = useAppDispatch();
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const [isShowPopup, setIsShowPopup] = useState(false);
  // const currentUser = useSelector((state: AppState) => state.auth.current);
  // const params = useParams();
  useEffect(() => {
    document.title = 'Inbox • Chats';
  }, []);

  // const dispatch = useDispatch();
  // useEffect(() => {
  //     socket.emit('joinMessenger', currentUser._id);
  // }, [params]);

  useEffect(() => {
    document.title = 'Inbox • Chats';
  }, []);

  useEffect(() => {
    (async () => {
      // const action2 = getNotification();
      // await dispatch(action2).unwrap();
    })().catch((error: any) => console.log(error));
  }, []);

  return {
    isOpenSetting,
    setIsOpenSetting,
    isShowPopup,
    setIsShowPopup
  };
};
