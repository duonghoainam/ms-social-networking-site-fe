/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Close, Info } from '@material-ui/icons';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import WarningPopup from '../../../../components/WarningPopup/WarningPopup';
import { IConversation } from '../../types/IConversation';
import ChatMember from '../ChatMember/ChatMember';
import MessagePopup from '../MessagePopup/MessagePopup';
import { useChatSetting } from './useChatSetting';
interface ChatSettingProps {
  setIsOpenSetting: any;
  currentConversation: IConversation;
}

const ChatSetting: React.FC<ChatSettingProps> = ({ setIsOpenSetting, currentConversation }) => {
  const {
    conversationAvt,
    isClosePopup,
    isTyping,
    text,
    image,
    isShowMessagePopup,
    handleFileChange,
    handleKeyDown,
    handleClosePopup,
    handleOpenPopup,
    handleChange,
    handleDeleteCon,
    setIsShowMessagePopup,
    handleSubmit
  } = useChatSetting(currentConversation);

  return (
    <div className="rightPanel">
      <div className="rightPanel__titleSetting">
        <h4>Chi tiết</h4>
        <Close
          fontSize="medium"
          className="rightPanel__titleSetting__icon"
          onClick={() => setIsOpenSetting(false)}
        />
      </div>
      {currentConversation?.members.length > 2 ? (
        <div>
          <div className="rightPanel__changeGroupPhoto">
            <div className="rightPanel__changeGroupPhoto__image">
              <img src={conversationAvt} alt="unsplash" />
            </div>
            <div className="rightPanel__changeGroupPhoto__changeImg">
              <label htmlFor="image-input">Thay đổi ảnh</label>
              <input type="file" id="image-input" onChange={handleFileChange} />
            </div>
          </div>

          <div className="rightPanel__changeName">
            <p>Tên mới: </p>
            <input
              type="text"
              placeholder="Tên mới"
              value={text}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            {isTyping ? <button onClick={handleSubmit}>Lưu</button> : <></>}
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="rightPanel__mainSetting">
        <div className="rightPanel__mainSetting__title">
          <h4>Thành viên</h4>
          <button onClick={() => setIsShowMessagePopup(true)}>Thêm thành viên</button>
        </div>
        <div className="rightPanel__mainSetting__listMember">
          {currentConversation.members.map((member) => {
            return <ChatMember member={member} key={member.id} />;
          })}
        </div>
        <div className="rightPanel__mainSetting__control">
          <button className="rightPanel__mainSetting__control__button" onClick={handleOpenPopup}>
            Rời khỏi cuộc trò chuyện
          </button>
        </div>
      </div>
      {!isClosePopup && (
        <WarningPopup
          title="Rời khỏi cuộc trò chuyện?"
          content="Việc này sẽ khiến bạn và người khác không thể xem lại nội dung cuộc trò chuyện này nữa"
          handleAccept={handleDeleteCon}
          handleCandle={handleClosePopup}
        />
      )}
      {isShowMessagePopup && (
        <MessagePopup
          setIsShowPopup={setIsShowMessagePopup}
          type="add"
          listUserId={currentConversation.members.map((mem) => mem.id)}
          setIsOpenSetting={setIsOpenSetting}
        />
      )}
    </div>
  );
};

export default ChatSetting;
