import React, { useContext } from 'react';
import Navbar from './Navbar';
import { UserContext } from '../../context/userContext';
import SideMenu from './SideMenu';

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div className="flex flex-1">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="grow mx-5 mt-4">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
