import React, { useContext, useRef } from 'react';
import { VscVscodeInsiders } from "react-icons/vsc";
import { GlobalContext } from '../context/context';
import baranggay from "../assets/images/baranggay.jpg";
import skLogo from "../assets/images/sk_logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from '../../axiosClient';


const LoginPage = () => {
  const { user, setUser, setToken, token, loading, setLoading, errors, setErrors } = useContext(GlobalContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    };
    console.log(payload);

    try {
      const res = await axiosClient.post('/login', payload);
      console.log(res.data);
      setUser(res.data.user);
      setToken(res.data.token);
      setTimeout(() => {
        navigate('/users');
      }, 3000);
    } catch (error) {
      console.log(error.response.data.errors);
      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);

        } else if (error.response.data.message) {
          setErrors({
            email: [error.response.data.message]
          });
        }
      }
      console.log('current errors', errors);


    } finally {
      setLoading(false);
    }
  };
  const getError = (field) => {
    if (!errors || !errors[field]) return null;
    return Array.isArray(errors[field]) ? errors[field][0] : errors[field];
  };
  return (
    <div className='h-screen p-5 w-8xl w-full '>
      <div className='flex items-center space-x-2'>
        <img src={skLogo} alt="sk_logo" className='w-15 h-15' />
        <h1 className='font-bold uppercase tracking-wide'>SK Baranggay </h1>
      </div>

      <div className='flex justify-around items-center h-[85%] my-auto w-full '>
        {/* content */}
        <form action="" onSubmit={handleSubmit} className='flex flex-col w-[500px] p-10 mx-auto lg:flex-1'>
          <div className='mb-12'>
            <h2 className='lg:text-sm text-xs text-gray-500 mb-5'>Start your journey</h2>
            <h1 className='font-bold lg:text-3xl text-lg'>Login to Baranggay</h1>

          </div>
          <div className='space-y-8'>
            <div className='relative group '>
              <input
                type="email"
                name='email'
                ref={emailRef}
                id='email'
                placeholder='example@gmail.com'
                className='border border-blue-400 px-4 py-2 focus:border-blue-400 focus:ring-1 focus:ring-blue-800 rounded w-full focus:outline-none placeholder:text-xs' />
              <label htmlFor="email"
                className='absolute -left-1 -top-5 group-focus-within:left-2 group-focus-within:-top-2 z-10 text-gray-600 bg-gray-50 px-4 text-xs group-focus-within:text-blue-400 transition-all duration-400 '> Email</label>

              {
                getError('email') && (
                  <p className='text-xs text-red-500 ml-1 mt-1'>{getError('email')}</p>
                )
              }
            </div>

            <div className='relative group'>
              <input
                type="password"
                name='password'
                ref={passwordRef}
                id='password'
                placeholder='********' className='px-4 py-2 border-blue-400 w-full border focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 rounded placeholder:text-xs' />
              <label htmlFor="password" className='absolute group-focus-within:-top-2 group-focus-within:left-2 bg-gray-50 text-gray-600 px-4 text-xs rounded -top-5 -left-1 transition-all duration-400 group-focus-within:text-blue-400'> Password</label>
              {
                getError('password') && (
                  <p className='text-xs text-red-500 ml-1 mt-1'>{getError('password')}</p>
                )
              }
            </div>
          </div>

          <div className='mt-4'>
            {/* this button has an animation */}
            <button className='w-full relative px-4 py-2 rounded shadow-sm overflow-hidden group border border-blue-400'>
              <span className='absolute top-0 left-0 w-0 h-0 group-hover:w-full group-hover:h-full group-hover:bg-blue-400 transform -translate-x-[100%] group-hover:translate-x-0 duration-500'></span>
              <span className='relative z-10 w-full  group-hover:text-white  text-sm text-blue-400 font-bold'>Login</span>
            </button>
            <div className='mt-4 text-xs'>
              <span className='text-gray-600'>Don't have an account ?</span>
              <Link to={'/signup'} className='text-blue-400 cursor-pointer '> SignUp</Link >
            </div>

          </div>
        </form>
        <div className=' bg-gray-50 shadow-xl  flex-2 rounded-2xl overflow-hidden lg:block hidden '>

          {/* img source */}
          <img src={baranggay} alt="" className=' object-contain w-full h-screen rounded-2xl ' />
        </div>
      </div>

    </div>

  );
};

export default LoginPage;