import React, { ReactElement } from 'react';
import { AddAPhotoOutlined, Close } from '@material-ui/icons';
import '../components.scss'
import useNewPostMedia from './useNewPostMedia';

const NewPostMedia = ({ listMedia, setListMedia }: any): ReactElement => {
	const { handleChangeMedia, handleDropMedia } = useNewPostMedia(setListMedia);
	return (
		<div className="newImg">
			<div className="newImg_add">
				<form action="" method="post" encType="multipart/form-data">
					<input
						type="file"
						multiple
						name="postMedia"
						id="cImg"
						onChange={(event) => { void handleChangeMedia(event) }}
						accept="video/*, image/*"
					/>
					<label htmlFor="cImg">
						<AddAPhotoOutlined />
					</label>
				</form>
			</div>

			<div className="newImg_listMedia">
				{listMedia.map((item: any, index: number) =>
					<div className="newImg_listMedia_singleImg" key={index}>
						<div className="newImg_listMedia_singleImg_closeIcon">
							<Close onClick={() => handleDropMedia(item)} fontSize="small" />
						</div>
						{item.type === 'image' ? (
							<img src={item.url} key={index} alt="Post media" loading="lazy" />
						) : item.type === 'video' ? (
							<video src={item.url} key={index}></video>
						) : null}
					</div>
				)}
			</div>
		</div>
	);
};

export default NewPostMedia;
