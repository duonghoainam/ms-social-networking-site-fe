import React, { ReactElement } from 'react';
import { Close } from '@material-ui/icons';
import AccountItem from '../AccountItem/AccountItem';
import { Spinner } from 'react-bootstrap';
import './AllLikesPopup.scss';
import { useAllLikesPopup } from './useAllLikesPopup';

const AllLikesPopup = ({ post, isShow, hidePopup }: any): ReactElement => {
  const { isLoadThatPost } = useAllLikesPopup({ post });
  return (
    <>
      {Boolean(isLoadThatPost) && (
        <div className="alllikes" style={{ display: (isShow as boolean) ? '' : 'none' }}>
          <div className="alllikes_overlay" onClick={hidePopup}></div>
          <div className="alllikes_content">
            <div className="alllikes_content_header">
              <p>{post.likes.length} Lượt thích</p>
              <Close onClick={hidePopup} />
            </div>
            <div className="alllikes_content_content">
              {(!Boolean(isLoadThatPost)) ? (
                <div className="spinner_wrap">
                  <Spinner className="spinner" animation="border" size="sm" />
                </div>
              ) : (
                <>
                  {post.likes.map((user: any, index: any) => {
                    return <AccountItem key={index} user={user} />;
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllLikesPopup;
