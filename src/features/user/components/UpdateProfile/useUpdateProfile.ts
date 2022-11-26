import { useState } from 'react';

import { useSelector } from 'react-redux';

import './styles.scss';
import { AppState } from '../../../../app/state.type';

// import { updateUser } from '../../profileSlice';
// import { updateCurrentUser } from '../../../auth/authSlice';

// import useImageUpload from '../../../../hooks/useImageUpload';

// eslint-disable-next-line no-unused-vars
export const useUpdateProfile = (setShowModal: any): any => {
  //   const dispatch = useDispatch();
  //   const uploadImage = useImageUpload();

  const UserState = useSelector((state: AppState) => state.user.userInfo);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [userInfo, setUserInfo] = useState(UserState);

  const { name, email, mobile, role, avatar } = userInfo;

  //   const [setImageAvt] = useState(avatar);

  //   const onChangeUserInfo = (e): any => {
  //     setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  //   };

  //   const handleFileChange = async (e): any => {
  //     const image = await uploadImage(e.target.files[0]);
  //     setImageAvt(image);
  //   };

  //   const onSubmit = async (e): any => {
  //     e.preventDefault();
  //     const action = updateUser({ ...userInfo, avatar: imageAvt });
  //     const result = await dispatch(action).unwrap();
  //     dispatch(updateCurrentUser(result.user));
  //     alert(result.message);
  //     setShowModal(false);
  //   };
  return {
    name,
    email,
    mobile,
    role,
    avatar
    // onChangeUserInfo,
    // handleFileChange,
    // onSubmit
  };
};
