import { useAppDispatch } from '../../../../app/store';
import { getPostComments } from '../../state/userActions';
import { setSelectedPost, setShowPostDetail, setShowPostEdit } from '../../state/userSlice';

const usePostItem = (post: any): any => {
  const dispatch = useAppDispatch();

  const handleClickPost = async (): Promise<void> => {
    const selectAction = setSelectedPost(post);
    await dispatch(selectAction);
    const show = setShowPostDetail(true);
    await dispatch(show);
    const getCommentsAction = getPostComments(post._id);
    await dispatch(getCommentsAction).unwrap()
  }
  const openEditPost = async (event: any): Promise<void> => {
    event.stopPropagation();
    const selectAction = setSelectedPost(post);
    await dispatch(selectAction);
    const showEdit = setShowPostEdit(true);
    await dispatch(showEdit);
  }
  return {
    handleClickPost,
    openEditPost
  }
};

export default usePostItem;
