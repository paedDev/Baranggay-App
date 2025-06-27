import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../context/context';
import axiosClient from '../../../axiosClient';

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
    } catch (error) {
      setMessage('Error submitting request. Please try again ');
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
    'baranggay_clearance': 'Baranggay Clearance (₱50)',
    'certificate_of_residency': 'Certificate of Residency (₱30)',
    'certificate_of_indigency': 'Certificate of Indigency (₱20)',
    'business_permit': 'Business Permit (₱100)',
    'building_permit': 'Building Permit (₱200)',
    'baranggay_id': 'Baranggay ID (₱80)'
  };
  return (
    <div className='max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-xl overflow-auto h-[550px]'>
      <h1 className='font-bold text-2xl mb-12'>Request Document</h1>
      {
        message && (
          <div className={`p-4 rounded mb-4 ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{message}</div>
        )
      }
      <form action="" className='space-y-8' onSubmit={handleSubmit}>
        <div className='relative group'>
          <select
            name="document_type"
            id="document_type"
            value={formData.document_type}
            onChange={handleInputChange}
            className='rounded px-4 py-2 w-full border border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-400 placeholder:text-xs text-xs '>
            <option value="">Select Document Type</option>
            {
              Object.entries(documentTypes).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))
            }
          </select>
          <label htmlFor="document_type" className='absolute group-focus-within:-top-3 -top-6 group-focus-within:left-3 bg-white left-0 transition-all duration-300 group-focus-within:text-blue-400 group-focus-within:px-1 z-10 font-semibold text-xs'>Document Type</label>
        </div>
        <div className='relative group'>
          <input type="text"
            name='purpose'
            id=''
            value={formData.purpose}
            onChange={handleInputChange}

            className='w-full  rounded px-4 py-2 border border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-400 placeholder:text-xs text-xs' />
          <label htmlFor="purpose" className='absolute left-0 -top-6 font-semibold group group-focus-within:-top-3 group-focus-within:left-3 bg-white group-focus-within:px-1 transition-all duration-400 group-focus-within:text-blue-400 text-xs'>Purpose</label>
        </div>
        <div className='grid md:grid-cols-2 gap-6 '>
          <div className='relative group'>
            <input type="text"
              name='personal_info.full_name'
              id=''
              value={formData.personal_info.full_name}
              onChange={handleInputChange}
              className='w-full  rounded px-4 py-2 border border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-400 placeholder:text-xs text-xs' />
            <label htmlFor="purpose" className='absolute left-0 -top-6 font-semibold group group-focus-within:-top-3 group-focus-within:left-3 bg-white group-focus-within:px-1 transition-all duration-400 group-focus-within:text-blue-400 text-xs'>Full Name</label>

          </div>
          <div className='relative group'>
            <input type="tel"
              name='personal_info.contact_number'
              id=''
              value={formData.personal_info.contact_number}
              onChange={handleInputChange}
              className='w-full  rounded px-4 py-2 border border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-400 placeholder:text-xs text-xs' />
            <label htmlFor="purpose" className='absolute left-0 -top-6 font-semibold group group-focus-within:-top-3 group-focus-within:left-3 bg-white group-focus-within:px-1 transition-all duration-400 group-focus-within:text-blue-400 text-xs'>Contact Number</label>

          </div>
        </div>
        <div className='relative group'>
          <textarea
            name='personal_info.address'
            id=''
            value={formData.personal_info.address}
            onChange={handleInputChange}
            className='w-full  rounded px-4 py-2 border border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-400 placeholder:text-xs max-h-[100px] text-xs' />
          <label htmlFor="purpose" className='absolute left-0 -top-6 font-semibold group group-focus-within:-top-3 group-focus-within:left-3 bg-white group-focus-within:px-1 transition-all duration-400 group-focus-within:text-blue-400 text-xs'>Address</label>

        </div>
        <div className='grid lg:grid-cols-3 grid-cols-1 lg:gap-2 gap-8'>
          <div className='relative group '>
            <input
              type="date"
              name='personal_info.birth_date'
              value={formData.personal_info.birth_date}
              onChange={handleInputChange}
              placeholder='09123456789'
              className='border border-blue-400 px-4 py-2 focus:border-blue-400 focus:ring-1 focus:ring-blue-800 rounded w-full focus:outline-none placeholder:text-xs text-xs' />
            <label htmlFor="birth_date"
              className='absolute -left-4 -top-5 group-focus-within:left-2 group-focus-within:-top-2 z-10  bg-gray-50 px-4 text-xs group-focus-within:text-blue-400 transition-all duration-400 font-semibold'> Birth Date</label>


          </div>

          <div className='relative group '>
            <select
              name='personal_info.civil_status'
              value={formData.personal_info.civil_status}
              onChange={handleInputChange}
              placeholder='09123456789'
              className='border border-blue-400 px-4 py-2 text-xs focus:border-blue-400 focus:ring-1 focus:ring-blue-800 rounded w-full focus:outline-none placeholder:text-xs' >
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
              name='personal_info.occupation'
              value={formData.personal_info.occupation}
              onChange={handleInputChange}
              className='w-full  rounded px-4 py-2 border border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-400 placeholder:text-xs text-xs' />
            <label htmlFor="purpose" className='absolute left-0 -top-6 font-semibold group group-focus-within:-top-3 group-focus-within:left-3 bg-white group-focus-within:px-1 transition-all duration-400 group-focus-within:text-blue-400 text-xs'> Occupation</label>

          </div>
        </div>
        <button className='bg-blue-600 rounded shadow-lg px-4 py-2 hover:bg-blue-400 text-white w-full' disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

export default DocumentRequestForm;