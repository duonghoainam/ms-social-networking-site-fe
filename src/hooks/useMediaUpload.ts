import axios from 'axios';

const useMediaUpload = async (file: any): Promise<string> => {
  const mediaData = new FormData();
  const uploadUrl = process.env.REACT_APP_MEDIA_UPLOAD_URL ?? 'http://localhost:3000/upload'
  mediaData.append('file', file);
  const result = await axios.post(uploadUrl, mediaData, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  });
  return result.data[0].data
};

export default useMediaUpload;
