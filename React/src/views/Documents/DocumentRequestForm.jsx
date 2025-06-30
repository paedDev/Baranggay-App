import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../context/context';
import axiosClient from '../../../axiosClient';
import { useNavigate } from 'react-router-dom';
import { IoDocumentText } from "react-icons/io5";
import { FileText, User, MapPin, Phone, Calendar, Briefcase, AlertCircle, CheckCircle, Send } from 'lucide-react';
const DocumentRequestForm = () => {
  const { loading, setLoading, message, setMessage } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    document_type: '',
    purpose: '',
    personal_info: {
      full_name: '',
      address: "",
      contact_number: '',
      birth_date: '',
      civil_status: '',
      occupation: ''
    }
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await axiosClient.post('/document-requests', formData);
      setMessage('Document request submitted succusfully!');
      setFormData({
        document_type: '',
        purpose: '',
        personal_info: {
          full_name: '',
          address: "",
          contact_number: '',
          birth_date: '',
          civil_status: '',
          occupation: ''
        }
      });
      console.log(response);
      navigate('/my-requests');
    } catch (error) {
      setMessage('Error submitting request. Please try again ');
      setTimeout(() => {
        setMessage('');
      }, 5000);

      console.log('Error:', error);
    } finally {
      setLoading(false);
    }

  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };


  const documentTypes = {
    'barangay_clearance': 'Barangay Clearance (₱50)',
    'certificate_of_residency': 'Certificate of Residency (₱30)',
    'certificate_of_indigency': 'Certificate of Indigency (₱20)',
    'business_permit': 'Business Permit (₱100)',
    'building_permit': 'Building Permit (₱200)',
    'barangay_id': 'Barangay ID (₱80)'
  };
  return (
    <div className=' px-4 py-8  bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-xl shadow-xl overflow-auto min-h-screen'>
      <div className='max-w-4xl  mx-auto'>
        {/* header */}
        <div className='text-center'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4'>
            <FileText className='w-8 h-8 text-white' />
          </div>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Document Request </h1>
          <p className='text-gray-600 text-sm mb-2'>Submit your barangay document request quickly and easily</p>
        </div>

        {/* message alrt here */}
        {
          message && (
            <div className={`p-4 rounded mb-4 
              ${message.includes('Error')
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'}`}

            >{message}</div>
          )
        }
        <div className='bg-white  shadow-xl border border-gray-100 overflow-hidden rounded-t-2xl '>
          <div className='bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 '>
            <h2 className="text-xl font-semibold text-white">Request Information</h2>
            <p className="text-blue-100 text-sm mt-1">Please fill out all required fields</p>
          </div>
        </div>

        <form action="" className='p-8 space-y-8 shadow-xl rounded-b-2xl' onSubmit={handleSubmit} >

          <div className='relative group mt-1'>
            <select
              name="document_type"
              id="document_type"
              value={formData.document_type}
              onChange={handleInputChange}
              className='rounded px-4 py-2 w-full border focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-400 placeholder:text-xs text-xs '>
              <option value="">Select Document Type</option>
              {
                Object.entries(documentTypes).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))
              }
            </select>

            <label htmlFor="document_type" className='absolute group-focus-within:-top-3 -top-6 group-focus-within:left-3  left-0 transition-all duration-300 group-focus-within:text-blue-400 group-focus-within:px-1 z-10 font-semibold text-xs flex items-center group-focus-within:bg-gray-50'>
              <span className='mr-1'>
                <FileText className='w-4 h-4' />
              </span>Document Type</label>
          </div>
          <div className='relative group'>
            <input type="text"
              name='purpose'
              id=''
              placeholder='e.g, Employer, Business registration'
              value={formData.purpose}
              onChange={handleInputChange}

              className='w-full  rounded px-4 py-2 border  focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-400 placeholder:text-xs text-xs' />
            <label htmlFor="purpose" className='absolute left-0 -top-6 font-semibold group group-focus-within:-top-3 group-focus-within:left-3 bg-gray-50 group-focus-within:px-1 transition-all duration-400 group-focus-within:text-blue-400 text-xs'>Purpose</label>
          </div>


          <div className="border-t pt-8 border-gray-400">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Personal Information
            </h3>
            <div className='grid md:grid-cols-2 gap-6 pt-4 space-y-3 '>
              <div className='relative group'>
                <input type="text"
                  placeholder='Enter your complete name'
                  name='personal_info.full_name'
                  id=''
                  value={formData.personal_info.full_name}
                  onChange={handleInputChange}
                  className='w-full  rounded px-4 py-2 border  focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-400 placeholder:text-xs text-xs' />
                <label htmlFor="purpose" className='absolute left-0 -top-6 font-semibold group group-focus-within:-top-3 group-focus-within:left-3 bg-white group-focus-within:px-1 transition-all duration-400 group-focus-within:text-blue-400 text-xs'>Full Name</label>

              </div>
              <div className='relative group'>
                <input type="tel"
                  name='personal_info.contact_number'
                  placeholder='09123456789'
                  id=''
                  value={formData.personal_info.contact_number}
                  onChange={handleInputChange}
                  className='w-full  rounded px-4 py-2 border focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-400 placeholder:text-xs text-xs' />
                <label htmlFor="purpose" className='absolute left-0 -top-6 font-semibold group group-focus-within:-top-3 group-focus-within:left-3 bg-white group-focus-within:px-1 transition-all duration-400 group-focus-within:text-blue-400 text-xs flex items-center'><span className='mr-2'><Phone className='h-4 w-4' /></span>Contact Number</label>

              </div>
            </div>
          </div>
          <div className='relative group'>
            <textarea
              name='personal_info.address'
              placeholder='House number,street,brangay,city,province'
              id=''
              value={formData.personal_info.address}
              onChange={handleInputChange}
              className='w-full  rounded px-4 py-2 border  focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-400 placeholder:text-xs max-h-[100px] text-xs' />
            <label htmlFor="purpose" className='absolute left-0 -top-6 font-semibold group group-focus-within:-top-3 group-focus-within:left-3 bg-white group-focus-within:px-1 transition-all duration-400 group-focus-within:text-blue-400 text-xs flex items-center'>
              <MapPin className='w-4 h-4 mr-1' />
              Complete Address
            </label>

          </div>
          <div className='grid lg:grid-cols-3 grid-cols-1 lg:gap-2 gap-8'>
            <div className='relative group '>
              <input
                type="date"
                name='personal_info.birth_date'
                value={formData.personal_info.birth_date}
                onChange={handleInputChange}
                placeholder='09123456789'
                className='border  px-4 py-2 focus:border-blue-400 focus:ring-1 focus:ring-blue-800 rounded w-full focus:outline-none placeholder:text-xs text-xs' />
              <label htmlFor="birth_date"
                className='absolute -left-4 -top-5 group-focus-within:left-2 group-focus-within:-top-2 z-10  bg-gray-50 px-4 text-xs group-focus-within:text-blue-400 transition-all duration-400 font-semibold flex items-center '>
                <Calendar className='w-4 h-4 mr-1' />
                Birth Date</label>


            </div>

            <div className='relative group '>
              <select
                name='personal_info.civil_status'
                value={formData.personal_info.civil_status}
                onChange={handleInputChange}
                placeholder='09123456789'
                className='border  px-4 py-2 text-xs focus:border-blue-400 focus:ring-1 focus:ring-blue-800 rounded w-full focus:outline-none placeholder:text-xs' >
                <option value="">Civil Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Widowed">Widowed</option>
                <option value="Divorced">Divorced</option>
              </select>
              <label htmlFor="civil_status"
                className='absolute -left-4 -top-5 group-focus-within:left-2 group-focus-within:-top-2 z-10  bg-gray-50 px-4 text-xs group-focus-within:text-blue-400 transition-all duration-400 font-semibold'> Civil Status</label>

            </div>
            <div className='relative group'>
              <input type="text"
                placeholder='e.g., Teacher, Student'
                name='personal_info.occupation'
                value={formData.personal_info.occupation}
                onChange={handleInputChange}
                className='w-full  rounded px-4 py-2 border  focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-400 placeholder:text-xs text-xs' />
              <label htmlFor="purpose" className='absolute left-0 -top-6 font-semibold group group-focus-within:-top-3 group-focus-within:left-3 bg-white group-focus-within:px-1 transition-all duration-400 group-focus-within:text-blue-400 text-xs flex items-center'>
                <Briefcase className='w-4 h-4 mr-1' /> Occupation</label>

            </div>
          </div>
          <button className='bg-gradient-to-r from-blue-600 to-indigo-600 rounded shadow-lg px-4 py-2 hover:bg-blue-400 text-white w-full font-semibold' disabled={loading}>
            {loading ? 'Submitting...' :
              <span className='flex items-center justify-center'>
                <Send className='w-4 h-4 mr-2' />
                Submit Document Request
              </span>}
          </button>
        </form>
        <div className='p-6 text-sm text-center text-gray-400'>
          <p>Processing time: 3-5 business days • For urgent requests, please visit the baranggay office </p>
        </div>
      </div>
    </div >
  );
};

export default DocumentRequestForm;