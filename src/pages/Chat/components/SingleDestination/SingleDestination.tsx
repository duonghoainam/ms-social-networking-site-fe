import React from 'react';
import { CheckCircle } from '@material-ui/icons';
import { DEFAULT_AVATAR } from '../../const';
import { useSingleDestination } from './useSingleDestination';

interface SingleDestinationProps {
  follow: any;
  forRenderSearch?: boolean;
}

const SingleDestination: React.FC<SingleDestinationProps> = ({
  follow,
  forRenderSearch = false
}) => {
  const { tags, handleClick, handleUnselect, handleSelect } = useSingleDestination(follow);
  return (
    <div className="messagePopup__destinationList__singleDestination" onClick={handleClick}>
      <div className="messagePopup__destinationList__singleDestination__avatar">
        <img src={follow.avatar ?? DEFAULT_AVATAR} alt="avatar_user" />
      </div>
      <div className="messagePopup__destinationList__singleDestination__info">
        <p>{follow.name}</p>
        <p>{follow.email}</p>
      </div>
      {!forRenderSearch ? (
        tags.map((tag: any) => tag.id).includes(follow.id) ? (
          <CheckCircle style={{ width: '27px', height: '27px' }} onClick={handleUnselect} />
        ) : (
          <div
            className="messagePopup__destinationList__singleDestination__dot"
            onClick={handleSelect}></div>
        )
      ) : (
        ''
      )}
    </div>
  );
};

export default SingleDestination;
