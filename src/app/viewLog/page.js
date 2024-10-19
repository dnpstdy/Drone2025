'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link'

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
            const response = await fetch(`https://65010051-drone-api.vercel.app/logs?page=${page}`);
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
                className="px-4 py-2 mx-1 bg-[#C1DEE2] text-[#2D3437] font-semibold rounded-md hover:drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)] border border-[#C1DEE2] focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                Prev
            </button>
        );
    
        buttons.push(
            <button
                key={1}
                className={`px-4 py-2 mx-1${
                    currentPage === 1
                    ? ' bg-[#C1DEE2] text-[#2D3437] font-semibold rounded-md drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)] border border-[#C1DEE2] '
                    : ' bg-[#2D3437] text-[#C1DEE2] font-semibold rounded-md hover:border  hover:border-[#C1DEE2] '
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
                    className={`px-4 py-2 mx-1 ${
                        i === currentPage
                            ? ' bg-[#C1DEE2] text-[#2D3437] font-semibold rounded-md drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)] border border-[#C1DEE2] '
                            : ' bg-[#2D3437] text-[#C1DEE2] font-semibold rounded-md hover:border  hover:border-[#C1DEE2] '
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
                <span key="dots-end" className="px-4 py-2 mx-1 bg-[#2D3437] text-[#C1DEE2] font-semibold rounded-md ">...</span>
            );
        }
    
        buttons.push(
            <button
                key={totalPages}
                className={`px-4 py-2 mx-1${
                    currentPage === totalPages
                        ? 'mx-3 py-2 px-5 bg-[#C1DEE2] text-[#2D3437] font-semibold rounded-md drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)] border border-[#C1DEE2] '
                        : 'py-2 px-5 bg-[#2D3437] text-[#C1DEE2] font-semibold rounded-md hover:border  hover:border-[#C1DEE2] '
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
                className="px-4 py-2 mx-1 bg-[#C1DEE2] text-[#2D3437] font-semibold rounded-md hover:drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)] border border-[#C1DEE2] "
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                Next
            </button>
        );
    
        return buttons;
    };
    
    

    return (
        <div id="app">
             <nav className='mt-5 mb-16'>
             <ul className="flex flex-row">
                <li className='py-2 px-5 bg-[#2D3437] text-[#C1DEE2] font-semibold rounded-[15px] hover:border  hover:border-[#C1DEE2] '><Link href="/">View Config</Link></li>
                <li className='mx-3 py-2 px-5 bg-[#C1DEE2] text-[#2D3437] font-semibold rounded-[15px] drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)] border border-[#C1DEE2] '><Link href="/viewLog">View Logs</Link></li>
                </ul>
            </nav>
            {loading ? (
                <div className='flex items-center justify-center h-screen drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)]'>
                <l-bouncy
                    size="100"
                    speed="1.75"
                    color="#C1DEE2" 
                ></l-bouncy>
                </div>
            ) : (
         <>
            {error ? <div className="">{error}</div> : 
            <div className='flex flex-col overflow-x-auto drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)]'>
            <table class="table-auto border-none border-0 mx-auto">
                <thead className='rounded-lg'>
                    <tr className='bg-[#C1DEE2]'>
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
                            <td className='border-b-2 border-dashed border-[#C1DEE2] py-3 px-12'>{item.drone_id ? item.drone_id : 'undefined'}</td>
                            <td className='border-b-2 border-dashed border-[#C1DEE2] py-3 px-12'>{item.drone_name ? item.drone_name : 'undefined'}</td>
                            <td className='border-b-2 border-dashed border-[#C1DEE2] py-3 px-12'>{item.country ? item.country : 'undefined'}</td>
                            <td className='border-b-2 border-dashed border-[#C1DEE2] py-3 px-12'>{item.celsius ? item.celsius.toLocaleString() : 'undefined'}</td>
                            <td className='border-b-2 border-dashed border-[#C1DEE2] py-3 px-12'>
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
