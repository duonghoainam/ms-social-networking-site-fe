import React, { ReactElement, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import './components.scss';
import { TagFacesOutlined } from '@material-ui/icons';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

const NewPostContent = ({ valueInput, setValueInput }: any): ReactElement => {
  const [showEmoji, setShowEmoji] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent): void => {
    setValueInput((value: string) => value + emojiData.emoji);
  };

  return (
    <div className="newContent">
      <Row>
        <Col md={{ span: 2, offset: 1 }}>
          <img src={currentUser.avatar} alt="userAvatar" />
        </Col>
        <Col md={{ span: 8 }}>{currentUser.name}</Col>
      </Row>

      <Row>
        <Col md={12}>
          <textarea
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            rows={8}
            placeholder="Viêt chú thích ..."
          ></textarea>
        </Col>
      </Row>
      <Row>
        <Col md={12} id="emojiIcon">
          <TagFacesOutlined style={{ color: 'black' }} onClick={() => setShowEmoji(!showEmoji)} />
        </Col>
        {showEmoji && (
          <EmojiPicker
          onEmojiClick={handleEmojiClick}
          width="100%"
          height="400px"></EmojiPicker>
        )}
      </Row>
    </div>
  );
};

export default NewPostContent;
