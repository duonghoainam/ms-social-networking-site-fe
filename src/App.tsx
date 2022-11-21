import React, { ReactElement } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Auth from './features/auth';
import IndexHome from './features/home';
import PrivateRoute from './components/ControlRoute/PrivateRoute';
import AuthRoute from './components/ControlRoute/AuthRoute';
import IndexChat from './features/chat';
import NewIndex from './features/newpost/newIndex';
import VideoCall from './features/chat/components/VideoCall';
import UserIndex from './features/user';

// import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import PostComment from './features/home/components/PostComment';

// export const socket = io.connect('https://server-social-ie213.herokuapp.com');
export const socket = null;

function App(): ReactElement {
  const { activePostId } = useSelector((state: any) => state.home);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <IndexHome />
            </PrivateRoute>
          }></Route>

        <Route
          path="/account/*"
          element={
            <PrivateRoute>
              <UserIndex />
            </PrivateRoute>
          }></Route>
        <Route path="video_call/:id" element={<VideoCall />} />

        <Route
          path="/messenger/*"
          element={
            <PrivateRoute>
              <IndexChat />
            </PrivateRoute>
          }></Route>
        <Route
          path="/new/*"
          element={
            <PrivateRoute>
              <NewIndex />
            </PrivateRoute>
          }></Route>
        <Route
          path="/auth/*"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }></Route>
      </Routes>
      <Outlet></Outlet>
      {activePostId === '' ? '' : <PostComment />}
    </div>
  );
}

export default App;
