import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import postAPI from '../../../api/post/PostApi';
import { MessageToastType } from '../../../components/MessageToast/typings.d';
import { showToastMessage } from '../../../utils/toast.util';

const useNewPostPage = (): any => {
  const [listImage, setListImages] = useState<string[]>([]);
  const [valueInput, setValueInput] = useState<string>('content');
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');

  const navigate = useNavigate();

  const handleCreatePost = async (): Promise<void> => {
    try {
      const imagesUrls = listImage.map((item: any) => item.url);
      const params = {
        user: currentUser.id,
        content: valueInput,
        images: imagesUrls
      }
      const result = await postAPI.createPost(params);
      if (result.code < 300) {
        showToastMessage(result.message, MessageToastType.SUCCESS);
      } else {
        showToastMessage(result.message, MessageToastType.ERROR);
      }
      navigate('/');
    } catch (error) {
      showToastMessage('Unexpected error', MessageToastType.ERROR);
    }
  };

  return {
    listImage,
    setListImages,
    valueInput,
    setValueInput,
    handleCreatePost
  }
}
export default useNewPostPage;
