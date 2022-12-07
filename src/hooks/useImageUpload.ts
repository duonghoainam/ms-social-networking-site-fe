import axios from 'axios';

const useImageUpload = () => {
  return async (file: any) => {
    const imageData = new FormData();
    imageData.append('api_key', '835266539265652');
    imageData.append('file', file);
    imageData.append('upload_preset', 'social_app_image');
    imageData.append('cloud_name', 'hehohe');
    const url = (
      await axios.post('https://api.cloudinary.com/v1_1/wjbucloud/image/upload', imageData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
    ).data.url;
    return url;
  };
};

export default useImageUpload;
