import { useState } from 'react';
import { Post } from '../../../../api/post/type/post.type';
import { useAppDispatch } from '../../../../app/store';
import { getPostComments, handleDislike, handleLike } from '../../state/homeActions';
import { setSelectedPost, setShowPostDetail } from '../../state/homeSlice';

export const usePostItem = (post: Post): any => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const dispatch = useAppDispatch();
  const [isShowMessagePopup, setIsShowMessagePopup] = useState(false);

  const showDetail = async (): Promise<void> => {
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
  }
  const dislikePost = async (): Promise<void> => {
    const actionLike = handleDislike({ userId: currentUser.id, postId: post._id });
    await dispatch(actionLike).unwrap();
  }

  return {
    likePost,
    dislikePost,
    showDetail,
    currentUser,
    isShowMessagePopup,
    setIsShowMessagePopup
  };
};
