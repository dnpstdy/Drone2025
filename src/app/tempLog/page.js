"use client";

import { useState } from "react";

export default function tempLog() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const celsiusValue = formData.get("celsius");

    setError("");
    setSuccess(""); 

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
        setSuccess("Temperature logged successfully!");
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
      <div id="alertContainer" className="space-y-2">
        {error && (
          <div className="mx-auto w-fit flex items-center gap-2 px-4 py-3 rounded-lg bg-red-100 border border-red-300 text-red-700 text-sm font-medium shadow-md animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M12 17h.01M12 7h.01M5.5 20h13a1 1 0 001-1v-1.5a1 1 0 00-1-1h-13a1 1 0 00-1 1V19a1 1 0 001 1z" />
            </svg>
            {error}
          </div>
        )}
        {success && (
          <div className="mx-auto w-fit flex items-center gap-2 px-4 py-3 rounded-lg bg-green-100 border border-green-300 text-green-700 text-sm font-medium shadow-md animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            {success}
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-screen drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)]">
          <l-tailspin size="80" stroke="10" speed="1" color="#1CB1D1"></l-tailspin>
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
