import React from 'react';
import { DEFAULT_AVATAR } from '../../const';
import { IUserInfo } from '../../Types/IUserInfo';

interface ChatMemberProps {
  member: IUserInfo;
}

const ChatMember: React.FC<ChatMemberProps> = ({ member }) => {
  return (
    <div className="rightPanel__mainSetting__listMember__member">
      <div className="rightPanel__mainSetting__listMember__member__image">
        <img src={member.avatar ?? DEFAULT_AVATAR} alt="unsplash" />
      </div>
      <div className="rightPanel__mainSetting__listMember__member__info">
        <h6 className="rightPanel__mainSetting__listMember__member__info__name">{member.name}</h6>
        {/* <h6 className="rightPanel__mainSetting__listMember__member__info__email">{member.email}</h6> */}
      </div>
    </div>
  );
};

export default ChatMember;
