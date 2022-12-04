import React, { ReactElement } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Auth from './pages/auth';
import IndexHome from './pages/home';
import PrivateRoute from './components/ControlRoute/PrivateRoute';
import AuthRoute from './components/ControlRoute/AuthRoute';
import IndexChat from './pages/chat';
import NewIndex from './pages/newpost/newIndex';
import UserIndex from './pages/user';
import { io } from 'socket.io-client';

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
      {/* {activePostId === '' ? '' : <PostComment />} */}
    </div>
  );
}

export default App;
