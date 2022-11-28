import React, { ReactElement } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
// import Auth from './pages/Auth';
// import IndexHome from './pages/Home';
// import PrivateRout from './shareComponents/privateRout/privateRout';
// import BruhRoute from './shareComponents/privateRout/BruhRoute';
import PrivateRoute from './components/ControlRoute/PrivateRoute';
import IndexChat from './pages/Chat';
import NewIndex from './pages/Newpost/newIndex';
import VideoCall from './pages/Chat/components/VideoCall';
import UserIndex from './pages/User';
// import * as io from 'socket.io-client';
// import { useSelector } from 'react-redux';
// import PostComment from './pages/Home/components/postComment';
// import { AppState } from './app/state.type';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import AuthRoute from './components/ControlRoute/AuthRoute';
import RegisterPage from './pages/Register/RegisterPage';

// export const socket = io.connect('https://server-social-ie213.herokuapp.com');
export const socket = null;

function App (): ReactElement {
  // const { activePostId } = useSelector((state: AppState) => state.home);
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
