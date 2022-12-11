import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import NotFound from '../../components/Notfound/NotFound';
// import NotFound from '../../shareComponents/notfound/NotFound';
import Chatpage from './ChatPage';

const IndexChat = (): any => {
  return (
    <div>
      <Routes>
        <Route index path="/*" element={<Chatpage />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default IndexChat;
