import React, { ReactElement } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import PrivateRoute from './components/ControlRoute/PrivateRoute';
import NewIndex from './pages/Newpost/newIndex';
import UserIndex from './pages/User';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import AuthRoute from './components/ControlRoute/AuthRoute';
import { io } from 'socket.io-client';
import RegisterPage from './pages/Register/RegisterPage';
import IndexChat from './pages/chat';

// import io from 'socket.io-client';

// export const socket = io.connect('https://server-social-ie213.herokuapp.com');
export const socket = io('http://localhost:3003');

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
