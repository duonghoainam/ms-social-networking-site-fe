import React, { ReactElement } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import PrivateRoute from './components/ControlRoute/PrivateRoute';
import IndexChat from './pages/Chat';
import NewIndex from './pages/Newpost/newIndex';
import VideoCall from './pages/Chat/components/VideoCall';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import AuthRoute from './components/ControlRoute/AuthRoute';
import RegisterPage from './pages/Register/RegisterPage';
import UserIndex from './pages/User';

export const socket = null;

function App (): ReactElement {
  // const { activeId } = useSelector((state: AppState) => state.home);
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
    </div>
  );
}

export default App;
