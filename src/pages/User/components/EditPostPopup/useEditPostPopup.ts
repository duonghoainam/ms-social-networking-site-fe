import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import postAPI from '../../../../api/post/PostApi';
import { useAppDispatch } from '../../../../app/store';
import { MessageToastType } from '../../../../components/MessageToast/typings.d';
import { showToastMessage } from '../../../../utils/toast.util';
import { setShowPostEdit } from '../../state/userSlice';

const useEditPostPopup = (post: any): any => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initListImage = post.images.map((image: string) => { return { url: image, type: 'image' } })
  const [listImage, setListImages] = useState<string[]>(initListImage);
  const [valueInput, setValueInput] = useState<string>(post.content);

  const hideEditPost = async (): Promise<void> => {
    const showEdit = setShowPostEdit(false);
    await dispatch(showEdit);
  }

  const handleEditPost = async (): Promise<void> => {
    try {
      const imagesUrls = listImage.map((item: any) => item.url);
      const params = {
        postId: post._id,
        content: valueInput,
        oldImages: post.images,
        images: imagesUrls
      }
      const result = await postAPI.updatePost(params);
      if (result.code < 300) {
        showToastMessage(result.message, MessageToastType.SUCCESS);
      } else {
        showToastMessage(result.message, MessageToastType.ERROR);
      }
      navigate('/');
    } catch (error) {
      showToastMessage('Unexpected error', MessageToastType.ERROR);
    }
  }
  return {
    listImage,
    setListImages,
    handleEditPost,
    hideEditPost,
    valueInput,
    setValueInput
  }
}
export default useEditPostPopup;
