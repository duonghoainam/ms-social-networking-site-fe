import { MessageToastType } from '../../../../components/MessageToast/typings.d';
import useImageUpload from '../../../../hooks/useImageUpload';
import useVideoUpload from '../../../../hooks/useVideoUpload';
import { showToastMessage } from '../../../../utils/toast.util';

const useNewPostImage = (setListImages: any): any => {
  const changeImage = async (file: any): Promise<void> => {
    try {
      if (Boolean(file.type.includes('image'))) {
        const url = await useImageUpload(file);
        setListImages((prev: any[]) => [...prev, { url, type: 'image' }]);
      } else {
        const url = await useVideoUpload(file);
        setListImages((prev: any[]) => [...prev, { url, type: 'video' }]);
      }
    } catch (error) {
      showToastMessage('Error while loading image', MessageToastType.ERROR)
    }
  }
  const handleChangeImage = async (event: any): Promise<void> => {
    Array.from(event.target.files).forEach((file: any) => {
      void changeImage(file);
    });
  };

  const handleDropImage = async (image: any): Promise<void> => {
    setListImages((prev: any[]) => {
      return prev.filter((item: any) => item !== image);
    });
  };
  return {
    handleChangeImage,
    handleDropImage
  }
};

export default useNewPostImage;
