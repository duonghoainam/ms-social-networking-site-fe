import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
<<<<<<<< HEAD:src/pages/newpost/components/EditPostHeader.js
import { updatePost } from '../../Home/homeSlice';
========
import { updatePost } from '../../Home/state/homeSlice';
>>>>>>>> main:src/pages/Newpost/components/EditPostHeader.js
import './newcomponent.scss';

const UpdatePostHeader = ({ listImg, content, postId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log({ listImg, content });
  const handleCreatePost = async () => {
    try {
      const result = await dispatch(updatePost({ images: listImg, content, postId })).unwrap();
      console.log({ result });
      alert(result.message);
      navigate('/account');
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="newHeader">
      <h6>Chỉnh sửa bài viết</h6>
      <button onClick={() => handleCreatePost()}>Cập nhật</button>
    </div>
  );
};

export default UpdatePostHeader;
