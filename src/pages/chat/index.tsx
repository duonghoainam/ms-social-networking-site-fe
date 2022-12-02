import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import NotFound from '../../components/Notfound/NotFound';
import HomePage from '../home/HomePage';
// import NotFound from '../../shareComponents/notfound/NotFound';
import Chatpage from './pages/ChatPage';

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
