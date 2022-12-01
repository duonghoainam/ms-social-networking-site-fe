import { useAppDispatch } from '../../../app/store';
import { handleLike, handleUnLike } from '../state/homeActions';
import { setShowPostDetail } from '../state/homeSlice';
import { AppState } from '../../../app/state.type';
import { useSelector } from 'react-redux';

export const usePostComment = (): any => {
  const dispatch = useAppDispatch();
  const selectedPost = useSelector((state: AppState) => state.home.selectedPost);

  const hideDetail = async (): Promise<void> => {
    const hide = setShowPostDetail(false);
    await dispatch(hide);
  };

  const handleLikePostComment = async (postId: string, userId: string): Promise<void> => {
    const isLiked = Boolean(selectedPost.likes.includes(userId))
    if (isLiked) {
      const actionUnlike = handleUnLike({ postId, userId })
      await dispatch(actionUnlike).unwrap();
    } else {
      const actionlike = handleLike({ postId, userId })
      await dispatch(actionlike).unwrap();
      // Thông báo có lượt like post
    }
  };

  // const showAlllikesModal = async (a) => {
  //   const action = getListUser(a);
  //   await dispatch(action).unwrap();
  // };
  return {
    hideDetail,
    handleLikePostComment
  };
};
