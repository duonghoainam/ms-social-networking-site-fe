import React, { ReactElement } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Auth from './pages/Auth';
import IndexHome from './pages/Home';
import PrivateRout from './shareComponents/privateRout/privateRout';
import BruhRoute from './shareComponents/privateRout/BruhRoute';
import IndexChat from './pages/Chat';
import NewIndex from './pages/Newpost/newIndex';
import VideoCall from './pages/Chat/components/VideoCall';
import UserIndex from './pages/User';

// import io from 'socket.io-client';
import * as io from 'socket.io-client';
import { useSelector } from 'react-redux';
import PostComment from './pages/Home/components/postComment';
import { AppState } from './app/state.type';

export const socket = io.connect('https://server-social-ie213.herokuapp.com');

function App(): ReactElement {
  const { activePostId } = useSelector((state: AppState) => state.home);

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
          // forceRefresh
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
