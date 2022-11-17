import React, { ReactElement } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import NotFound from '../../components/notfound/NotFound';
import HomePage from './pages/HomePage';

const IndexHome = (): ReactElement => {
  return (
    <div>
      <Routes>
        <Route index element={<HomePage />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default IndexHome;
