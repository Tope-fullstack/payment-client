import { useEffect, useState } from 'react';
import { axiosInstance } from '@/api/axios';
import { CirclesWithBar } from 'react-loader-spinner';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosInstance.get('/transactions');
        setTransactions(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };
  const totalPages = Math.ceil(transactions.length / rowsPerPage);
  const currentData = transactions.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const halfPagesToShow = Math.floor(maxPagesToShow / 2);
    let startPage = Math.max(currentPage - halfPagesToShow, 1);
    let endPage = Math.min(currentPage + halfPagesToShow, totalPages);

    if (currentPage <= halfPagesToShow) {
      endPage = Math.min(maxPagesToShow, totalPages);
    } else if (currentPage + halfPagesToShow >= totalPages) {
      startPage = Math.max(totalPages - maxPagesToShow + 1, 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (loading) {
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
        <p className='text-white font-semibold text-xl'>Loading transactions....</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 z-10 flex justify-center items-center mt-16">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Transactions</h1>
        {transactions.length === 0 ? (
          <p className="text-lg text-gray-500">No transactions available.</p>
        ) : (
          <>
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3">#</th>
                  <th scope="col" className="px-6 py-3">Amount</th>
                  <th scope="col" className="px-6 py-3">Domain</th>
                  <th scope="col" className="px-6 py-3">Time</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Email</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((transaction, index) => (
                  <tr key={transaction.id} className="bg-white border-b">
                    <td className="px-6 py-4">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                    <td className="px-6 py-4">{transaction.amount / 100} NGN</td>
                    <td className="px-6 py-4">{transaction.metadata?.custom_fields?.[0]?.value ?? 'N/A'}</td>
                    <td className="px-6 py-4">{new Date(transaction.created_at).toLocaleString()}</td>
                    <td className={`px-6 py-4 ${transaction.status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                      {transaction.status}
                    </td>
                    <td className="px-6 py-4">{transaction.customer.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between py-4">
              <div>
                <label className="text-sm text-gray-600">Show Rows</label>
                <select
                  value={rowsPerPage}
                  onChange={handleChangeRowsPerPage}
                  className="ml-2 p-1 border border-gray-300 rounded"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
              </div>
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => handleChangePage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => handleChangePage(page)}
                    className={`px-3 py-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  >
                    {page}
                  </button>
                ))}
                {totalPages > getPageNumbers().length && (
                  <button className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50" disabled>
                    ...
                  </button>
                )}
                <button
                  onClick={() => handleChangePage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
              <span className="text-sm text-gray-600">
                Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, transactions.length)} of {transactions.length} Results
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Transactions;
