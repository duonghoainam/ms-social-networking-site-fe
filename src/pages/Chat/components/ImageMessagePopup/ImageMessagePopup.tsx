import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import '../Chat.scss';
import PropTypes from 'prop-types';
import SingleChat from '../SingleChat/SingleChat';
import { Button, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { IImage } from '../../types/IImage.Type';
import { useImageMessagePopup } from './useImageMessagePopup';

interface ImageMessageProp {
  images: IImage[];
  closePopup: any;
  removeImage: any;
  submit: any;
}

const ImageMessagePopup: React.FC<ImageMessageProp> = ({images, closePopup, removeImage, submit }) => {
  return (
    <div className="imageMessagePopup">
      <div className="titleContainer">
      Gửi hình ảnh
      </div>
      <div className='contentContainer'>
      {images.map((image) => {
        return (
          <div className='message' key={image.url}>
            <div className='imageContainer'>
              <img src={image.url} alt={image.name}  className='image'/>
              <div className='info'>
                <p className='name'>{image.name}</p>
                <small className='size'>{image.size}KB</small>
              </div>
            </div>
            <div className='message_action'>
              <IconButton size='small' onClick={()=>{removeImage(image)}}>
                <Delete ></Delete>
              </IconButton>
            </div>
          </div> 
        );
      })}
      </div>
      <div className='actionContainer'>
        <Button onClick={closePopup} >Hủy</Button>
        <Button onClick={submit} color='primary'>Gửi</Button>
      </div>
    </div>
  );
};

export default ImageMessagePopup;
