import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { InfoOutlined, ArrowDownward } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import '../Chat.scss';
import { AppState } from '../../../../app/state.type';
import { useChatContent } from './useChatContent';
import { IMessage } from '../../types/IMessage';
import ChatSetting from '../ChatSetting/ChatSetting';
import Message from '../Message/Message';

const ChatContent = ({
  isOpenSetting,
  setIsOpenSetting,
  isShowPopup,
  setIsShowPopup
}: {
  isOpenSetting: boolean;
  setIsOpenSetting: any;
  isShowPopup: any;
  setIsShowPopup: any;
}): any => {
  const isFetchingMessages = useSelector((state: AppState) => state.chat.loading);

  const {
    messages,
    currentConversation,
    conversationAvatar,
    conversationName,
    chatContentRef,
    ref,
    messageText,
    isTyping,
    showScrollButton,
    handleScroll,
    handleScrollBottom,
    handleChange,
    handleDeleteMessage,
    handleKeyDown,
    handleReactMessage,
    handleUnReactMessage,
    handleSubmit
  } = useChatContent(setIsOpenSetting);

  if (isOpenSetting) {
    return (
      <ChatSetting setIsOpenSetting={setIsOpenSetting} currentConversation={currentConversation} />
    );
  } else {
    return (
      <div className="rightPanel" style={{ position: 'relative' }}>
        <div className="rightPanel__title">
          <div className="rightPanel__title__user">
            <div className="rightPanel__title__user__image">
              <img src={conversationAvatar} alt="unsplash" />
            </div>
            <h6 className="rightPanel__title__user__name">{conversationName}</h6>
          </div>
          <InfoOutlined fontSize="medium" cursor="pointer" onClick={() => setIsOpenSetting(true)} />
        </div>
        <div className="rightPanel__conversation" ref={chatContentRef} onScroll={handleScroll}>
          {isFetchingMessages && (
            <img
              src="https://res.cloudinary.com/wjbucloud/image/upload/v1653588935/Ball-Drop-Preloader-1-1_kvobub.gif"
              style={{ width: '50px', height: 'auto', alignSelf: 'center' }}></img>
          )}
          {messages
            ?.slice(0)
            .reverse()
            .map((item: IMessage, index: number) => {
              return (
                <Message
                  message={item}
                  key={index}
                  handleReactMessage={handleReactMessage}
                  handleUnReactMessage={handleUnReactMessage}
                  handleDeleteMessage={handleDeleteMessage}
                />
              );
            })}
          {showScrollButton && (
            <div
              style={{
                position: 'absolute',
                bottom: '100px',
                left: '50%',
                transform: 'translateX(-50%)',
                borderRadius: '50%',
                backgroundColor: '#EEEEEE',
                cursor: 'pointer',
                zIndex: 5,
                padding: '5px'
              }}
              onClick={handleScrollBottom}>
              <ArrowDownward fontSize="large" htmlColor="#2BC891" />
            </div>
          )}
          <div ref={ref} />
        </div>
        <div className="rightPanel__inputContainer">
          <input
            type="text"
            placeholder="Message..."
            value={messageText}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          {isTyping && (
            <FontAwesomeIcon
              icon={faPaperPlane}
              size="lg"
              cursor="pointer"
              className="rightPanel__inputContainer__icon submit"
              onClick={handleSubmit}
            />
          )}
        </div>
      </div>
    );
  }
};

export default ChatContent;
