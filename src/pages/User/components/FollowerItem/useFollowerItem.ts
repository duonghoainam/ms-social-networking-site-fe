import './styles.scss';

export const useFollowerItem = ({ user, setShowModal }: any): any => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');

  const handleRemoveFollow = async (e: any): Promise<void> => {
    e.stopPropagation();
    // const action = removeFollow(_id);
    // await dispatch(action);
  };

  const handleDirectToAccount = async (e: any): Promise<void> => {
    e.stopPropagation();
    setShowModal(false);
    // const action = addActiveId(_id);
    // await dispatch(action);
  };
  return {
    currentUser,
    handleRemoveFollow,
    handleDirectToAccount
  };
};
