import { useSelector } from 'react-redux';
import { AppState } from '../../../../app/state.type';

export const useChangeProfilePopup = ({ props }: any): any => {
  const currentUser = useSelector((state: AppState) => state.login.current);

  const handleFileChange = async (e: any): Promise<void> => {
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
