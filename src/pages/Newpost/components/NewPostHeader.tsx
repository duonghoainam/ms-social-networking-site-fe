import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import './components.scss';

const NewPostHeader = ({ listImages, content, isUpdate, postId }: any): ReactElement => {
  const navigate = useNavigate();
  const handleCreatePost = (): void => {
    try {
      // const listUrl = listImages.map((item) => item.url);
      // const result = await dispatch(createPost({ images: listUrl, content })).unwrap();
      // console.log({ result });
      // alert(result.message);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePost = (): void => {
    try {
      // const listUrl = listImages.map((item) => item.url);
      // const result = await dispatch(updatePost({ images: listUrl, content, postId })).unwrap();
      // console.log({ result });
      // alert(result.message);
      navigate('/account');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="newHeader">
      <h6>Tạo bài viết mới</h6>
      {!(isUpdate as boolean) ? (
        <button className={`${listImages.length === 0 ? 'disabled' : ''}`} onClick={handleCreatePost}>
          Chia sẻ
        </button>
      ) : (
        <button className={`${listImages.length === 0 ? 'disabled' : ''}`} onClick={handleUpdatePost}>
          Cập nhật
        </button>
      )}
    </div>
  );
};

export default NewPostHeader;
