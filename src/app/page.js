'use client'

import { useEffect, useState } from 'react';

export default function Home() {
    const [drones, setDrones] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [droneId, setDroneId] = useState('');

    useEffect(() => {
        fetchAllDrones();
    }, []);

    const fetchAllDrones = async () => {        
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_PATH}/config`);
                if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
                if (data.status === "success"){
                const drone = data.data;  
                console.log("Drone:", drone);
                setDrones(drone); 
            } else {
                throw new Error("Drone data not found or ID mismatch");
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    const searchDrone = async () => {
        setLoading(true);
        setError('');        
        if (droneId !== undefined && droneId !== null && droneId !== '') {   
            try {
                console.log(droneId);
                
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_PATH}/config/${droneId}`);
                const data = await response.json();
                if (data.data) {
                    setDrones([data.data]); 
                } else {
                    setError('No drone found with this ID');
                    fetchAllDrones(); 
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        } else {
            fetchAllDrones();
        }
    };
    
    const colors = ["#FDF3EA", "#E0F8F2", "#EEECFF", "#D9F2F7", "#FAEDED", "#F1F1F1"];


    return (
        <div className='mt-[150px] text-center'>
            <div id="alertContainer">
                {error && <div className="">{error}</div>}
            </div>

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
        <div className="flex flex-col justify-center mt-16">
            <form className=''>
                <label htmlFor="celsius" className='text-[#FFFFFF] font-bold text-6xl'>View Config</label>
                <div className="flex flex-col items-center">
                <input 
                    className='rounded-3xl py-2 px-5 my-3 mx-3 w-[350px] md:w-[700px] lg:w-[425px] h-auto 
                                bg-transparent border border-white text-[#5F5C80] placeholder-white focus:outline-none'
                    type="text" 
                    value={droneId} 
                    onChange={(e) => setDroneId(e.target.value)} 
                    placeholder="Search for Drone ID" 
                    />
                <button className='my-3 mx-3 w-[350px] md:w-[700px] lg:w-[425px] h-auto py-2 px-5 bg-[#AE3966] text-white font-semibold rounded-3xl' onClick={searchDrone}>Search</button>
        </div>
            </form>

            <div className='flex flex-wrap justify-center h-fit'>
  {drones.map(item => (
    <div className='block rounded-lg my-3 mx-3 w-[350px] md:w-[700px] lg:w-[425px] h-auto drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)]' key={item.drone_id}>
        <div 
      className="rounded-lg p-5" 
      style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}
        >        
        <p className='text-[#2D3437] my-2 py-1 px-2 rounded-md font-bold text-4xl mb-0'>{item.drone_id || 'undefined'}</p>
        <div className='flex'>
          <p className='text-[#2D3437] mb-0'>Name : </p>
          <p className='mt-[1px] mx-1 text-[#2D3437] font-bold mb-0'>{item.drone_name || 'undefined'}</p>
        </div>
        <div className='flex'>
          <p className='text-[#2D3437] mb-0'>Weight : </p>
          <p className='mt-[1px] mx-1 text-[#2D3437] font-bold mb-0'>{item.weight != null ? item.weight.toLocaleString() : 'undefined'}</p>
        </div>
        <div className='flex'>
          <p className='text-[#2D3437] mb-0'>Country : </p>
          <p className='mt-[1px] mx-1 text-[#2D3437] font-bold mb-0'>{item.country || 'undefined'}</p>
        </div>
        <div className='flex'>
          <p className='text-[#2D3437] mb-0'>Light : </p>
          <p className='mt-[1px] mx-1 text-[#2D3437] font-bold mb-0'>{item.light || 'undefined'}</p>
        </div>
      </div>
    </div>
  ))}
</div>

        </div>
            )}
        </div>
    );
}
