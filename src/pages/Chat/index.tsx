import React, { ReactElement } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Chatpage from './pages/ChatPage';

const IndexChat = (): ReactElement => {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<Chatpage />}>
          {' '}
        </Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <Outlet />
    </div>
  );
};

export default IndexChat;
