import { useState } from 'react';

export const useCommentItem = (comment: any): any => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  let [isLike] = useState(false);
  isLike = comment.likes.includes(currentUser._id);

  const [likeCount] = useState(comment.likes.length);
  const [showChildrenComment] = useState(false);

  return {
    isLike,
    likeCount,
    showChildrenComment
  };
};
