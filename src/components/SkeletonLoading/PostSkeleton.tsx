import React, { ReactElement } from 'react';
import './Skeleton.scss';

const PostSkeleton = (): ReactElement => {
  return (
    <>
      <div className="postSkeleton">
        <div className="postSkeleton__header">
          <div className="postSkeleton__header__avatar"></div>
          <div className="postSkeleton__header__name"></div>
        </div>
        <div className="postSkeleton__img"></div>
        <div className="postSkeleton__footer">
          <div className="postSkeleton__footer__content"></div>
          <div className="postSkeleton__footer__content"></div>
          <div className="postSkeleton__footer__content"></div>
          <div className="postSkeleton__footer__content"></div>
        </div>
      </div>
    </>
  );
};

export default PostSkeleton;
