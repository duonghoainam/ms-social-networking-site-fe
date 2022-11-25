import React, { ReactElement } from 'react';
import CommentItem from './CommentItem/CommentItem';
import { useSelector } from 'react-redux';
// import { socket } from '../../../App';
import { AppState } from '../../../app/state.type';

const ListComment = (): ReactElement => {
  // const dispatch = useDispatch();
  const { listComment } = useSelector((state: AppState) => state.home);

  // useEffect(async () => {
  //   socket.off('receive_message').on('receive_message', (data) => {
  //     try {
  //       console.log('Dô trong này để lấy comment');
  //       const action1 = getCommentsByPostID(activePostId);
  //       dispach(action1);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   });
  // }, [socket]);

  return (
    <>
      {listComment.map((comment: any) => {
        return <CommentItem key={comment._id} comment={comment} />;
      })}
    </>
  );
};

export default ListComment;
