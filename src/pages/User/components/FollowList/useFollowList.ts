import { useSelector } from 'react-redux';
import { AppState } from '../../../../app/state.type';
import './styles.scss';

export const useFollowList = (setShowModal: any): any => {
  const { followerList, followingList } = useSelector((state: AppState) => state.user)
  // Handle
  const handleCloseDialog = (): any => {
    setShowModal(false);
  };

  return {
    followerList,
    followingList,
    handleCloseDialog
  };
};
