"use client";

import { useEffect, useState } from "react";

export default function tempLog() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const celsiusValue = formData.get("celsius");

    if (!celsiusValue || isNaN(parseInt(celsiusValue))) {
      setError("Please provide a valid temperature in Celsius");
      return;
    }

    const data = {
      drone_id: 65010144,
      drone_name: "toei",
      celsius: parseInt(celsiusValue),
      country: "Laos",
    };

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PATH}/logs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 20250301efx",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (response.ok) {
        form.reset();
      } else {
        setError(result.message || "Failed to submit data");
      }
    } catch (error) {
      setError("Network error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-[150px] text-center">
      <div id="alertContainer">{error && <div className="">{error}</div>}</div>

      {loading ? (
        <div className="flex items-center justify-center h-screen drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)]">
          <l-tailspin
            size="80"
            stroke="10"
            speed="1"
            color="#1CB1D1"
          ></l-tailspin>
        </div>
      ) : (
        <div className="flex flex-col justify-center mt-16">
          <form id="tempLogForm" onSubmit={handleSubmit} className="">
            <label
              htmlFor="celsius"
              className="text-[#FFFFFF] font-bold text-6xl "
            >
               Temperature Log 
            </label>
            <div className="flex flex-col items-center">
              <input
                className="rounded-3xl py-2 px-5 my-3 mx-3 w-[350px] md:w-[700px] lg:w-[425px] h-auto 
                                bg-transparent border border-white text-[#5F5C80] placeholder-white focus:outline-none"
                type="number"
                placeholder="Enter Temperature (°C)"
                id="celsius" 
                name="celsius" 
                required
              />
              <button
                className="my-3 mx-3 w-[350px] md:w-[700px] lg:w-[425px] h-auto py-2 px-5 bg-[#AE3966] text-white font-semibold rounded-3xl"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
