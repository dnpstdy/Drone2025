'use client'

import { useEffect, useState } from 'react';

const ViewLog = () => {
    const [droneLogs, setDroneLogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAllDrones(currentPage);
    }, [currentPage]);

    const fetchAllDrones = async (page) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_PATH}/logs?page=${page}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTotalPages(data.totalPages);
            setDroneLogs(data.data);
        } catch (error) {
            setError('Error fetching data: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const createPaginationButtons = () => {
        const buttons = [];
        const maxVisibleButtons = 10; 
        const totalButtonsToShow = maxVisibleButtons;
        const sideButtons = Math.floor(totalButtonsToShow / 2); 
    
        buttons.push(
<button
    key="prev"
    className={`px-3 py-2 mx-1 font-semibold hover:drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)] ${
        currentPage === 1
            ? 'text-S-75'
            : 'text-P-100'
    }`}
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
>
    ❮
</button>
        );
    
        buttons.push(
            <button
                key={1}
                className={`h-[40px] w-[40px] mx-1${
                    currentPage === 1
                    ? 'bg-P-50 text-P-200 font-semibold rounded-[50%] drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)]'
                    : 'unselected  font-semibold rounded-[50%] '
            }`}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
            >
                1
            </button>
        );
    
        if (currentPage > sideButtons + 2) {
            buttons.push(
                <span key="dots-start" className="px-4 py-2 mx-1 bg-[#2D3437] text-[#C1DEE2] font-semibold rounded-md ">...</span>
            );
        }
    
        const startPage = Math.max(2, currentPage - sideButtons);
        const endPage = Math.min(totalPages - 1, currentPage + sideButtons);
    
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    className={`h-[40px] w-[40px] mx-1 ${
                        i === currentPage
                            ? 'bg-P-50 text-P-200 font-semibold rounded-[50%] drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)]'
                            : 'unselected font-semibold rounded-[50%]  '
                    }`}
                    disabled={i === currentPage}
                    onClick={() => setCurrentPage(i)}
                >
                    {i}
                </button>
            );
        }
    
        if (currentPage < totalPages - sideButtons - 1) {
            buttons.push(
                <span key="dots-end" className="px-4 py-2 mx-1 text-S-300 font-semibold rounded-[50%] drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)]">...</span>
            );
        }
    
        buttons.push(
            <button
                key={totalPages}
                className={`h-[40px] w-[40px] mx-1 ${
                    currentPage === totalPages
                        ? 'bg-P-50 text-P-200 font-semibold rounded-[50%] drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)]'
                        : 'unselected font-semibold rounded-[50%] '
                }`}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
            >
                {totalPages}
            </button>
        );
    
        buttons.push(
            <button
                key="next"
                className={`px-3 py-2 mx-1 font-semibold hover:drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)] ${
                    currentPage === totalPages
                        ? 'text-S-75'
                        : 'text-P-100'
                }`}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                ❯
            </button>
        );
    
        return buttons;
    };
    
    

    return (
        <div className='text-center'>
            {loading ? (
                <div className='flex items-center justify-center h-screen drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)]'>
                <l-momentum
  size="60"
  speed="1.1"
  color="#76899E" 
></l-momentum>
                </div>
            ) : (
         <>
            {error ?              
            <div className="text-R p-[10px]">
                ⚠️ {error}
              </div>
             : 
            <div className='flex flex-col overflow-x-auto'>
            <table class="table-responsive table-auto border-none border-0 mx-[10vw]">
                <thead className=''>
                    <tr className='table-light'>
                    <th className='py-5'>ID</th>
            <th className='py-5'>Name</th>
            <th className='py-5'>Country</th>
            <th className='py-5'>Temperature</th>
            <th className='py-5'>Date Creat</th>
                    </tr>
                </thead>
                <tbody className='my-4'>
                    {droneLogs.map((item) => (
                        <tr key={item.drone_id} className='mt-2'>
                            <td>{item.drone_id ? item.drone_id : 'undefined'}</td>
                            <td>{item.drone_name ? item.drone_name : 'undefined'}</td>
                            <td>{item.country ? item.country : 'undefined'}</td>
                            <td>{item.celsius ? item.celsius.toLocaleString() : 'undefined'}</td>
                            <td>
                                {item.created 
                                    ? new Date(item.created).toLocaleString('en-GB', { 
                                        day: '2-digit', 
                                        month: 'short', 
                                        year: 'numeric', 
                                        hour: '2-digit', 
                                        minute: '2-digit', 
                                        second: '2-digit', 
                                        hour12: false 
                                    }).replace(',', ' | ') 
                                    : 'undefined'}
                                </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
                }
            <div className="mt-5">
                {createPaginationButtons()}
            </div>
            </>
            )}
        </div>
    );
};

export default ViewLog;
