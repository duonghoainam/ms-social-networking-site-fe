import React, { ReactElement } from 'react';
import { Col, Row } from 'react-bootstrap';
// import { useSelector } from 'react-redux';
// import { ShowReportModal, HideDetailReducer } from '../homeSlice';
import { addActiveId } from '../../user/profileSlice';
import { useNavigate } from 'react-router-dom';
// import { DeleteForever, BorderColor } from '@material-ui/icons';
// import { AppState } from '../../../app/state.type';
import { useAppDispatch } from '../../../app/store';
const PostHeader = ({ post }: any): ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const currentPost = useSelector((state: AppState) => state.home.post);

  // const userInfoId = useSelector((state: AppState) => state.auth.current._id);

  // const [showDeleteModal, setShowDeleteModal] = useState(false);

  // show report modal
  // const showModal = (id: string): void => {
  //   const action = ShowReportModal();
  //   dispatch(action);
  //   // setIsShowDialog(!isShowDialog);
  // };

  const handleShowProfile = (id: string): any => {
    const action = addActiveId(id);
    dispatch(action);
    navigate('/account');
  };

  // const hideDetail = (): void => {
  //   const action = HideDetailReducer();
  //   dispatch(action);
  // };

  // const handleEditPost = () => {
  //   hideDetail();
  // };
  // const handleDeletePost = (): any => {
  //   setShowDeleteModal(true);
  // };

  // const closeDialog = (): any => {
  //   setShowDeleteModal(false);
  // };

  // const onSubmit = async (e): Promise<void> => {
  //   e.preventDefault();
  //   const action1 = deletePost(postId);
  //   await dispatch(action1);
  //   const action2 = getPostsByUserId(post._id);
  //   await dispatch(action2);
  //   closeDialog();
  //   hideDetail();
  // };
  console.log(post);
  return (
    <Row>
      <Col md={1} onClick={() => handleShowProfile(post.user._id)}>
        <img src={post?.user.avatar} alt="" />
      </Col>
      <Col md={9} onClick={() => handleShowProfile(post.user._id)}>
        <h6>{post?.user.name}</h6>
      </Col>
    </Row>
  );
};

export default PostHeader;
