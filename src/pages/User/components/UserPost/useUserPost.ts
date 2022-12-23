import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppState } from '../../../../app/state.type';
import { useAppDispatch } from '../../../../app/store';
import { getPostsByUserId, handleDislike, handleLike } from '../../state/userActions';
import { setShowPostDetail } from '../../state/userSlice';

const useUserPost = (): any => {
  const { id } = useParams();
  const { selectedPost } = useSelector((state: AppState) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const useEffectAsyncFunc = async (): Promise<void> => {
      const action = getPostsByUserId(id);
      await dispatch(action).unwrap();
    };
    void useEffectAsyncFunc();
  });

  const hidePostDetail = async (): Promise<void> => {
    const hide = setShowPostDetail(false);
    await dispatch(hide);
  };

  const handleLikePostComment = async (postId: string, userId: string): Promise<void> => {
    let isLiked = false;
    if (selectedPost.likes.filter((user: any) => user.id === userId).length > 0) { isLiked = true }
    if (isLiked) {
      const actionDislike = handleDislike({ postId, userId })
      await dispatch(actionDislike).unwrap();
    } else {
      const actionLike = handleLike({ postId, userId })
      await dispatch(actionLike).unwrap();
    }
  };

  return {
    hidePostDetail,
    handleLikePostComment
  };
};
export default useUserPost;
