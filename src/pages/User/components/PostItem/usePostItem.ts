import { useState } from 'react';

export const usePostItem = (): any => {
  const [isShowPostDetail, setShowPostDetail] = useState(false);
  return {
    isShowPostDetail,
    setShowPostDetail
  };
};
