import React from 'react';
import { Close } from '@material-ui/icons';
import { Col, Container, Row } from 'react-bootstrap';
import { useMessagePopup } from './UseMessagePopup';
import SingleTag from '../SingleTag/SingleTag';
interface MessagePopupProps {
  setIsShowPopup?: React.Dispatch<React.SetStateAction<boolean>>;
  type?: string;
  listUserId?: any[];
  setIsOpenSetting?: React.Dispatch<React.SetStateAction<boolean>>;
  content?: Object;
}

const MessagePopup: React.FC<MessagePopupProps> = ({
  type = 'create',
  listUserId = [],
  setIsOpenSetting,
  setIsShowPopup,
  content
}) => {
  const { handleClick, handleClosePopup, handleAdd, tags } = useMessagePopup(setIsShowPopup);
  return (
    <>
      {/* <PopupOverlay onClick={handleClosePopup} /> */}
      <div className="messagePopup">
        <div className="messagePopup__titleContainer">
          <Close onClick={handleClosePopup} fontSize="large" style={{ cursor: 'pointer' }} />
          {type === 'create' ? (
            <>
              <h5>New Message</h5>
              <button
                className={`messagePopup__titleContainer__button ${
                  tags.length === 0 ? 'disabled' : ''
                }`}
                onClick={handleClick}>
                Next
              </button>
            </>
          ) : (
            <>
              <h5>Add People</h5>
              <button
                className={`messagePopup__titleContainer__button ${
                  tags.length === 0 ? 'disabled' : ''
                }`}
                onClick={handleAdd}>
                Next
              </button>
            </>
          )}
        </div>
        <Container className="messagePopup__destinations" fluid="md">
          <Row style={{ padding: '10px 0' }}>
            <Col md={2}>
              <h5>To: </h5>
            </Col>
            <Col md={10}>
              <Row className="messagePopup__destinations__tags">
                {tags.length === 0
                  ? ''
                  : tags.map((tag: { _id: string; name: string }) => {
                      return <SingleTag key={tag._id} tag={{ _id: 'string', name: 'string' }} />;
                    })}
              </Row>
              <Row className="messagePopup__destinations__input">
                {/* <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchValue}
                  onChange={(e) => handleSearch(e.target.value)}
                /> */}
              </Row>
            </Col>
          </Row>
        </Container>
        <div className="messagePopup__destinationList">
          <h6 style={{ padding: '10px 20px 10px 20px' }}>Suggested</h6>
          {/* {type === 'create'
            ? searchValue === ''
              ? userContact.map((follow, index) => {
                  return <SingleDestination follow={follow} key={index} />;
                })
              : bruh.map((user, index) => {
                  return <SingleDestination follow={user} key={index} />;
                })
            : type === 'add'
            ? searchValue === ''
              ? userContact
                  .filter((item) => {
                    if (!listUserId?.includes(item._id)) {
                      return item;
                    }
                  })
                  .map((follow, index) => {
                    return <SingleDestination follow={follow} key={index} />;
                  })
              : bruh
                  .filter((item) => {
                    return !listUserId?.includes(item._id);
                  })
                  .map((user, index) => {
                    return <SingleDestination follow={user} key={index} />;
                  })
            : type === 'forward'
            ? conversations
                .filter((con) => {
                  const memberIds = con.members.map((mem) => mem._id);
                  return memberIds.includes(currentUser._id);
                })
                .map((con, index) => {
                  return <SingleDestination follow={con} key={index} isForward={true} />;
                })
            : ''} */}
        </div>
      </div>
    </>
  );
};

export default MessagePopup;
