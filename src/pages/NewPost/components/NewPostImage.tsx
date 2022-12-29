import React, { ReactElement } from 'react';
import { AddAPhotoOutlined, Close } from '@material-ui/icons';
import useImageUpload from '../../../hooks/useImageUpload';
import useVideoUpload from '../../../hooks/useVideoUpload';
import './components.scss'

const NewPostImage = ({ listImages, setListImages }: any): ReactElement => {
  const imageUpload = useImageUpload();
  const videoUpload = useVideoUpload();
  const changeImage = async (file: any): Promise<void> => {
    if (file.size <= 52428800) {
      if (Boolean(file.type.includes('image'))) {
        const url = await imageUpload(file);
        setListImages((prev: string[]) => [...prev, { url, type: 'image' }]);
      } else {
        const url = await videoUpload(file);
        setListImages((prev: string[]) => [...prev, { url, type: 'video' }]);
      }
    } else {
      alert('Kích thước của file quá lớn!!!');
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
				<form action="" encType="multipart/form-data">
					<input
						type="file"
						multiple
						name=""
						id="cImg"
						// eslint-disable-next-line @typescript-eslint/no-misused-promises
						onChange={imgHandleChange}
						accept="video/mp4, image/*"
					/>
					<label htmlFor="cImg">
						<AddAPhotoOutlined />
					</label>
				</form>
			</div>

			<div className="newImg_listImages">
				{listImages.map((item: any, index: number) =>
					<div className="newImg_listImages_singleImg" key={index}>
						<div className="newImg_listImages_singleImg_closeIcon">
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
