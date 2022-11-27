import './styles.scss';
import { AppState } from '../../../../app/state.type';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../app/store';
import { removeFollow, addActiveId } from '../../profileSlice';

export const useFollowerItem = (user: any, setShowModal: any): any => {
  const { _id, name, avatar, email } = user;
  const dispatch = useAppDispatch();

  const authUserId = useSelector((state: AppState) => state.auth.current._id);
  const currentUserId = useSelector((state: AppState) => state.user.userInfo._id);

  const handleRemoveFollow = async (e: any): Promise<void> => {
    e.stopPropagation();
    const action = removeFollow(_id);
    await dispatch(action);
  };

  const handleDirectToAccount = async (e: any): Promise<void> => {
    e.stopPropagation();
    setShowModal(false);
    const action = addActiveId(_id);
    await dispatch(action);
  };
  return {
    _id,
    name,
    avatar,
    email,
    authUserId,
    currentUserId,
    handleRemoveFollow,
    handleDirectToAccount
  };
};
