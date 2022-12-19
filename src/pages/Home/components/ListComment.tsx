import React, { ReactElement } from 'react';
import CommentItem from './CommentItem/CommentItem';
import { useSelector } from 'react-redux';
import { AppState } from '../../../app/state.type';
// import { socket } from '../../../App';

const ListComment = (): ReactElement => {
  const { listComment } = useSelector((state: AppState) => state.home);
  return (
    <>
      {listComment.map((comment: any) => {
        return <CommentItem key={comment._id} comment={comment} />;
      })}
    </>
  );
};

export default ListComment;
