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
      drone_id: formData.get("drone_id"),
      drone_name: formData.get("drone_name"),
      celsius: parseInt(celsiusValue),
      country: formData.get("country"),
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
    <div className="text-center">
      <div id="alertContainer" className="space-y-2">
        {error && (
              <div className="text-R p-[10px]">
                ⚠️ {error}
              </div>
        )}
        {success && (
              <div className="text-G p-[10px]">
              {success}
            </div>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-screen shadow-custom">
          <l-momentum
  size="60"
  speed="1.1"
  color="#76899E" 
></l-momentum>
        </div>
      ) : (
        <div className="card mx-auto p-4 max-w-[350px] rounded-md" >
      <h4 class="mb-3 text-center">Input your Drone</h4>
      <form id="tempLogForm" onSubmit={handleSubmit} className="flex flex-col">
          <label className="form-label text-start my-2">Drone ID</label>
          <input name="drone_id" type="number" className="form-control text-center rounded-md" required placeholder="Enter Drone ID"/>

          <label className="form-label text-start my-2">Drone Name</label>
          <input name="drone_name" type="text" className="form-control text-center rounded-md" required placeholder="Enter Drone Name" />

          <label className="form-label text-start my-2">Country</label>
          <input name="country" type="text" className="form-control text-center rounded-md" required placeholder="Enter Country"/>

          <label className="form-label text-start my-2">Temperature (°C)</label>
          <input name="celsius" type="number" className="form-control text-center rounded-md" required placeholder="Enter Temperature"/>

          <button type="submit" className="btn w-100 py-1 my-3 rounded-md">Submit Data</button>
        </form>
        </div>
      )}
    </div>
  );
}
