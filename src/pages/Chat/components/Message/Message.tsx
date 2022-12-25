import { DeleteOutline, Favorite, FavoriteBorder } from '@material-ui/icons';
import React from 'react';
import WarningPopup from '../../../../components/WarningPopup/WarningPopup';
import { IMessage } from '../../types/IMessage';
import { UseMessage } from './useMessage';
import '../Chat.scss';
import { DEFAULT_AVATAR } from '../../const';
import ImageList from '@material-ui/core/ImageList';
import { ImageListItem } from '@material-ui/core';
import { TypeMessage } from '../../../../constants/enums/chat-type.enum';
interface MessageProps {
  message: IMessage;
  handleReactMessage: any;
  handleUnReactMessage: any;
  handleDeleteMessage: any;
}
const Message: React.FC<MessageProps> = ({
  message,
  handleReactMessage,
  handleUnReactMessage,
  handleDeleteMessage
}) => {
  const { currentConversation, isClosePopup, handleClosePopup, handleDeleteMsg, setIsClosePopup } =
    UseMessage(message, handleDeleteMessage);
  // const currentUser = useSelector((state: AppState) => state.auth.currentUser);
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  if (message.sender == null) {
    return <div className="rightPanel__conversation__content BOT">{message.content}</div>;
  } else {
    return (
      <div
        className={`rightPanel__conversation__content ${
          message.sender === currentUser.id ? 'mine' : ''
        }`}>
        {message.sender !== currentUser.id && (
          <div className="rightPanel__conversation__content__image">
            <img src={message.senderDetail?.avatar ?? DEFAULT_AVATAR} alt="unsplash" />
          </div>
        )}
        {message.isDeleted ? (
          <p
            id="deleted_message"
            className={`rightPanel__conversation__content__text ${
              message.sender === currentUser.id ? 'mine' : ''
            }`}>
            {message.senderDetail?.name} đã thu hồi tin nhắn
          </p>
        ) : (
          message.type === TypeMessage.TEXT 
          ? <TextMessage message={message} currentUser={currentUser}/> 
          : <ImageMessage message={message} currentUser={currentUser}/>
        )}
        {!message.isDeleted && message.reactBy.length >= 1 && (
          <div
            className={`rightPanel__conversation__content__react 
                ${message.reactBy.length > 1 ? 'multiple' : ''}
                ${message.sender === currentUser.id ? 'mine' : ''}`}>
            <Favorite
              htmlColor="red"
              fontSize="small"
              className="rightPanel__conversation__content__react__tym"
            />
            {message.reactBy.length > 1 && <span>{message.reactBy.length}</span>}
          </div>
        )}

        <div
          className={`rightPanel__conversation__content__whoTymToolTip ${
            message.sender === currentUser.id ? 'mine' : ''
          }`}>
          {currentConversation?.members.map((member: any) => {
            if (message.reactBy.includes(member._id)) {
              return <p key={member._id}>{member.name}</p>;
            }
            return null;
          })}
        </div>

        {!message.isDeleted && (
          <div
            className={`rightPanel__conversation__content__options ${
              message.senderDetail?.id === currentUser.id ? 'mine' : ''
            }`}>
            {!message.reactBy.includes(currentUser.id) ? (
              <FavoriteBorder onClick={() => handleReactMessage(message._id, currentUser.id)} />
            ) : (
              <Favorite
                htmlColor="red"
                onClick={() => handleUnReactMessage(message._id, currentUser.id)}
              />
            )}
            {message.sender === currentUser.id && (
              <DeleteOutline onClick={() => setIsClosePopup(false)} />
            )}
          </div>
        )}

        {!isClosePopup && (
          <WarningPopup
            title="Thu hồi tin nhắn"
            content="Bạn có thật sự muốn thu hồi tin nhắn này không?"
            handleOK={handleDeleteMsg}
            handleCANCEL={handleClosePopup}
          />
        )}
      </div>
    );
  }
};

const TextMessage = ({message, currentUser}: {message: IMessage; currentUser: any}) => {
  let isMine = message.senderDetail?.id === currentUser.id ? 'mine': ''
  return (
    <p className={`rightPanel__conversation__content__text ${isMine}`}>
    {
      message.content.includes("http")
      ? <a href={message.content}>{ message.content}</a>
      : <>{message.content}</>
    }
    </p>
  );
}

const ImageMessage = ({message, currentUser}: {message: IMessage; currentUser: any}) => {
  let isMine = message.senderDetail?.id === currentUser.id ? 'mine': ''
  let images:string[] = JSON.parse(message.content);
  return (
    <div className={`rightPanel__conversation__content__textImage ${isMine}`}>
      <ImageList cols={2} rowHeight={130}>
        {images.map((item) => (
          <ImageListItem key={item} cols={images.length < 2 ? 2 : 1}>
            <img
              src={`${item}`}
              srcSet={`${item}`}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default Message;
