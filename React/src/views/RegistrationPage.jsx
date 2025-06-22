import React, { useContext, useRef, useState } from 'react';
import { VscVscodeInsiders } from "react-icons/vsc";
import { GlobalContext } from '../context/context';
import baranggay from "../assets/images/baranggay.jpg";
import { Link } from "react-router-dom";
import skLogo from "../assets/images/sk_logo.jpg";
const RegistrationPage = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  // const emailRef = useRef();
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const middleNameRef = useRef();
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [civilStatus, setCivilStatus] = useState();;
  const [purok, setPurok] = useState('');
  const houseAddressRef = useRef();
  const occupationRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [registrationType, setRegistrationType] = useState('resident');
  const { user, token, loading, setLoading, errors, setErrors } = useContext(GlobalContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      const payload = {
        first_name: firstNameRef.current.value,
        last_name: lastNameRef.current.value,
        middle_name: middleNameRef.current?.value || '',
        email,
        contact_number: number,
        birth_date: birthDate,
        gender,
        civil_status: civilStatus,
        purok,
        house_address: houseAddressRef.current.value,
        occupation: occupationRef.current.value,
        password: passwordRef.current.value,
        password_confirmation: passwordConfirmationRef.current.value,
        registration_type: registrationType
      };
      console.log(payload);

      // console.log({
      //   firstNameRef, lastNameRef, email Ref, passwordConfirmationRef, passwordRef
      // });

    } catch (error) {

    }
  };
  const purokOptions = [
    'Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'Purok 5', 'Purok 6', 'Purok 7', 'Purok 8', 'Purok 9', 'Purok 10',
  ];
  return (
    <div className='h-screen p-5 w-8xl w-full '>
      <div className='flex items-center space-x-2'>
        <img src={skLogo} alt="sk_logo" className='w-15 h-15' />
        <h1 className='font-bold uppercase tracking-wide'>SK Baranggay </h1>
      </div>

      <div className='flex justify-around items-center h-[85%]  w-full '>
        {/* content */}
        <form action="" onSubmit={handleSubmit} className='flex flex-col w-[500px] p-10  mx-auto lg:flex-1'>
          <div className='my-10 '>
            <h2 className='lg:text-sm text-xs text-gray-500 '>Welcome, Kabaranggay</h2>
            <h1 className='font-bold mb-2'>Registration Type</h1>
            <div className='flex space-x-4 '>
              <div className='space-x-1 flex items-center'>
                <input type="radio" name="resident" id="resident" value='resident' checked={registrationType === "resident"} onChange={(e) => setRegistrationType(e.target.value)} />
                <label htmlFor="resident">Resident</label>
              </div>
              <div className='space-x-1 flex items-center'>
                <input type="radio" name="baranggay_staffs"
                  value="staff" checked={registrationType ===
                    'staff'
                  } id="baranggay_staffs" onChange={(e) => setRegistrationType(e.target.value)} />
                <label htmlFor="baranggay_staffs">Baranggay Staffs</label>
              </div>
            </div>
          </div>
          <div className='space-y-8'>
            <div className='grid lg:grid-cols-3 lg:gap-2 gap-8  grid-cols-1  '>
              <div className='relative group '>
                <input
                  ref={firstNameRef}
                  type="text"
                  name='firstname'
                  id='firstname'
                  placeholder='John'
                  className='border border-blue-400 px-4 py-2 focus:border-blue-400 focus:ring-1 rounded w-full  focus:outline-none placeholder:text-xs focus:ring-blue-800 text-xs' />
                <label htmlFor="firstname"
                  className='absolute -left-1 -top-5 group-focus-within:left-2 group-focus-within:-top-2 z-10 text-gray-600 bg-gray-50 px-4 text-xs group-focus-within:text-blue-400 transition-all duration-400 '> First Name</label>
              </div>
              <div className='relative group '>
                <input
                  ref={middleNameRef}
                  type="text"
                  name='middlename'
                  id='middlename'
                  placeholder='Sablaon'
                  className='border border-blue-400 px-4 py-2 focus:border-blue-400 focus:ring-1 focus:ring-blue-800 rounded w-full focus:outline-none placeholder:text-xs text-xs' />
                <label htmlFor="middlename"
                  className='absolute -left-1 -top-5 group-focus-within:left-2 group-focus-within:-top-2 z-10 text-gray-600 bg-gray-50 px-4 text-xs group-focus-within:text-blue-400 transition-all duration-400 '> Middle Name</label>
              </div>
              <div className='relative group '>
                <input
                  ref={lastNameRef}
                  type="text"
                  name='lastname'
                  id='lastname'
                  placeholder='Paed'
                  className='border text-xs border-blue-400 px-4 py-2 focus:border-blue-400 focus:ring-1 focus:ring-blue-800 rounded w-full focus:outline-none placeholder:text-xs' />
                <label htmlFor="email"
                  className='absolute -left-1 -top-5 group-focus-within:left-2 group-focus-within:-top-2 z-10 text-gray-600 bg-gray-50 px-4 text-xs group-focus-within:text-blue-400 transition-all duration-400 '> Last Name</label>
              </div>
            </div>
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-8 lg:gap-2'>
              <div className='relative group '>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name='email'
                  id='email'
                  placeholder='example@gmail.com'
                  className='border border-blue-400 px-4 py-2 focus:border-blue-400 focus:ring-1 focus:ring-blue-800 rounded w-full focus:outline-none placeholder:text-xs text-xs' />
                <label htmlFor="email"
                  className='absolute -left-1 -top-5 group-focus-within:left-2 group-focus-within:-top-2 z-10 text-gray-600 bg-gray-50 px-4 text-xs group-focus-within:text-blue-400 transition-all duration-400 '> Email</label>
              </div>

              <div className='relative group '>
                <input
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  type="number"
                  name='contact_number'
                  id='contact_number'
                  placeholder='09123456789'
                  className='border border-blue-400 px-4 py-2 focus:border-blue-400 focus:ring-1 focus:ring-blue-800 rounded w-full focus:outline-none placeholder:text-xs text-xs' />
                <label htmlFor="contact_number"
                  className='absolute -left-1 -top-5 group-focus-within:left-2 group-focus-within:-top-2 z-10 text-gray-600 bg-gray-50 px-4 text-xs group-focus-within:text-blue-400 transition-all duration-400 '> Contact Number</label>
              </div>
            </div>
            <div className='grid lg:grid-cols-3 grid-cols-1 lg:gap-2 gap-8'>
              <div className='relative group '>
                <input
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  type="date"
                  name='birth_date'
                  id='birth_date'
                  placeholder='09123456789'
                  className='border border-blue-400 px-4 py-2 focus:border-blue-400 focus:ring-1 focus:ring-blue-800 rounded w-full focus:outline-none placeholder:text-xs text-xs' />
                <label htmlFor="birth_date"
                  className='absolute -left-1 -top-5 group-focus-within:left-2 group-focus-within:-top-2 z-10 text-gray-600 bg-gray-50 px-4 text-xs group-focus-within:text-blue-400 transition-all duration-400 '> Birth Date</label>
              </div>
              <div className='relative group '>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  name='gender'
                  id='gender'
                  placeholder='09123456789'
                  className='border text-xs border-blue-400 px-4 py-2 focus:border-blue-400 focus:ring-1 focus:ring-blue-800 rounded w-full focus:outline-none placeholder:text-xs'
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select >
                <label htmlFor="gender"
                  className='absolute -left-1 -top-5 group-focus-within:left-2 group-focus-within:-top-2 z-10 text-gray-600 bg-gray-50 px-4 text-xs group-focus-within:text-blue-400 transition-all duration-400 '>Gender</label>
              </div>
              <div className='relative group '>
                <select
                  value={civilStatus}
                  onChange={(e) => setCivilStatus(e.target.value)}
                  name='civil_status'
                  id='civil_status'
                  placeholder='09123456789'
                  className='border border-blue-400 px-4 py-2 text-xs focus:border-blue-400 focus:ring-1 focus:ring-blue-800 rounded w-full focus:outline-none placeholder:text-xs' >
                  <option value="">Civil Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Widowed">Widowed</option>
                </select>
                <label htmlFor="civil_status"
                  className='absolute -left-1 -top-5 group-focus-within:left-2 group-focus-within:-top-2 z-10 text-gray-600 bg-gray-50 px-4 text-xs group-focus-within:text-blue-400 transition-all duration-400 '> Civil Status</label>
              </div>
            </div>

            <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-2 gap-8'>
              <div className='relative group '>
                <input
                  ref={houseAddressRef}
                  type="text"
                  name='house_address'
                  id='house_address'
                  placeholder='House No., Street Name'
                  className='border border-blue-400 px-4 py-2 focus:border-blue-400 focus:ring-1 rounded w-full  focus:outline-none placeholder:text-xs focus:ring-blue-800 text-xs ' />
                <label htmlFor="house_address"
                  className='absolute -left-1 -top-5 group-focus-within:left-2 group-focus-within:-top-2 z-10 text-gray-600 bg-gray-50 px-4 text-xs group-focus-within:text-blue-400 transition-all duration-400 '> First Name</label>
              </div>
              <div className='relative group '>
                <select
                  value={purok}
                  onChange={(e) => setPurok(e.target.value)}
                  name='purok'
                  id='purok'
                  className='border border-blue-400 px-4 py-2 focus:border-blue-400 focus:ring-1 focus:ring-blue-800 rounded w-full text-xs focus:outline-none placeholder:text-xs' >
                  <option value="">Select Purok</option>
                  {
                    purokOptions.map((opt) => (
                      <option value={opt} key={opt}>{opt}</option>
                    ))
                  }
                </select>
                <label htmlFor="purok"
                  className='absolute -left-1 -top-5 group-focus-within:left-2 group-focus-within:-top-2 z-10 text-gray-600 bg-gray-50 px-4 text-xs group-focus-within:text-blue-400 transition-all duration-400  '> Civil Status</label>
              </div>
            </div>

            <div>
              {
                registrationType === 'resident' &&
                (<div className='relative group '>
                  <input
                    ref={occupationRef}
                    type="text"
                    name='occupation'
                    id='occupation'
                    placeholder='e.g., Teacher, Farmer, Programmer'
                    className='border border-blue-400 px-4 py-2 focus:border-blue-400 focus:ring-1 rounded w-full  focus:outline-none placeholder:text-xs focus:ring-blue-800 text-xs ' />
                  <label htmlFor="occupation"
                    className='absolute -left-1 -top-5 group-focus-within:left-2 group-focus-within:-top-2 z-10 text-gray-600 bg-gray-50 px-4 text-xs group-focus-within:text-blue-400 transition-all duration-400 '> Occupation (for Residents Only)</label>
                </div>)
              }

            </div>
            <div className='grid  lg:grid-cols-2 grid-cols-1 lg:gap-2 gap-8'>
              <div className='relative group'>
                <input
                  ref={passwordRef}
                  type="password"
                  name='password'
                  id='password'
                  placeholder='********' className='px-4 py-2 border-blue-400 w-full border focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 rounded placeholder:text-xs text-xs' />
                <label htmlFor="password" className='absolute group-focus-within:-top-2 group-focus-within:left-2 bg-gray-50 text-gray-600 px-4 text-xs rounded -top-5 -left-1 transition-all duration-400 group-focus-within:text-blue-400'> Password</label>
              </div>
              <div className='relative group'>
                <input
                  ref={passwordConfirmationRef}
                  type="password"
                  name='password_confirmation'
                  id='password_confirmation'
                  placeholder='********' className='px-4 py-2 border-blue-400 w-full border focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 rounded placeholder:text-xs text-xs' />
                <label htmlFor="password" className='absolute group-focus-within:-top-2 group-focus-within:left-2 bg-gray-50 text-gray-600 px-4 text-xs rounded -top-5 -left-1 transition-all duration-400 group-focus-within:text-blue-400'> Password Confirmation</label>
              </div>
            </div>

          </div>

          <div className='mt-4'>
            {/* this button has an animation */}
            <button className='w-full relative px-4 py-2 rounded shadow-sm overflow-hidden group border border-blue-400'>
              <span className='absolute top-0 left-0 w-0 h-0 group-hover:w-full group-hover:h-full group-hover:bg-blue-400 transform -translate-x-[100%] group-hover:translate-x-0 duration-500'></span>
              <span className='relative z-10 w-full font-bold  group-hover:text-white  text-sm text-blue-400'>Sign Up</span>
            </button>
            <div className='mt-4 text-xs'>
              <span className='text-gray-600'>Already have an account ?</span>
              <Link to={'/login'} className='text-blue-400 cursor-pointer '> Login</Link >
            </div>

          </div>
        </form>

        <div className=' bg-gray-50 shadow-xl  flex-2 rounded-2xl overflow-hidden lg:block hidden '>

          {/* img source */}
          <img src={baranggay} alt="" className=' object-contain w-full h-screen rounded-2xl ' />
        </div>
      </div >

    </div >
  );
};

export default RegistrationPage;