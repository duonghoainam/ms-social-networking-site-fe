import React from 'react';
import { Close } from '@material-ui/icons';
import { Col, Container, Row } from 'react-bootstrap';
import { useMessagePopup } from './UseMessagePopup';
import SingleTag from '../SingleTag/SingleTag';
import SingleDestination from '../SingleDestination/SingleDestination';
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
  const {
    handleClick,
    handleClosePopup,
    handleAdd,
    tags,
    searchValue,
    handleSearchChange,
    renderContact
  } = useMessagePopup(setIsShowPopup, type, listUserId);
  return (
    <>
      {/* <PopupOverlay onClick={handleClosePopup} /> */}
      <div className="messagePopup">
        <div className="messagePopup__titleContainer">
          <Close onClick={handleClosePopup} fontSize="large" style={{ cursor: 'pointer' }} />
          {type === 'create' ? (
            <>
              <h5>Thêm cuộc trò chuyện</h5>
              <button
                className={`messagePopup__titleContainer__button ${
                  tags.length === 0 ? 'disabled' : ''
                }`}
                onClick={handleClick}>
                Tiếp
              </button>
            </>
          ) : (
            <>
              <h5>Thêm thành viên</h5>
              <button
                className={`messagePopup__titleContainer__button ${
                  tags.length === 0 ? 'disabled' : ''
                }`}
                onClick={handleAdd}>
                Tiếp
              </button>
            </>
          )}
        </div>
        <Container className="messagePopup__destinations" fluid="md">
          <Row style={{ padding: '10px 0' }}>
            <Col md={2}>
              <h5>Đến: </h5>
            </Col>
            <Col md={10}>
              <Row className="messagePopup__destinations__tags">
                {tags.length === 0
                  ? ''
                  : tags.map((tag: { id: string; name: string }) => {
                      return <SingleTag key={tag.id} tag={tag} />;
                    })}
              </Row>
              <Row className="messagePopup__destinations__input">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchValue}
                  onChange={handleSearchChange}
                />
              </Row>
            </Col>
          </Row>
        </Container>
        <div className="messagePopup__destinationList">
          <h6 style={{ padding: '10px 20px 10px 20px' }}>Suggested</h6>
          {renderContact.map((user, index) => {
            return <SingleDestination follow={user} key={user.id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default MessagePopup;
