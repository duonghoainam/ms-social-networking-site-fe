/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useImageUpload from '../../../../hooks/useImageUpload';
import { updateAvt } from '../../profileSlice';
import { AppState } from '../../../../app/state.type';

export const useChangeProfilePopup = ({ props }: any): any => {
  const currentUser = useSelector((state: AppState) => state.auth.current);
  //   const uploadImage = useImageUpload();
  //   const dispatch = useDispatch();
  //   const handleFileChange = async (e) => {
  //     const image = await uploadImage(e.target.files[0]);
  //     await dispatch(updateAvt({ avatar: image }));
  //     props.setShowModal(false);
  //   };

  //   const handleCancle = () => {
  //     props.setShowModal(false);
  //   };
  return {};
};
