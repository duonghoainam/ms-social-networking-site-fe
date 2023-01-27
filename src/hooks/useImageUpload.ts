import axios from 'axios';

const useImageUpload = async (file: any): Promise<string> => {
  const imageData = new FormData();
  const uploadUrl = process.env.REACT_APP_MEDIA_UPLOAD_URL ?? 'http://localhost:3000/upload'
  imageData.append('file', file);
  const result = await axios.post(uploadUrl, imageData, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  });
  return result.data[0].data
};

export default useImageUpload;
