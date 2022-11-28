import { useSelector } from 'react-redux';
import { getCommentsByPostID, getPostById, ShowDetail } from '../../../home/homeSlice';
import { socket } from '../../../../App';
import { AppState } from '../../../../app/state.type';
import { useAppDispatch } from '../../../../app/store';
import './styles.scss';

export const usePostItem = (): any => {
  const dispatch = useAppDispatch();
  const { isShowDetail } = useSelector((state: AppState) => state.home);

  const showDialog = async (a: any): Promise<void> => {
    const action2 = getPostById({ postId: a });
    await dispatch(action2).unwrap();
    const action1 = getCommentsByPostID(a);
    await dispatch(action1).unwrap();
    const action = ShowDetail(a);
    dispatch(action);
    socket.emit('joinComment', a);
  };

  return {
    isShowDetail,
    showDialog
  };
};
