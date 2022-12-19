import { useState } from 'react';
import { useAppDispatch } from '../../../../app/store';
import { deleteComment, getHomePosts } from '../../state/homeActions';

export const useCommentItem = (comment: any): any => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  let [isLike] = useState(false);
  isLike = comment.likes.includes(currentUser.id);

  const [likeCount] = useState(comment.likes.length);
  const [isShowChildrenComment, setIsShowChildrenComment] = useState(false);
  const [isShowCmtOption, setIsShowCommentOption] = useState(false);
  let isCommentOfCurrentUser = false;
  if (comment.user.id === currentUser.id) {
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

    const actionGetPosts = getHomePosts(currentUser.id);
    await dispacth(actionGetPosts).unwrap();
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
