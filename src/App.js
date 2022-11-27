import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Auth from './pages/auth';
import IndexHome from './pages/home';
import PrivateRout from './shareComponents/privateRout/privateRout';
import BruhRoute from './shareComponents/privateRout/BruhRoute';
import IndexChat from './pages/chat';
import NewIndex from './pages/newpost/newIndex';
import VideoCall from './pages/chat/components/VideoCall';
import UserIndex from './pages/user';

import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import PostComment from './pages/home/components/postComment';

export const socket = io.connect('https://server-social-ie213.herokuapp.com');

function App () {
  const { activePostId } = useSelector((state) => state.home);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/*"
          element={
            <PrivateRout>
              <IndexHome />
            </PrivateRout>
          }></Route>

        <Route
          path="/messenger/*"
          element={
            <PrivateRout>
              <IndexChat />
            </PrivateRout>
          }></Route>
        <Route
          forceRefresh
          path="/account/*"
          element={
            <PrivateRout>
              <UserIndex />
            </PrivateRout>
          }></Route>
        <Route path="video_call/:id" element={<VideoCall />} />

        <Route
          path="/new/*"
          element={
            <PrivateRout>
              <NewIndex />
            </PrivateRout>
          }></Route>
        <Route
          path="/auth/*"
          element={
            <BruhRoute>
              <Auth />
            </BruhRoute>
          }></Route>
      </Routes>
      <Outlet></Outlet>
      {activePostId === '' ? '' : <PostComment />}
    </div>
  );
}

export default App;
