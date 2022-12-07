import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import '../Chat.scss';
import PropTypes from 'prop-types';
import SingleChat from '../SingleChat/SingleChat';
import { useListChat } from './UseListChat';

interface ListChatProp {
  setIsOpenSetting: any;
  setIsShowPopup: any;
}

const ListChat: React.FC<ListChatProp> = ({ setIsOpenSetting, setIsShowPopup }) => {
  const { handleClick, conversations, currentUser } = useListChat(setIsOpenSetting);
  return (
    <div className="leftPanel">
      <div className="leftPanel__title">
        <h6>{currentUser?.name}</h6>
        <FontAwesomeIcon
          icon={faPenToSquare}
          cursor="pointer"
          size="lg"
          onClick={() => setIsShowPopup(true)}
        />
      </div>
      <div className="leftPanel__listChat">
        {conversations?.map((conversation: any) => {
          return (
            <SingleChat
              key={conversation._id}
              conversation={conversation}
              handleClick={handleClick}
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </div>
  );
};

ListChat.propTypes = {
  setIsOpenSetting: PropTypes.func.isRequired,
  setIsShowPopup: PropTypes.func.isRequired
};

export default ListChat;
