import React, { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/context';
const GuestLayout = () => {
  const navigate = useNavigate();
  const { token } = useContext(GlobalContext);
  if (token) {
    navigate('/dashboard');
  }
  return (

    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default GuestLayout;