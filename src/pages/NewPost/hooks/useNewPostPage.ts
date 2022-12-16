import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import postAPI from '../../../api/post/PostApi';
import { MessageToastType } from '../../../components/MessageToast/typings';
import { showToastMessage } from '../../../utils/toast.util';

const useNewPostPage = (): any => {
  const [listImages, setListImages] = useState<string[]>([]);
  const [valueInput, setValueInput] = useState<string>('content');
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');

  const navigate = useNavigate();

  const handleCreatePost = async (): Promise<void> => {
    try {
      const imagesUrls = listImages.map((item: any) => item.url);
      const params = {
        user: currentUser.id,
        content: valueInput,
        images: imagesUrls
      }
      const result = await postAPI.createPost(params);
      if (result.code < 300) {
        showToastMessage(result.message, MessageToastType.SUCCESS);
      }
      showToastMessage(result.message, MessageToastType.ERROR);
      navigate('/');
    } catch (error) {
      showToastMessage('Unexpected error', MessageToastType.ERROR);
    }
  };

  console.log(listImages)
  console.log(valueInput)
  return {
    listImages,
    setListImages,
    valueInput,
    setValueInput,
    handleCreatePost
  }
}
export default useNewPostPage;
