import { useState } from 'react';
import { useAppDispatch } from '../../../app/store';
import { deleteComment } from '../../Home/state/homeActions';

export const useCommentItem = (comment: any): any => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  let [isLike] = useState(false);
  isLike = comment.likes.includes(currentUser._id);

  const [likeCount] = useState(comment.likes.length);
  const [isShowChildrenComment, setIsShowChildrenComment] = useState(false);
  const [isShowCmtOption, setIsShowCommentOption] = useState(false);
  let isCommentOfCurrentUser = false;
  if (comment.user === currentUser._id) {
    isCommentOfCurrentUser = true;
  }
  const [isCanEditAndDelete, setIsCanEditAndDelete] = useState(isCommentOfCurrentUser)

  const dispacth = useAppDispatch();

  const handleDeleteComment = async (): Promise<void> => {
    const params = {
      commentId: comment._id,
      postId: comment.postId
    }
    const actionDeleteComment = deleteComment(params);
    await dispacth(actionDeleteComment).unwrap();
  }

  return {
    isLike,
    likeCount,
    isShowChildrenComment,
    setIsShowChildrenComment,
    isShowCmtOption,
    setIsShowCommentOption,
    isCanEditAndDelete,
    setIsCanEditAndDelete,
    handleDeleteComment
  };
};
