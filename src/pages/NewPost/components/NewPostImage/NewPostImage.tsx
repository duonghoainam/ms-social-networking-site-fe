import React, { ReactElement } from 'react';
import { AddAPhotoOutlined, Close } from '@material-ui/icons';
import '../components.scss'
import useNewPostImage from './useNewPostImage';

const NewPostImage = ({ listImage, setListImages }: any): ReactElement => {
  const { handleChangeImage, handleDropImage } = useNewPostImage(setListImages);
  return (
		<div className="newImg">
			<div className="newImg_add">
				<form action="" method="post" encType="multipart/form-data">
					<input
						type="file"
						multiple
						name="postMedia"
						id="cImg"
						onChange={(event) => { void handleChangeImage(event) }}
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
