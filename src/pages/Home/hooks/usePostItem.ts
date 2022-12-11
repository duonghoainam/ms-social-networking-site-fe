/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { Post } from '../../../api/post/type/post.type';
import { useAppDispatch } from '../../../app/store';
import { getPostComments, likePost, unlikePost } from '../state/homeActions';
import { setSelectedPost, setShowPostDetail } from '../state/homeSlice';

export const usePostItem = (): any => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const dispatch = useAppDispatch();

  const showDetail = async (post: Post): Promise<void> => {
    const setPost = setSelectedPost(post);
    await dispatch(setPost);
    const setShow = setShowPostDetail(true);
    await dispatch(setShow);
    const actionGetComments = getPostComments(post._id);
    await dispatch(actionGetComments).unwrap();
  };

  const handleLikePost = async (post: Post): Promise<void> => {
    const postId = post._id;
    const userId = currentUser.id;
    let isLiked = false;
    if (post.likes.filter(user => user.id === userId).length > 0) { isLiked = true }
    if (isLiked) {
      const actionUnLike = unlikePost({ userId, postId });
      await dispatch(actionUnLike).unwrap();
    } else {
      const actionLike = likePost({ userId, postId });
      await dispatch(actionLike).unwrap();
      // Thông báo lượt like mới cho chủ post
    }
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
