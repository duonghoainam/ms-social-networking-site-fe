// import React, { useState } from 'react';
// import { Col, Container, Row } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import Header from '../../components/Header/Header';
// import UpdatePostHeader from './components/EditPostHeader';
// import './newpage.scss';

// const EditPage = () => {
//   const { _id, images, content } = useSelector((state) => state.home.post);

//   const [listImages, setListImages] = useState(images);
//   const [valueInput, setValueInput] = useState(content);
//   return (
//     <>
//       <Container fluid>
//         <Row>
//           <Header></Header>
//         </Row>
//       </Container>
//       <Container style={{ marginTop: '115px' }}>
//         <Row>
//           <Col md={{ span: 8, offset: 2 }} className="newWrapper">
//             <Row>
//               <UpdatePostHeader listImages={listImages} content={valueInput} postId={_id} />
//             </Row>
//             <Row>
//               <Col md={7} className="newImgWrapper">
//                 <NewPostImage listImages={listImages} setListImages={setListImages} />
//               </Col>
//               <Col md={5}>
//                 <NewPostContent valueInput={valueInput} setValueInput={setValueInput} />
//               </Col>
//             </Row>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default EditPage;
