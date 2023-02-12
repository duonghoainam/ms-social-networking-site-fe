import { useEffect, useState } from 'react';
import { deleteComment, likeComment, unlikeComment } from '../../pages/Home/state/homeActions';
import { useAppDispatch } from '../../app/store';
import { useSelector } from 'react-redux';
import { AppState } from '../../app/state.type';
import { userLikeComment, userUnlikeComment } from '../../pages/User/state/userActions';

export const useCommentItem = (comment: any): any => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
  const { isShowPostDetail } = useSelector((state: AppState) => state.user);
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isShowChildrenComment, setIsShowChildrenComment] = useState(false);
  const [isShowCmtOption, setIsShowCommentOption] = useState(false);
  let isCommentOfCurrentUser = false;
  if (comment.user.id === currentUser.id) {
    isCommentOfCurrentUser = true;
  }
  const [isCanEditAndDelete, setIsCanEditAndDelete] = useState(isCommentOfCurrentUser)

  const dispacth = useAppDispatch()

  const handleDeleteComment = async (): Promise<void> => {
    const params = {
      commentId: comment._id,
      postId: comment.postId
    }
    const actionDeleteComment = deleteComment(params);
    await dispacth(actionDeleteComment).unwrap();

    // const actionGetPosts = getHomePosts(currentUser.id);
    // await dispacth(actionGetPosts).unwrap();
  }

  const handleLikeComment = async (): Promise<void> => {
    if (isShowPostDetail === true) {
      const actionLikeComment = userLikeComment({ userId: currentUser.id, postId: comment.postId, commentId: comment._id });
      await dispacth(actionLikeComment).unwrap();
    } else {
      const actionLikeComment = likeComment({ userId: currentUser.id, postId: comment.postId, commentId: comment._id });
      await dispacth(actionLikeComment).unwrap();
    }
  }

  const handleUnLikeComment = async (): Promise<void> => {
    if (isShowPostDetail === true) {
      const actionLikeComment = userUnlikeComment({ userId: currentUser.id, postId: comment.postId, commentId: comment._id });
      await dispacth(actionLikeComment).unwrap();
    } else {
      const actionUnlikeComment = unlikeComment({ userId: currentUser.id, postId: comment.postId, commentId: comment._id });
      await dispacth(actionUnlikeComment).unwrap();
    }
  }

  useEffect(() => {
    setIsLike(comment.likes.includes(currentUser.id))
    setLikeCount(comment.likes.length)
  }, [comment])

  return {
    isLike,
    likeCount,
    isShowChildrenComment,
    setIsShowChildrenComment,
    isShowCmtOption,
    setIsShowCommentOption,
    isCanEditAndDelete,
    setIsCanEditAndDelete,
    handleDeleteComment,
    handleLikeComment,
    handleUnLikeComment
  };
};
