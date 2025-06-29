import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/context';
import axiosClient from '../../../axiosClient';

const MyDocumentRequests = () => {
  const { errors, setErrors } = useContext(GlobalContext);
  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(true);
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    ready: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800',
    rejected: 'bg-red-100 text-red-800',
  };

  const documentTypes = {
    'barangay_clearance': 'Barangay Clearance ',
    'certificate_of_residency': 'Certificate of Residency ',
    'certificate_of_indigency': 'Certificate of Indigency ',
    'business_permit': 'Business Permit',
    'building_permit': 'Building Permit ',
    'barangay_id': 'Barangay ID '
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  const fetchRequests = async () => {

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
  return (
    <div className='max-w-4xl mx-auto'>
      <h2 className='font-bold text-2xl mb-4'>My Document Requests</h2>
      {
        requests.length === 0 ? (
          <div className='text-center py-8 text-gray-500'>
            No document requests found. Submit your first requests!
          </div>
        ) : (
          <div className='space-y-4'>
            {
              requests.map((request) => (
                <div className='bg-white p-6 rounded-lg shadow-lg border ' key={request.id}>
                  <div className='flex justify-between items-start'>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {documentTypes[request.document_type]}
                      </h3>
                      <p className="text-gray-600">Purpose: {request.purpose}</p>
                      <p className="text-sm text-gray-500">
                        Requested: {new Date(request.requested_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className='text-right'>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[request.status]}`}>
                        {
                          request.status.charAt(0).toUpperCase() + request.status.slice(1)
                        }
                      </span>
                      <div className='mt-2 font-bold text-lg'>
                        ₱{parseFloat(request.fee).toFixed(2)}
                      </div>
                      {
                        !request.paid && (
                          <div className='text-red-400 text-sm'>Not Paid</div>
                        )
                      }
                    </div>
                  </div>

                  {request.admin_notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded">
                      <p className="text-sm"><strong>Admin Notes:</strong> {request.admin_notes}</p>
                    </div>
                  )}
                </div>
              ))
            }

          </div>
        )
      }
    </div>
  );
};

export default MyDocumentRequests;