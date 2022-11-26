import { useSelector } from 'react-redux';
// import { getCommentsByPostID, getPostById, ShowDetail } from '../../../home/homeSlice';

import './styles.scss';
// import { socket } from '../../../../App';
import { AppState } from '../../../../app/state.type';

export const usePostItem = (): any => {
//   const dispatch = useDispatch();
  const { isShowDetail } = useSelector((state: AppState) => state.home);

  //   const showDialog = async (a: any): any => {
  //     const action2 = getPostById({ postId: a });
  //     await dispatch(action2).unwrap();

  //     const action1 = getCommentsByPostID(a);
  //     await dispatch(action1).unwrap();

  //     const action = ShowDetail(a);
  //     dispatch(action);

  //     socket.emit('joinComment', a);
  //   };
  return {
    isShowDetail
    // showDialog
  };
};
