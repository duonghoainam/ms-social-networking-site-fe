import { DeleteOutline, Favorite, FavoriteBorder } from '@material-ui/icons';
import React from 'react';
import WarningPopup from '../../../../components/WarningPopup/WarningPopup';
import { IMessage } from '../../types/IMessage';
import { UseMessage } from './UseMessage';
import '../Chat.scss';
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
            <img src={message.senderDetail?.avatar} alt="unsplash" />
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
          <p
            className={`rightPanel__conversation__content__text ${
              message.senderDetail?.id === currentUser.id ? 'mine' : ''
            }`}>
            {message.content.includes('http') ? (
              <a href={message.content}>{message.content}</a>
            ) : (
              message.content
            )}
          </p>
        )}
        {!message.isDeleted && message.reactBy.length >= 1 ? (
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
        ) : (
          <></>
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

export default Message;
