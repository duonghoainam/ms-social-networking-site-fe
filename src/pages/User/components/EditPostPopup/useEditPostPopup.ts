import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import postAPI from '../../../../api/post/PostApi';
import { useAppDispatch } from '../../../../app/store';
import { MessageToastType } from '../../../../components/MessageToast/typings.d';
import { getFileTypeFromUrl } from '../../../../utils/string.util';
import { showToastMessage } from '../../../../utils/toast.util';
import { setShowPostEdit } from '../../state/userSlice';

const useEditPostPopup = (post: any): any => {
  const dispatch = useAppDispatch();

  const initListMedia = post.images.map((fileUrl: string) => { return { url: fileUrl, type: getFileTypeFromUrl(fileUrl) } })
  const [listMedia, setListMedia] = useState<string[]>(initListMedia);
  const [valueInput, setValueInput] = useState<string>(post.content);

  const hideEditPost = async (): Promise<void> => {
    const showEdit = setShowPostEdit(false);
    await dispatch(showEdit);
  }

  const handleEditPost = async (): Promise<void> => {
    try {
      const mediaUrls = listMedia.map((item: any) => item.url);
      const params = {
        postId: post._id,
        content: valueInput,
        oldMedia: post.images,
        newMedia: mediaUrls
      }
      const result = await postAPI.updatePost(params);
      if (result.code < 300) {
        showToastMessage(result.message, MessageToastType.SUCCESS);
        await hideEditPost();
      } else {
        showToastMessage(result.message, MessageToastType.ERROR);
      }
    } catch (error) {
      showToastMessage('Đã có lỗi xảy ra', MessageToastType.ERROR);
    }
  }
  return {
    listMedia,
    setListMedia,
    handleEditPost,
    hideEditPost,
    valueInput,
    setValueInput
  }
}
export default useEditPostPopup;
