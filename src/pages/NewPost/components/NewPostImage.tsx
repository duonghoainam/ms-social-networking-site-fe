import React, { ReactElement } from 'react';
import { AddAPhotoOutlined, Close } from '@material-ui/icons';
import useImageUpload from '../../../hooks/useImageUpload';
import useVideoUpload from '../../../hooks/useVideoUpload';
import './components.scss'
import { showToastMessage } from '../../../utils/toast.util';
import { MessageToastType } from '../../../components/MessageToast/typings.d';

const NewPostImage = ({ listImage, setListImages }: any): ReactElement => {
  const changeImage = async (file: any): Promise<void> => {
    try {
      if (Boolean(file.type.includes('image'))) {
        const url = await useImageUpload(file);
        setListImages((prev: string[]) => [...prev, { url, type: 'image' }]);
      } else {
        const url = await useVideoUpload(file);
        setListImages((prev: string[]) => [...prev, { url, type: 'video' }]);
      }
    } catch (error) {
      showToastMessage('Error while loading image', MessageToastType.ERROR)
    }
  }
  const imgHandleChange = async (event: any): Promise<void> => {
    Array.from(event.target.files).forEach((file: any) => {
      void changeImage(file);
    });
  };

  const handleDropImage = (url: string): void => {
    setListImages((prev: string[]) => {
      return prev.filter((item: string) => item !== url);
    });
  };

  return (
		<div className="newImg">
			<div className="newImg_add">
				<form action="" method="post" encType="multipart/form-data">
					<input
						type="file"
						multiple
						name="postMedia"
						id="cImg"
						onChange={(event) => { void imgHandleChange(event) }}
						accept="video/mp4, image/*"
					/>
					<label htmlFor="cImg">
						<AddAPhotoOutlined />
					</label>
				</form>
			</div>

			<div className="newImg_listImage">
				{listImage.map((item: any, index: number) =>
					<div className="newImg_listImage_singleImg" key={index}>
						<div className="newImg_listImage_singleImg_closeIcon">
							<Close onClick={() => handleDropImage(item)} fontSize="small" />
						</div>
						{item.type === 'image' ? (
							<img src={item.url} key={index} alt="Post image" loading="lazy" />
						) : item.type === 'video' ? (
							<video src={item.url} key={index}></video>
						) : null}
					</div>
				)}
			</div>
		</div>
  );
};

export default NewPostImage;
