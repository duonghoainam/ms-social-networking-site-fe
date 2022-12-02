import React from 'react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import { useSingleChat } from './useSingleChat';
TimeAgo.addLocale(en);

function SingleChat({
  conversation,
  handleClick,
  currentUser
}: {
  conversation: any;
  handleClick: any;
  currentUser: any;
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
          {messages[0]?.seenBy.includes(currentUser._id) ? (
            <p className="singleChat__user__content__summary">
              {messages[0]?.isDeleted
                ? `${messages[0]?.senderDetail?.name ?? ''} đã thu hồi tin nhắn`
                : messages[0]?.content}
            </p>
          ) : (
            <p
              style={{ fontWeight: 'bold', color: 'black' }}
              className="singleChat__user__content__summary">
              {messages[0]?.isDeleted
                ? `${messages[0]?.senderDetail?.name ?? ''} đã thu hồi tin nhắn`
                : messages[0]?.content}
            </p>
          )}

          <span className="singleChat__user__content__time">
            {messages[0] != null &&
              '•' + timeAgo.format(Date.parse(messages[0]?.createdAt), 'mini-now')}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SingleChat;
