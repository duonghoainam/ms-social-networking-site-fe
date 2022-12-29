import axios from 'axios';

const useImageUpload = async (file: any): Promise<string> => {
  const imageData = new FormData();
  imageData.append('file', file);
  const result = await axios.post('http://localhost:3000/upload', imageData, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  });
  return result.data[0].data
};

export default useImageUpload;
