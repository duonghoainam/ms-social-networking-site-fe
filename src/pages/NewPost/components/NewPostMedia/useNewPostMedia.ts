import { MessageToastType } from '../../../../components/MessageToast/typings.d';
import useMediaUpload from '../../../../hooks/useMediaUpload';
import { getFileTypeFromUrl } from '../../../../utils/string.util';
import { showToastMessage } from '../../../../utils/toast.util';

const useNewPostMedia = (setListMedia: any): any => {
  const changeMedia = async (file: any): Promise<void> => {
    try {
      const url = await useMediaUpload(file);
      const type = getFileTypeFromUrl(url);
      setListMedia((prev: any[]) => [...prev, { url, type }]);
    } catch (error) {
      console.log(error)
      showToastMessage('Error while loading image', MessageToastType.ERROR)
    }
  }
  const handleChangeMedia = async (event: any): Promise<void> => {
    Array.from(event.target.files).forEach((file: any) => {
      void changeMedia(file);
    });
  };

  const handleDropMedia = async (image: any): Promise<void> => {
    setListMedia((prev: any[]) => {
      return prev.filter((item: any) => item !== image);
    });
  };
  return {
    handleChangeMedia,
    handleDropMedia
  }
};

export default useNewPostMedia;
