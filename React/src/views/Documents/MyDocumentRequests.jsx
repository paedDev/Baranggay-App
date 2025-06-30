import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/context';
import axiosClient from '../../../axiosClient';
import { NavLink } from 'react-router-dom';
import {
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign,
  MessageSquare,
  Filter,
  Search,
  Plus,
  RefreshCw
} from 'lucide-react';

const MyDocumentRequests = () => {
  const { errors, setErrors } = useContext(GlobalContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const statusConfig = {
    pending: {
      color: 'bg-yellow-100 text-yellow-800',
      icon: Clock,
      label: 'pending'
    }, processing: {
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: RefreshCw,
      label: 'Processing'
    },
    ready: {
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: CheckCircle,
      label: 'Ready'
    },
    completed: {
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      icon: CheckCircle,
      label: 'Completed'
    },
    rejected: {
      color: 'bg-red-100 text-red-800 border-red-200',
      icon: XCircle,
      label: 'Rejected'
    },
  };

  const documentTypes = {
    'barangay_clearance': { name: 'Barangay Clearance', fee: 50 },
    'certificate_of_residency': { name: 'Certificate of Residency', fee: 30 },
    'certificate_of_indigency': { name: 'Certificate of Indigency', fee: 20 },
    'business_permit': { name: 'Business Permit', fee: 100 },
    'building_permit': { name: 'Building Permit', fee: 200 },
    'barangay_id': { name: 'Barangay ID', fee: 80 }
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get('/document-requests');
      setRequests(response.data);
      console.log(response.data);


    } catch (error) {
      console.error(`Error fetching data`, error);

    } finally {
      setLoading(false);
    }
  };

  // get total pending 
  const totalPending = requests.filter(r => r.status === 'pending').length;
  const totalUnpaid = requests.filter(r => !r.paid).length;
  // get filtered rquest here
  const filteredRequests = requests.filter(request => {
    const matchesSearch = documentTypes[request.document_type]?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  const getStatusIcon = (status) => {
    const StatusIcon = statusConfig[status]?.icon;
    return StatusIcon ? <StatusIcon className="w-4 h-4" /> : null;
  };
  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-50 via-white to-inidigo-50 py-8 px-4 rounded-xl'>
      <div className='max-w-6xl mx-auto ' >
        <div className='bg-white rounded-2xl shadow-xl border border-gray-100 mb-8'>
          <div className='bg-gradient-to-b px-4 py-6 from-blue-600 to-indigo-600 rounded-t-2xl mb-2 '>
            <div className='flex text-white items-center justify-between px-4'>
              <div className='flex flex-col '>
                <div className='flex'>
                  <FileText className='w-8 h-8 text-white mr-2 ' />
                  <h2 className='font-bold lg:text-2xl mb-4 text-white'>My Document Requests</h2>
                </div>
                <p className='text-gray-300 lg:text-sm text-xs'>
                  Track and manage your barangay document requests
                </p>
              </div>
              {/* right side */}
              <div className='flex items-center space-x-2 bg-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500 cursor-pointer text-sm transition duration-500'>
                <Plus className='w-4 h-4' />
                <NavLink to={'/documents'} className=''> New Request</NavLink>
              </div>
            </div>

          </div>

          {/* stats card here */}
          <div className='grid md:grid-cols-4 gap-4 p-6'>
            <div className='bg-gradient-to-br from-blue-500 to-indigo-400 p-4 rounded-xl text-white'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className="text-blue-100 text-sm">Total Requests</p>
                  <p className="text-2xl font-bold">{requests.length}</p>
                </div>
                <FileText />
              </div>
            </div>
            <div className='bg-gradient-to-br from-orange-400 to-orange-500 p-4 rounded-xl text-white'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className="text-orange-100 text-sm">Pending</p>
                  <p className="text-2xl font-bold">{totalPending}</p>
                </div>
                <Clock />
              </div>
            </div>
            <div className='bg-gradient-to-br from-green-400 to-green-500 p-4 rounded-xl text-white'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className="text-green-100 text-sm">Ready</p>
                  <p className="text-2xl font-bold">{requests.filter(r => r.status === 'ready').length}</p>
                </div>
                <CheckCircle />
              </div>
            </div>
            <div className='bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-xl text-white'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className="text-red-100 text-sm">Unpaid</p>
                  <p className="text-2xl font-bold">{totalUnpaid}</p>
                </div>
                <DollarSign />
              </div>
            </div>
          </div>
        </div>
        <div className='mb-2 p-4 shadow-xl rounded-xl text-gray-600 bg-white'>
          <div className='flex flex-col gap-4 md:flex-row'>
            <div className='flex-1 relative'>
              <Search className='absolute top-3 left-4 w-4 h-4' />
              <input type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='rounded-xl w-full px-4 py-2 pl-10 border focus:outline-none border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
                placeholder='Search by document type or purpose..' />

            </div>
            <div className='flex items-center'>
              <Filter className='w-4 h-4 mr-2' />
              <select name="" id=""
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className='border border-gray-600 rounded px-2'>
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="ready">Ready</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
        {
          filteredRequests.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No requests found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Submit your first document request to get started!'}
              </p>
              <NavLink to={'/documents'} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all">
                Submit New Request
              </NavLink>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <div key={request.id} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {documentTypes[request.document_type]?.name}
                          </h3>
                          <p className="text-gray-600 mb-2 flex items-center">
                            <span className="font-medium">Purpose:</span>
                            <span className="ml-2">{request.purpose}</span>
                          </p>
                          <div className="flex items-center text-sm text-gray-500 space-x-4">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>Requested: {new Date(request.requested_at).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center">
                              <span>ID: #{request.id}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col lg:items-end space-y-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(request.status)}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusConfig[request.status]?.color}`}>
                          {statusConfig[request.status]?.label}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">
                            ₱{parseFloat(request.fee).toFixed(2)}
                          </div>
                          {!request.paid ? (
                            <div className="flex items-center text-red-600 text-sm">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              <span>Not Paid</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-green-600 text-sm">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              <span>Paid</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {request.admin_notes && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                      <div className="flex items-start space-x-2">
                        <MessageSquare className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900 mb-1">Admin Notes:</p>
                          <p className="text-gray-700">{request.admin_notes}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default MyDocumentRequests;