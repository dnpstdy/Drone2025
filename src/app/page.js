'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link'
import countryAbbreviations from './constant';

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
    
    
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const celsiusValue = formData.get('celsius');
    
        if (!celsiusValue || isNaN(parseInt(celsiusValue))) {
            setError('Please provide a valid temperature in Celsius');
            return;
        }
    
        const data = {
            "drone_id": 65010144,
            "drone_name": "toei",
            "celsius": parseInt(celsiusValue), 
            "country": "Laos"
        };
    
        setLoading(true);
        setError(null);
    
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_PATH}/logs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 20250301efx' 
                },
                body: JSON.stringify(data),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                setResponseData(result.data);
                form.reset();
            } else {
                setError(result.message || 'Failed to submit data');
            }
        } catch (error) {
            setError('Network error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div id="app">
            <nav className='mt-5 mb-16'>
                <ul className="flex flex-row">
                    <li className='py-2 px-5 bg-[#C1DEE2] text-[#2D3437] font-semibold rounded-[15px] drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)] border border-[#C1DEE2] '><button onClick={fetchAllDrones}>View Config</button></li>
                    <li className='mx-3 py-2 px-5 bg-[#2D3437] text-[#C1DEE2] font-semibold rounded-[15px] hover:drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)] hover:border  hover:border-[#C1DEE2] '><Link href="/viewLog">View Logs</Link></li>
                </ul>
            </nav>

            <div id="alertContainer">
                {error && <div className="">{error}</div>}
            </div>

            {loading ? (
                <div className='flex items-center justify-center h-screen drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)]'>
                <l-bouncy
                    size="100"
                    speed="1.75"
                    color="#C1DEE2" 
                ></l-bouncy>
                </div>
            ) : (
            <div className="flex justify-evenly">
                <div className='mb-3 mx-3'>
                <form className=''>
                <label htmlFor="celsius" className='flex bg-[#2D3437] text-[#C1DEE2] font-semibold '>Search Drone Config</label>
                <div className="flex drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)]">
                <input 
                    className='rounded-l-lg px-3 '
                    type="text" 
                    value={droneId} 
                    onChange={(e) => setDroneId(e.target.value)} 
                    placeholder="Enter drone ID" 
                />
                <button className='py-2 px-5 bg-[#C1DEE2] text-[#2D3437] font-semibold rounded-r-lg drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)] border border-[#C1DEE2] ' onClick={searchDrone}>Search</button>
            </div>
            </form>
                <form id="tempLogForm" onSubmit={handleSubmit} className='my-5'>
                <label htmlFor="celsius" className='flex bg-[#2D3437] text-[#C1DEE2] font-semibold '>INPUT Temperature (°C)</label>
                    <div className='flex drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)]'>
                        <input className='rounded-l-lg px-3' placeholder="Enter Temperature (°C)"   type="number" id="celsius" name="celsius" required />
                        <button className='py-2 px-5 bg-[#C1DEE2] text-[#2D3437] font-semibold rounded-r-lg drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)] border border-[#C1DEE2] ' type="submit">Submit</button>
                    </div>
                </form>
            </div>


            <div className='flex flex-wrap justify-start h-fit'>
  {drones.map(item => (
    <div className='block rounded-lg my-3 mx-3 w-[425px] h-auto drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)]' key={item.drone_id}>
      <div className="flex rounded-t-lg bg-[#C1DEE2] p-5">
        <p className='bg-[#2D3437] text-[#C1DEE2] py-1 px-2 rounded-md font-bold mb-0'>{item.drone_id || 'undefined'}</p>
        <p className='my-1 mx-3 text-[#2D3437] font-bold mb-0'>{item.drone_name || 'undefined'}</p>
      </div>
      <div className="bg-[#FFFFFF] rounded-b-lg p-5">
        <div className='flex'>
          <p className='text-[#2D3437] mb-0'>Country : </p>
          <p className='mt-[1px] mx-1 text-[#2D3437] font-bold mb-0'>{item.country || 'undefined'}</p>
          {item.country ? (
            <img 
              src={`https://flagsapi.com/${countryAbbreviations[item.country] || item.country}/shiny/24.png`}
              className='rounded-[50%] mx-2' 
              alt={`Flag of ${item.country}`} 
            />
          ) : null}
        </div>
        <div className='flex'>
          <p className='text-[#2D3437] mb-0'>Population :</p>
          <p className='mt-[1px] mx-1 text-[#2D3437] font-bold mb-0'>{item.population !== undefined ? item.population.toLocaleString() : 'undefined'}</p>
        </div>
        <div className='flex'>
          <p className='text-[#2D3437] mb-0'>Weight : </p>
          <p className='mt-[1px] mx-1 text-[#2D3437] font-bold mb-0'>{item.weight !== undefined ? item.weight.toLocaleString() : 'undefined'}</p>
        </div>
        <div className='flex'>
          <p className='text-[#2D3437] mb-0'>Light : </p>
          <p className='mt-[1px] mx-1 text-[#2D3437] font-bold mb-0'>{item.light || 'undefined'}</p>
          {item.light && (
            <div className={`rounded-[50%] w-[24px] h-[24px] mt-1.5 mx-1 ${item.light === 'on' ? 'bg-[#A7EE8E]' : item.light === 'off' ? 'bg-[#E76C6C]' : 'bg-white'}`}></div>
          )}
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
