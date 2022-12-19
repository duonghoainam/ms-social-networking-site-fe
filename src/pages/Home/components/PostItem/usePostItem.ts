import { useState } from 'react';
import { Post } from '../../../../api/post/type/post.type';
import { User } from '../../../../api/user/type/user.type';
import { useAppDispatch } from '../../../../app/store';
import { getPostComments, handleDislike, handleLike } from '../../state/homeActions';
import { setSelectedPost, setShowPostDetail } from '../../state/homeSlice';

export const usePostItem = ({ post }: any): any => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const dispatch = useAppDispatch();
  const [isShowMessagePopup, setIsShowMessagePopup] = useState(false);

  const initIsLiked = post.likes.filter((user: User) => user.id === currentUser.id).length > 0;
  // like state to control like status on ui
  const [likeAction, setLikeAction] = useState<{ isLiked: boolean, count: number }>({ isLiked: initIsLiked, count: 0 });

  const showDetail = async (post: Post): Promise<void> => {
    const setPost = setSelectedPost(post);
    await dispatch(setPost);
    const setShow = setShowPostDetail(true);
    await dispatch(setShow);
    const actionGetComments = getPostComments(post._id);
    await dispatch(actionGetComments).unwrap();
  };

  const likePost = async (): Promise<void> => {
    const actionLike = handleLike({ userId: currentUser.id, postId: post._id });
    await dispatch(actionLike).unwrap();
    setLikeAction({ isLiked: true, count: likeAction.count + 1 })
  }
  const dislikePost = async (): Promise<void> => {
    const actionLike = handleDislike({ userId: currentUser.id, postId: post._id });
    await dispatch(actionLike).unwrap();
    setLikeAction({ isLiked: false, count: likeAction.count - 1 })
  }
  return {
    likeAction,
    showDetail,
    likePost,
    dislikePost,
    currentUser,
    isShowMessagePopup,
    setIsShowMessagePopup
  };
};
