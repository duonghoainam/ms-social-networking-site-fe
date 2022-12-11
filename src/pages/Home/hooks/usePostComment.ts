import { useAppDispatch } from '../../../app/store';
import { handleDislike, handleLike } from '../state/homeActions';
import { setShowPostDetail } from '../state/homeSlice';
import { AppState } from '../../../app/state.type';
import { useSelector } from 'react-redux';
import { User } from '../../../api/user/type/user.type';

export const usePostComment = (): any => {
  const dispatch = useAppDispatch();
  const selectedPost = useSelector((state: AppState) => state.home.selectedPost);

  const hideDetail = async (): Promise<void> => {
    const hide = setShowPostDetail(false);
    await dispatch(hide);
  };

  const handleLikePostComment = async (postId: string, userId: string): Promise<void> => {
    let isLiked = false;
    if (selectedPost.likes.filter((user: User) => user.id === userId).length > 0) { isLiked = true }
    if (isLiked) {
      const actionUnlike = handleDislike({ postId, userId })
      await dispatch(actionUnlike).unwrap();
    } else {
      const actionlike = handleLike({ postId, userId })
      await dispatch(actionlike).unwrap();
      // Thông báo có lượt like cho chủ post
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
