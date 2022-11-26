import React, { ReactElement } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import PrivateRoute from './components/ControlRoute/PrivateRoute';
import IndexChat from './pages/chat';
import NewIndex from './pages/newpost/newIndex';
import VideoCall from './pages/chat/components/VideoCall';
import UserIndex from './pages/user';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import AuthRoute from './components/ControlRoute/AuthRoute';
import RegisterPage from './pages/register/RegisterPage';

// import io from 'socket.io-client';

// export const socket = io.connect('https://server-social-ie213.herokuapp.com');
export const socket = null;

function App(): ReactElement {
  // const { activePostId } = useSelector((state: any) => state.home);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Routes>
                <Route index element={<HomePage />}></Route>
              </Routes>
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
          path="/login/*"
          element={
            <AuthRoute>
              <Routes>
                <Route index element={<LoginPage />} />
              </Routes>
            </AuthRoute>
          }></Route>
        <Route
          path="/register/*"
          element={
            <AuthRoute>
              <Routes>
                <Route index element={<RegisterPage />} />
              </Routes>
            </AuthRoute>
          }></Route>
      </Routes>
      <Outlet></Outlet>
      {/* {activePostId === '' ? '' : <PostComment />} */}
    </div>
  );
}

export default App;
