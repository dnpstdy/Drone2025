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
                key={1}
                className={`px-4 py-2 mx-1${
                    currentPage === 1
                            ? ' bg-[#AE3966] text-[#FFFFFF] font-semibold rounded-md drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)] border border-[#FFFFFF] '
                            : ' bg-[#FFFFFF] text-[#AE3966] font-semibold rounded-md hover:border  hover:border-[#AE3966] '
            }`}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
            >
                1
            </button>
        );
    
        if (currentPage > sideButtons + 2) {
            buttons.push(
                <span key="dots-start" className="px-4 py-2 mx-1  bg-[#FFFFFF] text-[#AE3966] font-semibold rounded-md">...</span>
            );
        }
    
        const startPage = Math.max(2, currentPage - sideButtons);
        const endPage = Math.min(totalPages - 1, currentPage + sideButtons);
    
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    className={`px-4 py-2 mx-1 ${
                        i === currentPage
                            ? ' bg-[#AE3966] text-[#FFFFFF] font-semibold rounded-md drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)] border border-[#FFFFFF] '
                            : ' bg-[#FFFFFF] text-[#AE3966] font-semibold rounded-md hover:border  hover:border-[#AE3966] '
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
                <span key="dots-end" className="px-4 py-2 mx-1  bg-[#FFFFFF] text-[#AE3966] font-semibold rounded-md ">...</span>
            );
        }
    
        buttons.push(
            <button
                key={totalPages}
                className={`px-4 py-2 mx-1${
                    currentPage === totalPages
                        ? 'mx-3 py-2 px-5 bg-[#AE3966] text-[#FFFFFF] font-semibold rounded-md drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)] border border-[#FFFFFF]'
                        : 'py-2 px-5  bg-[#FFFFFF] text-[#AE3966] font-semibold rounded-md hover:border  hover:border-[#AE3966] '
                }`}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
            >
                {totalPages}
            </button>
        );
    
        return buttons;
    };
    
    

    return (
        <div className='mt-[150px] text-center'>
            {loading ? (
                <div className='flex items-center justify-center h-screen drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)]'>
                <l-tailspin
                size="80"
                stroke="10"
                speed="1"
                color="#1CB1D1" 
                ></l-tailspin>
                </div>
            ) : (
         <>
            {error ?<div className="mx-auto w-fit flex items-center gap-2 px-4 py-3 rounded-lg bg-red-100 border border-red-300 text-red-700 text-sm font-medium shadow-md animate-fade-in">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M12 17h.01M12 7h.01M5.5 20h13a1 1 0 001-1v-1.5a1 1 0 00-1-1h-13a1 1 0 00-1 1V19a1 1 0 001 1z" />
                </svg>
                {error}
            </div>
             : 
            <div className='flex flex-col overflow-x-auto drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)]'>
            <h1 className='text-[#FFFFFF] font-bold text-6xl'>View Logs</h1>
            <p className='text-[#ADADAF] text-xl my-10'>View all data in the table below</p>
            <table class="table-auto border-none border-0 mx-auto">
                <thead className='rounded-lg'>
                    <tr className='bg-white'>
                        <th className='py-3 px-12'>ID</th>
                        <th className='py-3 px-12'>NAME</th>
                        <th className='py-3 px-12'>COUNTRY</th>
                        <th className='py-3 px-12' >TEMP (°C)</th>
                        <th className='py-3 px-12'>Created</th>
                    </tr>
                </thead>
                <tbody className='my-4'>
                    {droneLogs.map((item) => (
                        <tr key={item.drone_id} className='bg-white mt-2'>
                            <td className='border-b-2 border-solid border-[#F0F0F0] py-3 px-12'>{item.drone_id ? item.drone_id : 'undefined'}</td>
                            <td className='border-b-2 border-solid border-[#F0F0F0] py-3 px-12'>{item.drone_name ? item.drone_name : 'undefined'}</td>
                            <td className='border-b-2 border-solid border-[#F0F0F0] py-3 px-12'>{item.country ? item.country : 'undefined'}</td>
                            <td className='border-b-2 border-solid border-[#F0F0F0] py-3 px-12'>{item.celsius ? item.celsius.toLocaleString() : 'undefined'}</td>
                            <td className='border-b-2 border-solid border-[#F0F0F0] py-3 px-12'>
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
