import React, { useContext } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import { LuLogOut } from "react-icons/lu";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { GlobalContext } from '../context/context';
const DefaultLayout = () => {
  const navigate = useNavigate(0);
  const { theme, toggleTheme, token } = useContext(GlobalContext);
  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <div className='h-screen w-8xl mx-auto bg-black/5 px-5 py-10 flex'>

      <aside className='w-80 border-r h-screen space-y-3 text-left border-black/15 cursor-pointer flex flex-col'>
        <h1>Creative Theme</h1>
        <Link to={'/dashboard'} className='relative overflow-hidden px-4 py-1 cursor-pointer group w-[90%] flex items-center space-x-2 '>
          <MdOutlineSpaceDashboard className='z-10 group-hover:text-white text-xl' />
          <span className='absolute inset-0 bg-black translate-x-[-120%] group-hover:translate-x-0 transition-transform duration-400 rounded-xl'></span>
          <span className='relative z-10 text-center group-hover:text-white transition-400'>Dashboard</span>
        </Link>

        <Link to={'/users'} className='px-4 py-1  rounded-lg relative group border w-[90%] border-black/20 overflow-hidden flex items-center space-x-2'>
          <HiUsers className='z-10  group-hover:text-white transition-colors duration-400' />
          <span className='absolute top-0 left-0  bg-black w-0 h-0 group-hover:w-full group-hover:h-full transition-all duration-400 ease-in-out rounded-br-md'>
          </span>
          <span className='relative  group-hover:text-white transition-colors duration-400 z-10'>
            Users
          </span>
        </Link>

      </aside>
      <div className='w-full'>
        <header className='flex justify-between items-center p-5 border-b border-black/15'>
          <div>
            Header
          </div>

          <div className='flex space-x-4 items-center'>
            <h2>UserName</h2>
            {
              theme === 'light' ?
                <MdOutlineDarkMode size={20} onClick={toggleTheme} /> : <MdDarkMode size={20} onClick={toggleTheme} />
            }
            <LuLogOut size={20} />
          </div>
        </header>
        <main className='p-5'>
          <Outlet />
        </main>
      </div>
    </div>



  );
};

export default DefaultLayout;