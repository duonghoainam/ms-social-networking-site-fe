import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTag } from '../../state/chatSlice';

interface Tag {
  id: string;
  name: string;
}

interface SingleTagProps {
  tag: Tag;
}

function SingleTag ({ tag }: SingleTagProps): React.ReactElement<SingleTagProps> {
  const dispatch = useDispatch();
  function handleClick (id: any): void {
    dispatch(deleteTag(id));
  }

  return (
    <div className="messagePopup__destinations__tags__singleTag">
      <p>{tag.name}</p>
      <button onClick={() => handleClick(tag.id)}>x</button>
    </div>
  );
}

export default SingleTag;
