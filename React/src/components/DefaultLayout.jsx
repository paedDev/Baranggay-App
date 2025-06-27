import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import { LuLogOut } from "react-icons/lu";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { GlobalContext } from '../context/context';
import axiosClient from '../../axiosClient';
import { ClipLoader } from "react-spinners";
import { GoFileSubmodule } from "react-icons/go";
import { FaFileShield } from "react-icons/fa6";
const DefaultLayout = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme, setToken, token, setUser, user, setLoading, loading } = useContext(GlobalContext);
  if (!token) {
    return <Navigate to="/login" />;
  }
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post('/logout');
      setUser({});
      setToken(null);
    } catch (error) {
      console.log("Error Logout", error);
    }
  };
  const handleGetUserName = async () => {

    setLoading(true);
    try {
      const res = await axiosClient.get('/user');
      setUser(res.data);
      console.log(user);

    } catch (error) {
      console.log('Error Fetching data', error);
      console.log(error);

    } finally {
      setLoading(false);
    }

  };
  useEffect(() => {
    if (token) {
      handleGetUserName();
    }
  }, [token]);
  const darkTheme =
  {
    aside: theme === 'dark' ? 'border-white/15' : 'border-black/15',
    header: theme === 'dark' ? 'border-white/15' : 'border-black/15',
    linksHover: theme === 'dark' ? 'group-hover:text-black' : 'group-hover:text-white',
    logoHover: theme === 'dark' ? 'group-hover:text-black' :
      'group-hover:text-white'
  }
    ;
  return (

    <div className='h-screen w-8xl mx-auto bg-black/5 px-5 py-10 flex overflow-auto'>

      <aside className={`w-80 border-r h-screen space-y-3 text-left border-black/15 cursor-pointer flex flex-col ${darkTheme.aside}`}>
        <h1>Creative Theme</h1>
        <Link to={'/dashboard'} className='relative overflow-hidden px-4 py-1 cursor-pointer group w-[90%] flex items-center space-x-2 '>
          <MdOutlineSpaceDashboard className={`z-10  text-xl ${darkTheme.logoHover} `} />
          <span className={`absolute inset-0 bg-black translate-x-[-120%] group-hover:translate-x-0 transition-transform duration-400 rounded-xl ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}></span>
          <span className={`relative z-10 text-center  transition-400 ${darkTheme.linksHover}`}>Dashboard</span>
        </Link>

        <Link to={'/users'} className='px-4 py-1  rounded-lg relative group border w-[90%] border-black/20 overflow-hidden flex items-center space-x-2'>
          <HiUsers className={`z-10 ${darkTheme.logoHover} transition-colors duration-400`} />
          <span className={`absolute top-0 left-0 ${theme === 'dark' ? 'bg-white' : 'bg-black'} w-0 h-0 group-hover:w-full group-hover:h-full transition-all duration-400 ease-in-out rounded-br-md`}>
          </span>
          <span className={`relative transition-colors duration-400 z-10 ${darkTheme.linksHover}`}>
            Users
          </span>
        </Link>

        <Link to={'/documents'} className='relative overflow-hidden px-4 py-1 cursor-pointer group w-[90%] flex items-center space-x-2 '>
          <GoFileSubmodule className={`z-10  text-xl ${darkTheme.logoHover}`} />
          <span className={`absolute inset-0 bg-black translate-x-[-120%] group-hover:translate-x-0 transition-transform duration-400 rounded-xl ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}></span>
          <span className={`relative z-10 text-center  transition-400 ${darkTheme.linksHover}`}>Documents Request</span>
        </Link>

        <Link to={'/my-requests'} className='relative overflow-hidden px-4 py-1 cursor-pointer group w-[90%] flex items-center space-x-2 '>
          <FaFileShield className={`z-10  text-xl ${darkTheme.logoHover}`} />
          <span className={`absolute inset-0 bg-black translate-x-[-120%] group-hover:translate-x-0 transition-transform duration-400 rounded-xl ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}></span>
          <span className={`relative z-10 text-center  transition-400 ${darkTheme.linksHover}`}>My Documents Request</span>
        </Link>

      </aside>
      <div className='w-full'>
        <header className={`flex justify-between items-center p-5 border-b ${darkTheme.header}`}>
          <div>
            Header
          </div>

          <div className='flex space-x-4 items-center'>
            <h2>{user?.first_name}</h2>
            {
              theme === 'light' ?
                <MdOutlineDarkMode size={20} onClick={toggleTheme} /> : <MdDarkMode size={20} onClick={toggleTheme} />
            }
            <LuLogOut size={20} onClick={handleLogout} />
          </div>
        </header>
        <main className='p-5'>
          {loading ? (
            <div className='flex justify-center items-center h-full min-h-[400px]'>
              <ClipLoader
                size={50}
                color="#123abc"
                loading={true}
                className=''
              />
            </div>
          )
            : (<Outlet />)}
        </main>
      </div>
    </div>



  );
};

export default DefaultLayout;