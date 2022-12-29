import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { socket } from '../../../../App';
import useImageUpload from '../../../../hooks/useImageUpload';
import { IConversation } from '../../types/IConversation';
import { IImage } from '../../types/IImage.Type';

interface useImageMessagePopupRes {
  isShowMessagePopup: boolean;
  handleClosePopup: any
}

export const useImageMessagePopup = (images: IImage[]) => {
  const params = useParams();
  const [imageFiles, setImageFiles] = useState(images);
  const uploadImage = useImageUpload();
 
  return {  
    uploadImage,
  };
};
