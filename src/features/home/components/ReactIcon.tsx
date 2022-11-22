import {
  FavoriteBorderOutlined,
  SendOutlined,
  AddCommentOutlined,
  Favorite,
  BookmarkBorderOutlined
} from '@material-ui/icons';
import React, { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
// import { getCommentsByPostID, handleLike, handleUnLike, ShowDetail } from '../homeSlice';
import { AppState } from '../../../app/state.type';
// import { socket } from "../../../App";

const ReactIcon = ({ postId }: any): ReactElement => {
  const { listPosts } = useSelector((state: AppState) => state.home);
  const current = JSON.parse(localStorage.getItem('currentUser') ?? '');

  // get list like of the post
  const activePost = listPosts.find((post: any) => post._id === postId);
  const likes = activePost.likes;

  const [isLike] = useState(likes.includes(current._id));

  // const dispatch = useDispatch();

  // //hàm xử lý show phần comment khi show tất cả phần comment
  // const showDetail = (a) => {
  //   const action1 = getCommentsByPostID(postId);
  //   dispatch(action1);

  //   const action = ShowDetail(postId);
  //   dispatch(action);

  //   const message = { room: a };
  //   socket.emit("joinRoom", message);
  // };

  // //hàm xử lý like hay không like bài post
  // const HandleLikePost = async (id) => {
  //   if (isLike) {
  //     const action1 = handleUnLike(id);
  //     dispatch(action1);
  //   } else {
  //     const action1 = handleLike(id);
  //     dispatch(action1);

  //   }

  //   setisLike(!isLike);
  // };

  return (
    <Row className="reactIcon">
      <Col md={9}>
        {isLike === true ? (
          <Favorite
            style={{ color: '#ed4956' }}
            // onClick={() => HandleLikePost(postId)}
          />
        ) : (
          <FavoriteBorderOutlined
          // onClick={() => HandleLikePost(postId)}
          />
        )}

        <AddCommentOutlined
        // onClick={() => showDetail(postId)}
        />

        <SendOutlined />
      </Col>
      <Col md={3} style={{ textAlign: 'right' }}>
        <BookmarkBorderOutlined />
      </Col>
    </Row>
  );
};

export default ReactIcon;
