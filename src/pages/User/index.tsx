import React, { ReactElement } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import NotFound from '../../components/Notfound/NotFound';
import UserPage from './UserPage';

const UserIndex = (): ReactElement => {
  return (
    <div>
      <Routes>
        <Route index element={<UserPage />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default UserIndex;
