import { useSelector } from 'react-redux';
import useImageUpload from '../../../../hooks/useImageUpload';
// import { updateAvt } from '../../profileSlice';
import { AppState } from '../../../../app/state.type';
import { useAppDispatch } from '../../../../app/store';

export const useChangeProfilePopup = ({ props }: any): any => {
  const currentUser = useSelector((state: AppState) => state.login.current);

  const uploadImage = useImageUpload();
  const dispatch = useAppDispatch();

  const handleFileChange = async (e: any): Promise<void> => {
    const image = await uploadImage(e.target.files[0]);
    // await dispatch(updateAvt({ avatar: image }));
    props.setShowModal(false);
  };

  const handleCancle = (): any => {
    props.setShowModal(false);
  };
  return {
    currentUser,
    handleFileChange,
    handleCancle
  };
};
