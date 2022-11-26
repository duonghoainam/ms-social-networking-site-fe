import { Post } from '../../../api/post/type/post.type';
import { useAppDispatch } from '../../../app/store';
import { getPostComments } from '../state/homeActions';
import { setSelectedPost, setShowPostDetail } from '../state/homeSlice';

export const usePostItem = (): any => {
  const dispatch = useAppDispatch();

  const showDetail = async (post: Post): Promise<void> => {
    const setPost = setSelectedPost(post);
    await dispatch(setPost);

    // set show post comment detail model
    const show = setShowPostDetail(true);
    await dispatch(show);

    const getComments = getPostComments(post._id);
    await dispatch(getComments).unwrap();
    // const message = { room: postId };
    // socket.emit('joinComment', postId);
  };

  const handleLikePost = async (id: string, userId: string): Promise<void> => {
    // if (post.likes.includes(currentUser._id) as boolean) {
    //   const action1 = handleUnLike(id);
    //   await dispatch(action1).unwrap();
    // } else {
    //   const action1 = handleLike(id);
    //   await dispatch(action1).unwrap();
    //   if (userId !== currentUser._id) {
    //     const paramsCreate = {
    //       receiver: userId,
    //       notiType: 2,
    //       desId: post._id
    //     };
    //     const action = createNotification(paramsCreate);
    //     await dispatch(action).unwrap();
    //     const notification = {
    //       id: post._id,
    //       userId: userId, // cái này là id của thằng cần gửi thông báo tới
    //       type: 2,
    //       senderName: currentUser.name,
    //       img: currentUser.avatar
    //     };
    //     // socket.emit('send_notificaton', notification);
    //   }
    // }
  };

  // const showAllLikesModel = async (a): Promise<void> => {
  //   const action = getListUser(a);
  //   await dispatch(action).unwrap();
  // };

  // const handleWatchMore = (e) => {
  //   e.target.previousElementSibling.style.overflow = 'auto';
  //   e.target.previousElementSibling.style.display = 'block';
  //   e.target.style.display = 'none';
  // };
  return {
    showDetail,
    handleLikePost
  };
};
