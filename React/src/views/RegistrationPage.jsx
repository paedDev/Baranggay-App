import React, { useContext } from 'react';
import { VscVscodeInsiders } from "react-icons/vsc";
import { GlobalContext } from '../context/context';
import image1 from "../assets/images/anime.jpg";
import { Link } from "react-router-dom";
const RegistrationPage = () => {
  const { user, token, loading, setLoading } = useContext(GlobalContext);
  const handleSubmit = () => {

  };
  return (
    <div className='h-screen p-5 w-8xl w-full '>
      <div className='flex items-center space-x-2'>
        <VscVscodeInsiders size={40} className='text-blue-600' />
        <h1 className='font-bold uppercase tracking-wide'>InsideBox</h1>
      </div>

      <div className='flex justify-around items-center h-[80%] my-auto w-full '>
        {/* content */}
        <form action="" onSubmit={handleSubmit} className='flex flex-col w-[500px] p-10 mx-auto lg:flex-1'>
          <div className='mb-12'>
            <h2 className='lg:text-sm text-xs text-gray-500 mb-5'>Start your journey</h2>
            <h1 className='font-bold lg:text-3xl text-lg'>Sign Up to InsideBox</h1>

          </div>
          <div className='space-y-8'>
            <div className='relative group '>
              <input
                type="text"
                name='firstname'
                id='firstname'
                placeholder='John'
                className='border border-blue-400 px-4 py-2 focus:border-blue-400 focus:ring-1 focus:ring-blue-800 rounded w-full focus:outline-none placeholder:text-xs' />
              <label htmlFor="firstname"
                className='absolute -left-1 -top-5 group-focus-within:left-2 group-focus-within:-top-2 z-10 text-gray-600 bg-gray-50 px-4 text-xs group-focus-within:text-blue-400 transition-all duration-400 '> First Name</label>
            </div>
            <div className='relative group '>
              <input
                type="text"
                name='lastname'
                id='lastname'
                placeholder='Paed'
                className='border border-blue-400 px-4 py-2 focus:border-blue-400 focus:ring-1 focus:ring-blue-800 rounded w-full focus:outline-none placeholder:text-xs' />
              <label htmlFor="email"
                className='absolute -left-1 -top-5 group-focus-within:left-2 group-focus-within:-top-2 z-10 text-gray-600 bg-gray-50 px-4 text-xs group-focus-within:text-blue-400 transition-all duration-400 '> Last Name</label>
            </div>
            <div className='relative group '>
              <input
                type="email"
                name='email'
                id='email'
                placeholder='example@gmail.com'
                className='border border-blue-400 px-4 py-2 focus:border-blue-400 focus:ring-1 focus:ring-blue-800 rounded w-full focus:outline-none placeholder:text-xs' />
              <label htmlFor="email"
                className='absolute -left-1 -top-5 group-focus-within:left-2 group-focus-within:-top-2 z-10 text-gray-600 bg-gray-50 px-4 text-xs group-focus-within:text-blue-400 transition-all duration-400 '> Email</label>
            </div>

            <div className='relative group'>
              <input
                type="password"
                name='password'
                id='password'
                placeholder='********' className='px-4 py-2 border-blue-400 w-full border focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 rounded placeholder:text-xs' />
              <label htmlFor="password" className='absolute group-focus-within:-top-2 group-focus-within:left-2 bg-gray-50 text-gray-600 px-4 text-xs rounded -top-5 -left-1 transition-all duration-400 group-focus-within:text-blue-400'> Password</label>
            </div>
          </div>

          <div className='mt-4'>
            {/* this button has an animation */}
            <button className='w-full relative px-4 py-2 rounded shadow-sm overflow-hidden group border border-blue-400'>
              <span className='absolute top-0 left-0 w-0 h-0 group-hover:w-full group-hover:h-full group-hover:bg-blue-400 transform -translate-x-[100%] group-hover:translate-x-0 duration-500'></span>
              <span className='relative z-10 w-full  group-hover:text-white  text-sm text-blue-400'>Sign Up</span>
            </button>
            <div className='mt-4 text-xs'>
              <span className='text-gray-600'>Already have an account ?</span>
              <Link to={'/login'} className='text-blue-400 cursor-pointer '> Login</Link >
            </div>

          </div>
        </form>

        <div className=' bg-gray-50 shadow-xl border-l border-black flex-2 rounded-2xl overflow-hidden lg:block hidden '>

          {/* img source */}
          <img src={image1} alt="" className=' object-cover w-full h-screen rounded-2xl ' />
        </div>
      </div>

    </div>
  );
};

export default RegistrationPage;