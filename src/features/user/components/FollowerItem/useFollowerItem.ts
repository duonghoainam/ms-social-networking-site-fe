import './styles.scss';
import { AppState } from '../../../../app/state.type';
import { useSelector } from 'react-redux';

export const useFollowerItem = (user: any, setShowModal: any): any => {
  const { _id, name, avatar, email } = user;
  //   const dispatch = useDispatch();

  const authUserId = useSelector((state: AppState) => state.auth.current._id);
  const currentUserId = useSelector((state: AppState) => state.user.userInfo._id);

  //   const handleRemoveFollow = async (e) => {
  //     e.stopPropagation();
  //     console.log(_id);
  //     const action = removeFollow(_id);
  //     await dispatch(action);
  //   };

  //   const handleDirectToAccount = (e) => {
  //     e.stopPropagation();
  //     setShowModal(false);
  //     const action = addActiveId(_id);
  //     dispatch(action);
  //   };
  return {
    _id,
    name,
    avatar,
    email,
    authUserId,
    currentUserId
    // handleRemoveFollow,
    // handleDirectToAccount
  };
};
