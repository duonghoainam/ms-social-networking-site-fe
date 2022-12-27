import axios from 'axios';

const useImageUpload = async (file: any): Promise<string> => {
  const imageData = new FormData();
  // imageData.append('api_key', '835266539265652');
  imageData.append('file', file);
  // imageData.append('upload_preset', 'social_app_image');
  // imageData.append('cloud_name', 'hehohe');
  const result = await axios.post('http://localhost:3000/upload', imageData, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  });
  return result.data[0].data
};

export default useImageUpload;
