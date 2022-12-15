import { useState } from 'react';

const useNewPostPage = (post: any): any => {
  const postImages = post?.images.map((item: string, index: number) => {
    return item.split('.')[item.split('.').length - 1] === 'mp4'
      ? {
          url: item,
          type: 'video'
        }
      : {
          url: item,
          type: 'image'
        };
  });

  const [listImage, setListImages] = useState<string[]>(postImages);
  const [valueInput, setValueInput] = useState<string>(post?.content);

  return {
    listImage,
    setListImages,
    valueInput,
    setValueInput
  }
}
export default useNewPostPage;
