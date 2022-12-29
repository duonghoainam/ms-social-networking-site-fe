import React from 'react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import { useSingleChat } from './useSingleChat';
import { TypeMessage } from '../../../../constants/enums/chat-type.enum';
TimeAgo.addLocale(en);

function SingleChat ({
  conversation,
  handleClick,
  currentUser
}: {
  conversation: any
  handleClick: any
  currentUser: any
}): any {
  const { active, messages, timeAgo, handleClickSingleChat, conversationName, conversationAvatar } =
    useSingleChat(conversation, handleClick, currentUser);

  return (
    <div
      className={`singleChat ${active ? 'currentConversation' : ''}`}
      onClick={handleClickSingleChat}>
      <div className="singleChat__image">
        <img src={conversationAvatar} alt="unsplash" />
      </div>
      <div className="singleChat__user">
        <h6 className="singleChat__user__name">{conversationName}</h6>
        <div className="singleChat__user__content">
          <p
            style={
              messages?.seenBy.includes(currentUser.id) !== true &&
              messages?.sender !== currentUser.id
                ? { fontWeight: 'bold', color: 'black' }
                : {}
            }
            className="singleChat__user__content__summary">
            {messages?.isDeleted ?? false
              ? `${messages?.senderDetail?.name ?? ''} đã thu hồi tin nhắn`
              : messages?.type === TypeMessage.IMAGE
                ? `${messages?.senderDetail?.name ?? ''} đã gửi hình ảnh`
                : messages?.content}
          </p>

          <span className="singleChat__user__content__time">
            {messages != null && '•' + timeAgo.format(Date.parse(messages?.createdAt), 'mini-now')}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SingleChat;
