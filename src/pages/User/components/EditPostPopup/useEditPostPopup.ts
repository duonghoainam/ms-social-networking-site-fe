import { useState } from 'react';
import { useAppDispatch } from '../../../../app/store';
import { setShowPostEdit } from '../../state/userSlice';

const useEditPostPopup = (post: any): any => {
  const dispatch = useAppDispatch();
  const initListImage = post.images.map((image: string) => { return { url: image, type: 'image' } })
  const [listImage, setListImages] = useState<string[]>(initListImage);
  const [valueInput, setValueInput] = useState<string>('content');

  const hideEditPost = async (): Promise<void> => {
    const showEdit = setShowPostEdit(false);
    await dispatch(showEdit);
  }
  return {
    listImage,
    setListImages,
    hideEditPost,
    valueInput,
    setValueInput
  }
}
export default useEditPostPopup;
