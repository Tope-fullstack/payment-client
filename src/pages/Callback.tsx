import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '@/api/axios';
import { toast } from 'react-toastify';
import { CirclesWithBar } from 'react-loader-spinner';

const Callback = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('reference');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyTransaction = async () => {
      try {
        const response = await axiosInstance.post('/verify-transaction', { reference });
        if (response.data.status === 'success') {
          toast.success(response.data.message);
          navigate('/transactions');
        } else {
          toast.error(response.data.message);
          navigate('/');
        }
      } catch (err) {
        console.error(err);
        toast.error('Payment verification failed');
      }
    };

    if (reference) {
      verifyTransaction();
    }
  }, [reference, navigate]);

  return (
    <div className='flex flex-col justify-center items-center z-10 gap-4'>
      <div>
        <CirclesWithBar
          height="100"
          width="100"
          color="#4fa94d"
          outerCircleColor="#4fa94d"
          innerCircleColor="#4fa94d"
          barColor="#4fa94d"
          ariaLabel="circles-with-bar-loading"
          visible={true}
        />
      </div>
      <p className='text-white font-semibold text-xl'>Verifying Payment...</p>
    </div>
  );
};

export default Callback;
